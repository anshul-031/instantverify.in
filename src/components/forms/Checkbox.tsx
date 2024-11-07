import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={`
          h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded
          ${className}
        `}
        {...props}
      />
      <label htmlFor={props.id} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
}