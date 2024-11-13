import { Request, Response, NextFunction } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { s3Service } from '../services/s3';
import { digilockerService } from '../services/digilocker';
import { verificationService } from '../services/verification';
import { logger } from '../utils/logger';

interface VerificationWithRequestId extends Prisma.VerificationCountArgs{
  additionalDetails: {
    digilockerRequestId: string | null;
  } | null;
}

export const verificationController = {
  // ... other functions ...

  async checkDigilockerStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { verificationId } = req.query;

      const verification = await prisma.verification.findUnique({
        where: { id: parseInt(verificationId as string, 10) }, // Parse verificationId as number
      });

      if (!verification || verification.userId !== parseInt(req.user!.id as string, 10)) { // Parse userId as number
        throw new AppError(404, 'Verification not found');
      }

      const additionalDetails = verification.additionalDetails as { digilockerRequestId: string | null } | undefined;
      const requestId = additionalDetails?.digilockerRequestId;

      if (!requestId) {
        throw new AppError(400, 'Digilocker verification not initiated');
      }

      const data = await digilockerService.checkStatus(requestId);

      if (data) {
        // Update verification with Digilocker data
        await prisma.verification.update({
          where: { id: parseInt(verificationId as string, 10) }, // Parse verificationId as number
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
  async initiateVerification(req: Request, res: Response, next: NextFunction) {
    //Implementation for initiateVerification
  },
  async getVerification(req: Request, res: Response, next: NextFunction) {
    //Implementation for getVerification
  },
  async getDigilockerAuthUrl(req: Request, res: Response, next: NextFunction) {
    //Implementation for getDigilockerAuthUrl
  },
  async handleDigilockerCallback(req: Request, res: Response, next: NextFunction) {
    //Implementation for handleDigilockerCallback
  }
};
