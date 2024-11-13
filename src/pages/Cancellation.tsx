import React from 'react';
import { Container, PageHeader } from '../components/layout';

export default function Cancellation() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <PageHeader
          title="Cancellation and Refund Policy"
          description="Last updated: March 15, 2024"
        />

        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 prose max-w-none">
          <h2>Cancellation Policy</h2>
          <p>
            Our cancellation policy is designed to be fair and transparent:
          </p>
          <ul>
            <li>Verification requests can be cancelled before processing begins</li>
            <li>Once verification processing has started, cancellation is not possible</li>
            <li>Unused credits remain valid for 12 months from the date of purchase</li>
          </ul>

          <h2>Refund Eligibility</h2>
          <p>
            Refunds may be issued in the following cases:
          </p>
          <ul>
            <li>Service not initiated within 48 hours of request</li>
            <li>Technical issues preventing service delivery</li>
            <li>Duplicate charges or billing errors</li>
          </ul>

          <h2>Refund Process</h2>
          <p>
            To request a refund:
          </p>
          <ol>
            <li>Contact our support team within 7 days of purchase</li>
            <li>Provide your transaction ID and reason for refund</li>
            <li>Our team will review your request within 48 hours</li>
            <li>Approved refunds will be processed within 5-7 business days</li>
          </ol>

          <h2>Non-Refundable Items</h2>
          <p>
            The following are not eligible for refunds:
          </p>
          <ul>
            <li>Completed verification reports</li>
            <li>Partially used credit packages</li>
            <li>Services cancelled after processing has begun</li>
          </ul>

          <h2>Credit Validity</h2>
          <p>
            Important points about credit validity:
          </p>
          <ul>
            <li>Credits are valid for 12 months from purchase date</li>
            <li>Unused credits expire after the validity period</li>
            <li>Credits are non-transferable</li>
            <li>Expired credits are not eligible for refund</li>
          </ul>

          <h2>Contact Information</h2>
          <p>
            For refund requests or questions, contact us at:
          </p>
          <ul>
            <li>Email: support@instantverify.in</li>
            <li>Phone: +91 (800) 123-4567</li>
            <li>Support Hours: Monday to Friday, 9:00 AM to 6:00 PM IST</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}