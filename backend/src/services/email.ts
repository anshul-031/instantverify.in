import nodemailer from 'nodemailer';
import { config } from '../config';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export const emailService = {
  async sendVerificationEmail(to: string, token: string) {
    const verificationUrl = `${config.baseUrl}/api/auth/verify-email/${token}`;

    await transporter.sendMail({
      from: config.email.user,
      to,
      subject: 'Verify your email address',
      html: `
        <h1>Email Verification</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    });
  },

  async sendPasswordResetEmail(to: string, token: string) {
    const resetUrl = `${config.baseUrl}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: config.email.user,
      to,
      subject: 'Reset your password',
      html: `
        <h1>Password Reset</h1>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });
  },
};