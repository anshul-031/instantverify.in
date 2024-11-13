import React from 'react';
import { Container, PageHeader } from '../components/layout';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <PageHeader
          title="Terms and Conditions"
          description="Last updated: March 15, 2024"
        />

        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 prose max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using InstantVerify.in, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
          </p>

          <h2>2. Services Description</h2>
          <p>
            InstantVerify.in provides background verification services including but not limited to:
          </p>
          <ul>
            <li>Tenant verification</li>
            <li>Domestic help verification</li>
            <li>Driver verification</li>
            <li>Matrimonial verification</li>
          </ul>

          <h2>3. User Obligations</h2>
          <p>
            Users must:
          </p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of their account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not misuse or attempt to manipulate our services</li>
          </ul>

          <h2>4. Payment Terms</h2>
          <p>
            Users agree to:
          </p>
          <ul>
            <li>Pay all applicable fees for services</li>
            <li>Provide valid payment information</li>
            <li>Accept our refund and cancellation policies</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content, features, and functionality of InstantVerify.in are owned by us and protected by intellectual property laws.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            InstantVerify.in shall not be liable for:
          </p>
          <ul>
            <li>Indirect, incidental, or consequential damages</li>
            <li>Loss of profits or data</li>
            <li>Service interruptions or delays</li>
          </ul>

          <h2>7. Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to our services for violations of these terms or for any other reason at our discretion.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Users will be notified of significant changes.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            For questions about these terms, please contact:
          </p>
          <ul>
            <li>Email: legal@instantverify.in</li>
            <li>Phone: +91 (800) 123-4567</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}