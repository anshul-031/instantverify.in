interface FeatureFlags {
  socialLogin: {
    google: boolean;
    facebook: boolean;
    github: boolean;
  };
  otpVerification: boolean;
  emailVerification: boolean;
  razorpay: boolean;
  digilocker: boolean;
}

const features: FeatureFlags = {
  socialLogin: {
    google: true,
    facebook: true,
    github: true,
  },
  otpVerification: true,
  emailVerification: true,
  razorpay: true,
  digilocker: true,
};

export const getFeatureFlag = (feature: keyof FeatureFlags): boolean => {
  return features[feature] as boolean;
};

export const getSocialLoginFeature = (provider: keyof FeatureFlags['socialLogin']): boolean => {
  return features.socialLogin[provider];
};