import React from 'react';
import { Container, PageHeader } from '../components/layout';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <PageHeader
          title="Privacy Policy"
          description="Last updated: March 15, 2024"
        />

        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 prose max-w-none">
          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name, email address, and contact information</li>
            <li>Government-issued identification documents</li>
            <li>Photographs for verification purposes</li>
            <li>Payment information</li>
            <li>Communication preferences</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your verification requests</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Prevent fraud and enhance security</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul>
            <li>End-to-end encryption for sensitive data</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure data storage and transmission</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Request data portability</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@instantverify.in</li>
            <li>Phone: +91 (800) 123-4567</li>
            <li>Address: 123 Verification Street, Mumbai, Maharashtra 400001, India</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}