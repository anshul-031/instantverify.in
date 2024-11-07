import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
  steps: { id: number; label: string }[];
}

export default function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <div className="mb-8 mt-8">
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center ${
              step.id < currentStep ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                step.id === currentStep
                  ? 'border-indigo-600 text-indigo-600'
                  : step.id < currentStep
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-gray-300'
              }`}
            >
              {step.id}
            </div>
            <div
              className={`ml-4 text-sm font-medium ${
                step.id === currentStep ? 'text-indigo-600' : ''
              }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}