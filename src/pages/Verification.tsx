import React, { useState } from 'react';
import { Alert } from '../components/forms';
import { Container, Card, PageHeader } from '../components/layout';
import { Button } from '../components/forms';
import { VerificationRequest, VerificationType } from '../types';
import ProgressSteps from '../components/verification/ProgressSteps';
import DocumentUpload from '../components/verification/DocumentUpload';
import PurposeSelection from '../components/verification/PurposeSelection';
import SuccessMessage from '../components/verification/SuccessMessage';

const VERIFICATION_STEPS = [
  { id: 1, label: 'Purpose' },
  { id: 2, label: 'Documents' },
  { id: 3, label: 'Verification' },
];

export default function Verification() {
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState<VerificationRequest['purpose']>('TENANT');
  const [verificationType, setVerificationType] = useState<VerificationType>('AADHAAR_OTP');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [files, setFiles] = useState<Record<string, File | undefined>>({});

  const handleFileChange = (type: string, file: File) => {
    setFiles(prev => ({ ...prev, [type]: file }));
  };

  const handleNext = () => {
    if (step < VERIFICATION_STEPS.length) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (step === 1) {
        handleNext();
        return;
      }

      // For step 2 (Documents), validate and submit
      if (step === 2) {
        const requiredFiles = getRequiredFiles(verificationType);
        const missingFiles = requiredFiles.filter(file => !files[file]);
        
        if (missingFiles.length > 0) {
          throw new Error(`Please upload all required documents: ${missingFiles.join(', ')}`);
        }

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVerificationId('VER123456789');
        handleNext();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getRequiredFiles = (type: VerificationType): string[] => {
    const baseRequirement = ['photo'];
    switch (type) {
      case 'AADHAAR_OTP':
        return [...baseRequirement, 'aadharFront', 'aadharBack'];
      case 'DL_AADHAAR_OTP':
        return [...baseRequirement, 'drivingLicense', 'aadharFront', 'aadharBack'];
      case 'VOTER_AADHAAR_OTP':
        return [...baseRequirement, 'voterId', 'aadharFront', 'aadharBack'];
      case 'DL_ONLY':
        return [...baseRequirement, 'drivingLicense'];
      case 'VOTER_ONLY':
        return [...baseRequirement, 'voterId'];
      default:
        return baseRequirement;
    }
  };

  const handleReset = () => {
    setStep(1);
    setFiles({});
    setVerificationId(null);
    setPurpose('TENANT');
    setVerificationType('AADHAAR_OTP');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <PurposeSelection
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as VerificationRequest['purpose'])}
          />
        );

      case 2:
        return (
          <DocumentUpload
            selectedType={verificationType}
            onTypeChange={setVerificationType}
            onFileChange={handleFileChange}
            files={files}
          />
        );

      case 3:
        return verificationId ? (
          <SuccessMessage
            verificationId={verificationId}
            onReset={handleReset}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <Card>
          <PageHeader
            title="New Verification Request"
            description="Complete the following steps to initiate a verification request"
          />

          <ProgressSteps currentStep={step} steps={VERIFICATION_STEPS} />

          {error && <Alert type="error" message={error} />}

          <form onSubmit={handleSubmit} className="mt-8">
            {renderStepContent()}

            <div className="mt-8 flex justify-end space-x-4">
              {step > 1 && step < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              {step < 3 && (
                <Button type="submit" loading={loading}>
                  {step === 2 ? 'Submit' : 'Next'}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </Container>
    </div>
  );
}