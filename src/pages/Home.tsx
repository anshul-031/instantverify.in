import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, FileCheck, AlertCircle, Camera, Search, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/forms';
import { Container, Section } from '../components/layout';

export default function Home() {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Tenant Verification',
      icon: Users,
      description: 'Comprehensive background checks for potential tenants.',
    },
    {
      title: 'Domestic Help Verification',
      icon: Shield,
      description: 'Verify domestic workers for a safer home environment.',
    },
    {
      title: 'Driver Verification',
      icon: FileCheck,
      description: 'Complete background verification for drivers.',
    },
    {
      title: 'Matrimonial Verification',
      icon: Search,
      description: 'Thorough background checks for matrimonial purposes.',
    },
  ];

  const features = [
    {
      title: 'Real-time Verification',
      description: 'Get instant verification results through our advanced system.',
      icon: Camera,
    },
    {
      title: 'Police Verification',
      description: 'Official verification reports from Indian Police records.',
      icon: AlertCircle,
    },
  ];

  const steps = [
    {
      title: 'Upload Documents',
      description: 'Upload Aadhaar card and take a photo for verification.',
      icon: FileCheck,
    },
    {
      title: 'Verify Identity',
      description: 'We verify your identity through DigiLocker integration.',
      icon: Shield,
    },
    {
      title: 'Get Report',
      description: 'Receive a comprehensive verification report instantly.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-800">
        <Container className="py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Instant Background</span>
              <span className="block">Verification Services</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Trusted verification services for a safer community. Get comprehensive background checks instantly.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button onClick={() => navigate('/verification')}>
                Start Verification
              </Button>
              <Button variant="outline" onClick={() => navigate('/contact')}>
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Services Section */}
      <Section className="py-24 bg-gray-50">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose from our range of verification services
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate('/verification')}
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Simple steps to get your verification report
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                <p className="mt-2 text-gray-500">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-4 h-6 w-6 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="py-24 bg-gray-50">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Our verification process is simple, fast, and reliable
            </p>
          </div>

          <div className="mt-20">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {feature.title}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-indigo-700">
        <Container className="py-12 lg:py-16">
          <div className="px-6 py-6 md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
            <div className="xl:w-0 xl:flex-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to get started?
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
                Start your verification process today and ensure a safer tomorrow.
              </p>
            </div>
            <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
              <Button
                onClick={() => navigate('/verification')}
                className="w-full"
              >
                Start Verification
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}