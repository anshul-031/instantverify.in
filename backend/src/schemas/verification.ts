import { z } from 'zod';

export const verificationSchema = {
  initiate: z.object({
    photo: z.any(),
    aadharFront: z.any(),
    aadharBack: z.any(),
  }),
  getById: z.object({
    id: z.string(),
  }),
};
