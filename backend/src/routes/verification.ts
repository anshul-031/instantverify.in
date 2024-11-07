import { Router } from 'express';
import { verificationController } from '../controllers/verification';
import { authenticate, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { verificationSchema } from '../schemas/verification';
import { upload } from '../middleware/upload';

const router = Router();

/**
 * @swagger
 * /verification/initiate:
 *   post:
 *     tags: [Verification]
 *     summary: Initiate a new verification request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/VerificationRequest'
 */
router.post(
  '/initiate',
  authenticate,
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadharFront', maxCount: 1 },
    { name: 'aadharBack', maxCount: 1 },
  ]),
  validateRequest(verificationSchema.initiate),
  verificationController.initiateVerification
);

/**
 * @swagger
 * /verification/{id}:
 *   get:
 *     tags: [Verification]
 *     summary: Get verification details
 *     security:
 *       - bearerAuth: []
 */
router.get(
  '/:id',
  authenticate,
  validateRequest(verificationSchema.getById),
  verificationController.getVerification
);

/**
 * @swagger
 * /verification/digilocker/auth:
 *   post:
 *     tags: [Verification]
 *     summary: Get Digilocker authentication URL
 *     security:
 *       - bearerAuth: []
 */
router.post(
  '/digilocker/auth',
  authenticate,
  verificationController.getDigilockerAuthUrl
);

/**
 * @swagger
 * /verification/digilocker/callback:
 *   get:
 *     tags: [Verification]
 *     summary: Handle Digilocker callback
 */
router.get(
  '/digilocker/callback',
  verificationController.handleDigilockerCallback
);

/**
 * @swagger
 * /verification/digilocker/status:
 *   get:
 *     tags: [Verification]
 *     summary: Check Digilocker authentication status
 *     security:
 *       - bearerAuth: []
 */
router.get(
  '/digilocker/status',
  authenticate,
  verificationController.checkDigilockerStatus
);

export default router;