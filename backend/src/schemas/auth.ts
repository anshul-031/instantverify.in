import { z } from 'zod';

export const authSchema = {
  register: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      phone: z.string().regex(/^\+91[0-9]{10}$/),
      dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    }),
  }),

  login: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
      rememberMe: z.boolean().optional(),
    }),
  }),

  refreshToken: z.object({
    body: z.object({
      refreshToken: z.string(),
    }),
  }),

  verifyPhone: z.object({
    body: z.object({
      phone: z.string().regex(/^\+91[0-9]{10}$/),
      otp: z.string().length(6),
    }),
  }),

  forgotPassword: z.object({
    body: z.object({
      email: z.string().email(),
    }),
  }),

  resetPassword: z.object({
    body: z.object({
      token: z.string(),
      password: z.string().min(8),
    }),
  }),
};