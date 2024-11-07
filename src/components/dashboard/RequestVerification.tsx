import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Input, Button, Alert } from '../forms';

export default function RequestVerification() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Verification request sent successfully');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('Failed to send verification request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Request Verification
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter recipient's email"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Add a personal message to the verification request..."
            />
          </div>

          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}

          <div className="flex justify-end">
            <Button type="submit" loading={loading}>
              <Send className="h-4 w-4 mr-2" />
              Send Request
            </Button>
          </div>
        </form>

        <div className="mt-8 bg-gray-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-gray-900">
                How it works
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                The recipient will receive an email with a secure link to complete their verification process.
                You'll be notified once they complete the verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}