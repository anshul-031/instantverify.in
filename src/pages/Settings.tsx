import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/forms/Button';
import Input from '../components/forms/Input';

export default function Settings() {
  const { state } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Password updated successfully');
    } catch (err) {
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h2>

          <div className="space-y-8">
            {/* Password Change Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              <form onSubmit={handleChangePassword} className="space-y-6">
                <Input
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  required
                  showPasswordToggle
                />
                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  required
                  showPasswordToggle
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  required
                  showPasswordToggle
                />

                {error && (
                  <div className="text-sm text-red-600">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-sm text-green-600">
                    {success}
                  </div>
                )}

                <div className="flex justify-end">
                  <Button type="submit" loading={loading}>
                    Update Password
                  </Button>
                </div>
              </form>
            </div>

            {/* Language Preferences */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Language Preferences</h3>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={state.user?.preferredLanguage}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>

            {/* Notification Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="email-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="sms-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-900">
                    SMS Notifications
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}