import React, { useState } from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '../forms';

export default function CreditBalance() {
  const [showRazorpay, setShowRazorpay] = useState(false);

  const creditPacks = [
    { id: 1, credits: 10, price: 999, popular: false },
    { id: 2, credits: 50, price: 4499, popular: true },
    { id: 3, credits: 100, price: 7999, popular: false },
  ];

  const handlePurchase = (packId: number) => {
    // Implement RazorPay integration here
    setShowRazorpay(true);
  };

  return (
    <div className="space-y-8">
      {/* Current Balance */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Current Balance</h3>
            <p className="mt-1 text-sm text-gray-500">
              Available credits for verifications
            </p>
          </div>
          <div className="text-3xl font-bold text-indigo-600">15 Credits</div>
        </div>
      </div>

      {/* Credit Packs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {creditPacks.map((pack) => (
          <div
            key={pack.id}
            className={`bg-white rounded-lg shadow p-6 ${
              pack.popular ? 'ring-2 ring-indigo-600' : ''
            }`}
          >
            {pack.popular && (
              <div className="text-xs font-medium text-indigo-600 mb-2">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-medium text-gray-900">
              {pack.credits} Credits
            </h3>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              ₹{pack.price.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              ₹{Math.round(pack.price / pack.credits)} per credit
            </p>
            <Button
              className="mt-4 w-full"
              variant={pack.popular ? 'primary' : 'outline'}
              onClick={() => handlePurchase(pack.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Purchase
            </Button>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Transaction History
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024-03-15
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  TXN123456789
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  +50
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹4,499
                </td>
              </tr>
              {/* Add more transaction history rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}