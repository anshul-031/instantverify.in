import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, Send, Camera } from 'lucide-react';
import { Button, Input, Alert, Select } from '../forms';
import { VerificationType } from '../../types';

interface DocumentUploadProps {
  selectedType: VerificationType;
  onTypeChange: (type: VerificationType) => void;
  onFileChange: (type: string, file: File) => void;
  files: Record<string, File | undefined>;
}

export default function DocumentUpload({ selectedType, onTypeChange, onFileChange, files }: DocumentUploadProps) {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [error, setError] = useState('');
  const [selectedCamera, setSelectedCamera] = useState('');
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [showCamera, setShowCamera] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const verificationTypes = [
    {
      type: 'AADHAAR_OTP' as VerificationType,
      label: 'Most Secure: Aadhaar ID + OTP',
      description: 'Highest level of verification using Aadhaar card and OTP verification',
      prerequisites: [
        'Original Aadhaar card for document upload',
        'Valid 12-digit Aadhaar number',
        'Access to mobile number registered with Aadhaar for OTP',
      ],
      required: ['aadharFront', 'aadharBack'],
      needsAadhaarNumber: true,
      needsOTP: true,
    },
    {
      type: 'DL_AADHAAR_OTP' as VerificationType,
      label: 'Most Secure: Driving License + Aadhaar OTP',
      description: 'Comprehensive verification using Driving License and Aadhaar OTP',
      prerequisites: [
        'Valid Driving License',
        'Valid 12-digit Aadhaar number (no card upload needed)',
        'Access to mobile number registered with Aadhaar for OTP',
      ],
      required: ['drivingLicense'],
      needsAadhaarNumber: true,
      needsOTP: true,
    },
    {
      type: 'VOTER_AADHAAR_OTP' as VerificationType,
      label: 'Most Secure: Voter ID + Aadhaar OTP',
      description: 'Complete verification using Voter ID and Aadhaar OTP',
      prerequisites: [
        'Valid Voter ID card',
        'Valid 12-digit Aadhaar number (no card upload needed)',
        'Access to mobile number registered with Aadhaar for OTP',
      ],
      required: ['voterId'],
      needsAadhaarNumber: true,
      needsOTP: true,
    },
    {
      type: 'DL_ONLY' as VerificationType,
      label: 'Medium Secure: Driving License Only',
      description: 'Basic verification using only Driving License',
      prerequisites: ['Valid Driving License'],
      required: ['drivingLicense'],
      needsAadhaarNumber: false,
      needsOTP: false,
    },
    {
      type: 'VOTER_ONLY' as VerificationType,
      label: 'Basic: Voter ID Only',
      description: 'Simple verification using only Voter ID',
      prerequisites: ['Valid Voter ID card'],
      required: ['voterId'],
      needsAadhaarNumber: false,
      needsOTP: false,
    },
  ];

  const selectedTypeInfo = verificationTypes.find(t => t.type === selectedType);

  React.useEffect(() => {
    // Get available cameras when component mounts
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (err) {
        setError('Failed to access camera devices');
      }
    };

    getCameras();

    // Cleanup function to stop any active streams
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleRequestOTP = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      setOtpTimer(600); // 10 minutes in seconds
      const interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setOtpSent(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startCamera = async (fieldName: string) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedCamera },
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(fieldName);
    } catch (err) {
      setError('Failed to access camera');
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !showCamera) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `${showCamera}.jpg`, { type: 'image/jpeg' });
        onFileChange(showCamera, file);
      }
    }, 'image/jpeg');

    // Stop the camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(null);
  };

  const renderFileUpload = (fieldName: string, label: string, cameraOnly = false) => (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        {showCamera === fieldName ? (
          <div className="space-y-4">
            <Select
              label="Select Camera"
              options={cameras.map(camera => ({
                value: camera.deviceId,
                label: camera.label || `Camera ${cameras.indexOf(camera) + 1}`,
              }))}
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
            />
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                  }
                  setShowCamera(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={capturePhoto}>
                <Camera className="h-4 w-4 mr-2" />
                Capture Photo
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex flex-col space-y-2">
                {!cameraOnly && (
                  <Button variant="outline" className="relative">
                    <span>Upload Document</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          onFileChange(fieldName, e.target.files[0]);
                        }
                      }}
                    />
                  </Button>
                )}
                <Button onClick={() => startCamera(fieldName)}>
                  <Camera className="h-4 w-4 mr-2" />
                  {cameraOnly ? 'Take Photo' : 'Capture with Camera'}
                </Button>
              </div>
              {files[fieldName] && (
                <div className="flex items-center justify-center text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {cameraOnly ? 'Photo captured' : 'Document uploaded'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Verification Type
        </label>
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedType}
          onChange={(e) => {
            onTypeChange(e.target.value as VerificationType);
            setOtpSent(false);
            setOtp('');
            setError('');
          }}
        >
          {verificationTypes.map((type) => (
            <option key={type.type} value={type.type}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {selectedTypeInfo && (
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Prerequisites for {selectedTypeInfo.label}
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p className="mb-2">{selectedTypeInfo.description}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedTypeInfo.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTypeInfo?.needsAadhaarNumber && (
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-grow">
              <Input
                label="Aadhaar Number"
                type="text"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                placeholder="Enter 12-digit Aadhaar number"
                pattern="[0-9]{12}"
                maxLength={12}
                required
              />
            </div>
            {selectedTypeInfo.needsOTP && (
              <div className="flex items-end">
                <Button
                  onClick={handleRequestOTP}
                  disabled={aadhaarNumber.length !== 12 || otpSent}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {otpSent ? `Resend OTP in ${formatTime(otpTimer)}` : 'Request OTP'}
                </Button>
              </div>
            )}
          </div>
          {otpSent && (
            <Input
              label="Enter OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              pattern="[0-9]{6}"
              maxLength={6}
              required
            />
          )}
        </div>
      )}

      {error && <Alert type="error" message={error} />}

      {selectedTypeInfo?.required.includes('drivingLicense') && (
        renderFileUpload('drivingLicense', 'Upload Driving License')
      )}

      {selectedTypeInfo?.required.includes('voterId') && (
        renderFileUpload('voterId', 'Upload Voter ID')
      )}

      {selectedTypeInfo?.required.includes('aadharFront') && (
        renderFileUpload('aadharFront', 'Upload Aadhaar Card (Front)')
      )}

      {selectedTypeInfo?.required.includes('aadharBack') && (
        renderFileUpload('aadharBack', 'Upload Aadhaar Card (Back)')
      )}

      {renderFileUpload('photo', 'Take Photo', true)}
    </div>
  );
}