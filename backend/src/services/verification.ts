import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { config } from '../config';

interface DigilockerData {
  name?: string;
  address?: string;
  // Add other properties as needed
}

export const verificationService = {
  async deductCredits(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { customPricing: true },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const requiredCredits = 1; // Each verification costs 1 credit

    if (user.credits < requiredCredits) {
      throw new AppError(400, 'Insufficient credits');
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: requiredCredits,
        },
      },
    });
  },

  async generateReport(verificationId: string) {
    const verification = await prisma.verification.findUnique({
      where: { id: verificationId },
      include: { user: true },
    });

    if (!verification) {
      throw new AppError(404, 'Verification not found');
    }

    // Generate verification report
    const report = {
      id: verification.id,
      timestamp: new Date(),
      status: verification.status,
      purpose: verification.purpose,
      subject: {
        // name: verification.digilockerData?.name,
        // photo: verification.photoUrl,
        // address: verification.digilockerData?.address,
      },
      documents: {
        aadhaar: {
          front: verification.aadharFrontUrl,
          back: verification.aadharBackUrl,
        },
      },
      verification: {
        digilocker: verification.digilockerData as DigilockerData,
        criminalRecords: verification.criminalRecords,
        policeReport: verification.policeReport,
      },
      location: verification.location,
    };

    return report;
  },
};
