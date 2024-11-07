import { Router } from 'express';
import { authController } from '../controllers/auth';
import { validateRequest } from '../middleware/validateRequest';
import { authSchema } from '../schemas/auth';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  '/register',
  validateRequest(authSchema.register),
  authController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  '/login',
  validateRequest(authSchema.login),
  authController.login
);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.post(
  '/refresh-token',
  validateRequest(authSchema.refreshToken),
  authController.refreshToken
);

/**
 * @swagger
 * /auth/verify-email/{token}:
 *   get:
 *     tags: [Auth]
 *     summary: Verify email address
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.get(
  '/verify-email/:token',
  authController.verifyEmail
);

/**
 * @swagger
 * /auth/verify-phone:
 *   post:
 *     tags: [Auth]
 *     summary: Verify phone number with OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyPhoneRequest'
 *     responses:
 *       200:
 *         description: Phone number verified successfully
 */
router.post(
  '/verify-phone',
  validateRequest(authSchema.verifyPhone),
  authController.verifyPhone
);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
router.post(
  '/forgot-password',
  validateRequest(authSchema.forgotPassword),
  authController.forgotPassword
);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password with token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post(
  '/reset-password',
  validateRequest(authSchema.resetPassword),
  authController.resetPassword
);

// Social login routes
if (config.features.socialLogin) {
  router.get('/google', authController.googleAuth);
  router.get('/google/callback', authController.googleCallback);
  router.get('/facebook', authController.facebookAuth);
  router.get('/facebook/callback', authController.facebookCallback);
  router.get('/github', authController.githubAuth);
  router.get('/github/callback', authController.githubCallback);
}

export default router;