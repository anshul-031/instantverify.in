import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                InstantVerify.in
              </span>
            </div>
            <p className="mt-4 text-gray-600">
              Trusted background verification services for a safer community.
              Instant, reliable, and comprehensive verification solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/verification" className="text-gray-600 hover:text-indigo-600">
                  Tenant Verification
                </Link>
              </li>
              <li>
                <Link to="/verification" className="text-gray-600 hover:text-indigo-600">
                  Domestic Help Verification
                </Link>
              </li>
              <li>
                <Link to="/verification" className="text-gray-600 hover:text-indigo-600">
                  Driver Verification
                </Link>
              </li>
              <li>
                <Link to="/verification" className="text-gray-600 hover:text-indigo-600">
                  Matrimonial Verification
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-indigo-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} InstantVerify.in. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}