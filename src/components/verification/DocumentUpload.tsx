import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { Button } from '../forms';

interface DocumentUploadProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasFile: boolean;
  capture?: boolean;
}

export default function DocumentUpload({ label, onChange, hasFile, capture }: DocumentUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <Button variant="outline" className="relative">
              <span>Upload Document</span>
              <input
                type="file"
                accept="image/*"
                capture={capture ? 'user' : undefined}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={onChange}
              />
            </Button>
          </div>
          {hasFile && (
            <div className="flex items-center justify-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              Document uploaded
            </div>
          )}
        </div>
      </div>
    </div>
  );
}