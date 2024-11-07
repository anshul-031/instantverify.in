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

export interface VerificationRequest {
  purpose: 'TENANT' | 'DOMESTIC_HELP' | 'DRIVER' | 'MATRIMONIAL' | 'OTHER';
  photo: string;
  aadharFront: string;
  aadharBack: string;
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
    aadharFront: string;
    aadharBack: string;
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