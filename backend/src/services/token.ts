import jwt from 'jsonwebtoken';
import { config } from '../config';

export const tokenService = {
  generatePasswordResetToken(userId: string): string {
    return jwt.sign(
      { userId, type: 'password-reset' },
      config.jwt.secret,
      { expiresIn: '1h' }
    );
  },
  
  verifyPasswordResetToken(token: string): { userId: string } {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;
      
      if (decoded.type !== 'password-reset') {
        throw new Error('Invalid token type');
      }

      return { userId: decoded.userId };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
};