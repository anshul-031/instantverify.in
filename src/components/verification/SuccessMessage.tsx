import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../forms';

interface SuccessMessageProps {
  verificationId: string;
  onReset: () => void;
}

export default function SuccessMessage({ verificationId, onReset }: SuccessMessageProps) {
  return (
    <div className="text-center">
      <div className="rounded-full h-24 w-24 bg-green-100 mx-auto flex items-center justify-center">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        Verification Request Submitted
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        Your verification request (ID: {verificationId}) has been submitted successfully.
        We'll notify you once the verification is complete.
      </p>
      <div className="mt-6">
        <Button variant="outline" onClick={onReset}>
          Start New Verification
        </Button>
      </div>
    </div>
  );
}