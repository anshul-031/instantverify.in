import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  const styles = {
    success: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
    },
  };

  const { bg, text, icon } = styles[type];

  return (
    <div className={`rounded-md p-4 ${bg}`}>
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${text}`}>{message}</p>
        </div>
      </div>
    </div>
  );
}