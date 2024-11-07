import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button, Input } from '../components/forms';
import { Container, Card, PageHeader } from '../components/layout';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Message sent successfully! We will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <PageHeader
          title="Contact Us"
          description="Have questions? We're here to help."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Get in Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
                  <div className="ml-4">
                    <p className="text-gray-900 font-medium">Office Address</p>
                    <p className="text-gray-600">
                      123 Verification Street<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-gray-900 font-medium">Phone</p>
                    <p className="text-gray-600">+91 (800) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-gray-900 font-medium">Email</p>
                    <p className="text-gray-600">support@instantverify.in</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input
                    label="First Name"
                    name="firstName"
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    required
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  required
                />

                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>

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
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}