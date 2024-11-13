import { config } from '../config';
import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  baseUrl: string; // Added baseUrl
}

const emailConfig: EmailConfig = {
  host: config.email.host,
  port: config.email.port,
  user: config.email.user,
  pass: config.email.pass,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000', // Added baseUrl with fallback
};

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: false,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  try {
    const verificationUrl = `${emailConfig.baseUrl}/verify-email?token=${token}`;
    console.log("emailConfig.user :", emailConfig.user);
    await transporter.sendMail({
      from: emailConfig.user,
      to,
      subject: 'Verify your email',
      html: `
        <h1>Verify your email</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    });
    console.log(`Verification email sent successfully to ${to}`); // Added log statement
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export const sendPasswordResetEmail = async (to: string, token: string) => {
  try {
    const resetUrl = `${emailConfig.baseUrl}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: emailConfig.user,
      to,
      subject: 'Reset your password',
      html: `
        <h1>Reset your password</h1>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

export const emailService = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
