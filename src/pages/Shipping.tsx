import React from 'react';
import { Container, PageHeader } from '../components/layout';

export default function Shipping() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <PageHeader
          title="Report Delivery Policy"
          description="Last updated: March 15, 2024"
        />

        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 prose max-w-none">
          <h2>Digital Report Delivery</h2>
          <p>
            All verification reports are delivered digitally through:
          </p>
          <ul>
            <li>Secure online dashboard access</li>
            <li>Encrypted PDF downloads</li>
            <li>Email notifications with secure links</li>
          </ul>

          <h2>Delivery Timeframes</h2>
          <p>
            Standard delivery timeframes for different verification types:
          </p>
          <ul>
            <li>Basic Verification: 24-48 hours</li>
            <li>Enhanced Verification: 3-5 business days</li>
            <li>Comprehensive Background Check: 5-7 business days</li>
          </ul>

          <h2>Express Delivery</h2>
          <p>
            Express processing options available:
          </p>
          <ul>
            <li>Priority Processing: 12-24 hours</li>
            <li>Same-Day Processing: Available for select services</li>
            <li>Additional fees apply for express services</li>
          </ul>

          <h2>Report Access</h2>
          <p>
            Verification reports can be accessed through:
          </p>
          <ul>
            <li>Secure client dashboard</li>
            <li>Mobile application</li>
            <li>API integration (for business clients)</li>
          </ul>

          <h2>Report Format</h2>
          <p>
            Reports are available in the following formats:
          </p>
          <ul>
            <li>PDF (digitally signed)</li>
            <li>Digital certificate</li>
            <li>API response (JSON/XML)</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            Our delivery system ensures:
          </p>
          <ul>
            <li>End-to-end encryption</li>
            <li>Secure access controls</li>
            <li>Audit trail of all access attempts</li>
            <li>Compliance with data protection regulations</li>
          </ul>

          <h2>Support</h2>
          <p>
            For delivery-related queries:
          </p>
          <ul>
            <li>Email: support@instantverify.in</li>
            <li>Phone: +91 (800) 123-4567</li>
            <li>Live Chat: Available during business hours</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}