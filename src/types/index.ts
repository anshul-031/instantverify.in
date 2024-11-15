export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  preferredLanguage: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export type VerificationType = 'AADHAAR_OTP' | 'DL_AADHAAR_OTP' | 'VOTER_AADHAAR_OTP' | 'DL_ONLY' | 'VOTER_ONLY';

export interface VerificationRequest {
  purpose: 'TENANT' | 'DOMESTIC_HELP' | 'DRIVER' | 'MATRIMONIAL' | 'OTHER';
  verificationType: VerificationType;
  photo: string;
  aadhaarNumber?: string;
  drivingLicense?: string;
  voterId?: string;
  additionalDetails?: Record<string, string>;
}

export interface VerificationReport {
  id: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  digilockerData: {
    name: string;
    fatherName: string;
    address: string;
    photo: string;
    aadharNumber: string;
  };
  userProvidedData: {
    photo: string;
    aadhaarNumber?: string;
    drivingLicense?: string;
    voterId?: string;
  };
  verificationResult: {
    photoMatch: boolean;
    detailsMatch: boolean;
    criminalRecords: any[];
    policeVerification: {
      status: string;
      remarks: string;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}