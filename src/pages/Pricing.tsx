import React from 'react';
import { Check, Mail } from 'lucide-react';
import { Container, PageHeader } from '../components/layout';
import { Button } from '../components/forms';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const navigate = useNavigate();
  const plans = [
    {
      name: 'B2C',
      description: 'Perfect for individuals and small businesses',
      price: '₹499',
      features: [
        'Up to 10 verifications per month',
        'Basic background checks',
        'Email support',
        'Standard processing time',
        'Basic report format',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'B2B',
      description: 'Ideal for medium to large businesses',
      price: 'Custom',
      features: [
        'Unlimited verifications',
        'Advanced background checks',
        'Priority support',
        'Fast-track processing',
        'Custom report format',
        'API access',
        'Dedicated account manager',
      ],
      cta: 'Contact Sales',
      popular: true,
    },
    {
      name: 'B2G',
      description: 'Tailored for government organizations',
      price: 'Custom',
      features: [
        'Enterprise-level verifications',
        'Comprehensive background checks',
        '24/7 support',
        'Priority processing',
        'Custom integration',
        'Compliance reports',
        'Dedicated support team',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <PageHeader
          title="Simple, Transparent Pricing"
          description="Choose the plan that's right for you"
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg bg-white overflow-hidden ${
                plan.popular ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-indigo-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-2 text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-500">/month</span>
                  )}
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                    onClick={() => {
                      if (plan.cta === 'Contact Sales') {
                        navigate('/contact');
                      } else {
                        navigate('/signup');
                      }
                    }}
                  >
                    {plan.cta === 'Contact Sales' && (
                      <Mail className="h-4 w-4 mr-2" />
                    )}
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Need a custom solution?
          </h3>
          <p className="mt-4 text-lg text-gray-500">
            Contact our sales team for custom pricing and enterprise solutions
          </p>
          <div className="mt-8">
            <Button onClick={() => (window.location.href = '/contact')}>
              <Mail className="h-4 w-4 mr-2" />
              Contact Sales
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
