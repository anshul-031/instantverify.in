// This is a mock SMS service
// Replace with actual SMS provider integration

export const smsService = {
  async sendOTP(phone: string, otp: string) {
    // In production, integrate with actual SMS provider
    console.log(`Sending OTP ${otp} to ${phone}`);
    return Promise.resolve();
  },
};