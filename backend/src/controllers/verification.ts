import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { s3Service } from '../services/s3';
import { digilockerService } from '../services/digilocker';
import { verificationService } from '../services/verification';
import { logger } from '../utils/logger';

export const verificationController = {
  async initiateVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { purpose } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (!files.photo?.[0] || !files.aadharFront?.[0] || !files.aadharBack?.[0]) {
        throw new AppError(400, 'All required files must be uploaded');
      }

      // Upload files to S3
      const [photoUrl, aadharFrontUrl, aadharBackUrl] = await Promise.all([
        s3Service.uploadFile(files.photo[0]),
        s3Service.uploadFile(files.aadharFront[0]),
        s3Service.uploadFile(files.aadharBack[0]),
      ]);

      // Create verification record
      const verification = await prisma.verification.create({
        data: {
          userId: req.user!.id,
          purpose,
          photoUrl,
          aadharFrontUrl,
          aadharBackUrl,
          status: 'PENDING',
        },
      });

      // Deduct credits
      await verificationService.deductCredits(req.user!.id);

      res.status(201).json({
        message: 'Verification initiated successfully',
        verificationId: verification.id,
      });
    } catch (error) {
      next(error);
    }
  },

  async getVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const verification = await prisma.verification.findUnique({
        where: { id },
      });

      if (!verification) {
        throw new AppError(404, 'Verification not found');
      }

      if (verification.userId !== req.user!.id) {
        throw new AppError(403, 'Access denied');
      }

      res.json(verification);
    } catch (error) {
      next(error);
    }
  },

  async getDigilockerAuthUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { verificationId } = req.body;

      const verification = await prisma.verification.findUnique({
        where: { id: verificationId },
      });

      if (!verification || verification.userId !== req.user!.id) {
        throw new AppError(404, 'Verification not found');
      }

      const { url, requestId } = await digilockerService.getAuthUrl();

      // Store requestId for later use
      await prisma.verification.update({
        where: { id: verificationId },
        data: {
          additionalDetails: {
            digilockerRequestId: requestId,
          },
        },
      });

      res.json({ url });
    } catch (error) {
      next(error);
    }
  },

  async handleDigilockerCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { code, state } = req.query;

      await digilockerService.handleCallback(code as string, state as string);

      res.send(`
        <html>
          <body>
            <script>
              window.close();
            </script>
          </body>
        </html>
      `);
    } catch (error) {
      next(error);
    }
  },

  async checkDigilockerStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { verificationId } = req.query;

      const verification = await prisma.verification.findUnique({
        where: { id: verificationId as string },
      });

      if (!verification || verification.userId !== req.user!.id) {
        throw new AppError(404, 'Verification not found');
      }

      const requestId = verification.additionalDetails?.digilockerRequestId;

      if (!requestId) {
        throw new AppError(400, 'Digilocker verification not initiated');
      }

      const data = await digilockerService.checkStatus(requestId);

      if (data) {
        // Update verification with Digilocker data
        await prisma.verification.update({
          where: { id: verificationId as string },
          data: {
            digilockerData: data,
            status: 'IN_PROGRESS',
          },
        });
      }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
};