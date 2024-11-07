import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Select } from '../forms';
import { VerificationRequest } from '../../types';

interface PurposeSelectionProps {
  value: VerificationRequest['purpose'];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function PurposeSelection({ value, onChange }: PurposeSelectionProps) {
  const purposes = [
    { value: 'TENANT', label: 'Tenant Verification' },
    { value: 'DOMESTIC_HELP', label: 'Domestic Help Verification' },
    { value: 'DRIVER', label: 'Driver Verification' },
    { value: 'MATRIMONIAL', label: 'Matrimonial Verification' },
    { value: 'OTHER', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      <Select
        label="Select Verification Purpose"
        options={purposes}
        value={value}
        onChange={onChange}
      />
      <div className="bg-blue-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Important Information
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Keep your Aadhaar card ready</li>
                <li>Ensure good lighting for photo capture</li>
                <li>Documents should be clearly visible</li>
                <li>All information must match official records</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}