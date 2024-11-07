import React, { useState } from 'react';
import { Alert } from '../components/forms';
import { Container, Card, PageHeader } from '../components/layout';
import { Button } from '../components/forms';
import { VerificationRequest } from '../types';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [files, setFiles] = useState<{
    photo?: File;
    aadharFront?: File;
    aadharBack?: File;
  }>({});

  const handleFileChange = (type: keyof typeof files) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (step === 2 && (!files.photo || !files.aadharFront || !files.aadharBack)) {
        throw new Error('Please upload all required documents');
      }

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (step === 2) {
        setVerificationId('VER123456789');
      }
      
      setStep(step + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFiles({});
    setVerificationId(null);
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
          <div className="space-y-6">
            <DocumentUpload
              label="Take Photo"
              onChange={handleFileChange('photo')}
              hasFile={!!files.photo}
              capture
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <DocumentUpload
                label="Aadhaar Front"
                onChange={handleFileChange('aadharFront')}
                hasFile={!!files.aadharFront}
              />
              <DocumentUpload
                label="Aadhaar Back"
                onChange={handleFileChange('aadharBack')}
                hasFile={!!files.aadharBack}
              />
            </div>
          </div>
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

            <div className="mt-8 flex justify-end">
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