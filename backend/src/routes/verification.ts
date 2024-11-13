import { Router } from 'express';
import { verificationController } from '../controllers/verification';
import { authenticate, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
//import { verificationSchema } from '../schemas/verification';
import { upload } from '../middleware/upload';
import { Request, Response, NextFunction } from 'express';

interface VerificationController {
  initiateVerification: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getVerification: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getDigilockerAuthUrl: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  handleDigilockerCallback: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  checkDigilockerStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const router = Router();

router.post(
  '/initiate',
  authenticate,
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadharFront', maxCount: 1 },
    { name: 'aadharBack', maxCount: 1 },
  ]),
  //validateRequest(verificationSchema.initiate),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verificationController.initiateVerification(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  authenticate,
  //validateRequest(verificationSchema.getById),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verificationController.getVerification(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/digilocker/auth',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verificationController.getDigilockerAuthUrl(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/digilocker/callback',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verificationController.handleDigilockerCallback(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/digilocker/status',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verificationController.checkDigilockerStatus(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
