import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from '../config';
import { AppError } from '../middleware/errorHandler';
import { emailService } from '../services/email';
import { smsService } from '../services/sms';
import { generateOTP } from '../utils/otp';
import { tokenService } from '../services/token';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName, phone, dateOfBirth } = req.body;

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      if (existingUser) {
        throw new AppError(400, 'Email or phone number already registered');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          dateOfBirth: new Date(dateOfBirth),
        },
      });

      if (config.features.emailVerification) {
        const emailToken = jwt.sign(
          { userId: user.id.toString() },
          config.jwt.secret,
          { expiresIn: '24h' }
        );

        await prisma.emailVerification.create({
          data: {
            userId: user.id,
            token: emailToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        });

        await emailService.sendVerificationEmail(user.email, emailToken);
      }

      if (config.features.otpVerification && phone) {
        const otp = generateOTP();

        await prisma.phoneVerification.create({
          data: {
            userId: user.id,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          },
        });

        await smsService.sendOTP(phone, otp);
      }

      const token = jwt.sign(
        { userId: user.id.toString(), role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      const refreshToken = jwt.sign(
        { userId: user.id.toString() },
        config.jwt.refreshSecret,
        { expiresIn: config.jwt.refreshExpiresIn }
      );

      await prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: refreshToken,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      res.status(201).json({
        message: 'Registration successful',
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
        },
      });
    } catch (error: unknown) {
      const err = error as Error;
      next(new AppError(500, err.message || 'Registration failed'));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, rememberMe } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !user.password) {
        throw new AppError(401, 'Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new AppError(401, 'Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id.toString(), role: user.role },
        config.jwt.secret,
        { expiresIn: rememberMe ? '30d' : config.jwt.expiresIn }
      );

      const refreshToken = jwt.sign(
        { userId: user.id.toString() },
        config.jwt.refreshSecret,
        { expiresIn: config.jwt.refreshExpiresIn }
      );

      await prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: refreshToken,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      res.json({
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
        },
      });
    } catch (error: unknown) {
      const err = error as Error;
      next(new AppError(500, err.message || 'Login failed'));
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      const savedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!savedToken || savedToken.expiresAt < new Date()) {
        throw new AppError(401, 'Invalid or expired refresh token');
      }

      const token = jwt.sign(
        { userId: savedToken.user.id.toString(), role: savedToken.user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.json({ token });
    } catch (error: unknown) {
      const err = error as Error;
      next(new AppError(500, err.message || 'Failed to refresh token'));
    }
  }

 

  async verifyPhone(req: Request, res: Response, next: NextFunction) {
    res.send('Phone verification endpoint');
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.json({ message: 'If an account exists, a password reset email will be sent' });
      }

      const resetToken = tokenService.generatePasswordResetToken(user.id.toString());

      await emailService.sendPasswordResetEmail(user.email, resetToken);

      logger.info(`Password reset email sent to ${user.email}`);

      res.json({ message: 'If an account exists, a password reset email will be sent' });
    } catch (error: unknown) {
      const err = error as Error;
      next(new AppError(500, err.message || 'Failed to send password reset email'));
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;

      const { userId } = tokenService.verifyPasswordResetToken(token);

      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
      });

      if (!user) {
        throw new AppError(400, 'Invalid reset token');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { id: parseInt(userId, 10) },
        data: { password: hashedPassword },
      });

      await prisma.refreshToken.deleteMany({
        where: { userId: parseInt(userId, 10) },
      });

      logger.info(`Password reset successful for user ${user.email}`);

      res.json({ message: 'Password reset successful' });
    } catch (error: unknown) {
      const err = error as Error;
      next(new AppError(500, err.message || 'Password reset failed'));
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    res.send('Google Auth endpoint');
  }

  async googleCallback(req: Request, res: Response, next: NextFunction) {
    res.send('Google Callback endpoint');
  }

  async facebookAuth(req: Request, res: Response, next: NextFunction) {
    res.send('Facebook Auth endpoint');
  }

  async facebookCallback(req: Request, res: Response, next: NextFunction) {
    res.send('Facebook Callback endpoint');
  }

  async githubAuth(req: Request, res: Response, next: NextFunction) {
    res.send('Github Auth endpoint');
  }

  async githubCallback(req: Request, res: Response, next: NextFunction) {
    res.send('Github Callback endpoint');
  }

  async createTestAccount(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Creating test account...');
      const testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: await bcrypt.hash('password123', 10),
          firstName: 'Test',
          lastName: 'User',
          phone: '+15551234567',
          dateOfBirth: new Date(),
          isEmailVerified: true,
          isPhoneVerified: true,
        },
      });
      console.log('Test account created:', testUser.id);
      res.json({ message: 'Test account created', userId: testUser.id });
    } catch (error: unknown) {
      const err = error as Error;
      next(new AppError(500, err.message || 'Failed to create test account'));
    }
  }
}
