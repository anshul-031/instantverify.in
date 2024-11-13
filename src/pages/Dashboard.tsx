import React, { useState } from 'react';
import { Search, CreditCard, History, FileText } from 'lucide-react';
import { Container, Card, PageHeader } from '../components/layout';
import { Input, Button } from '../components/forms';
import VerificationHistory from '../components/dashboard/VerificationHistory';
import CreditBalance from '../components/dashboard/CreditBalance';
import RequestVerification from '../components/dashboard/RequestVerification';
import Verification from './Verification';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('newVerification');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'history':
        return <VerificationHistory />;
      case 'credits':
        return <CreditBalance />;
      case 'request':
        return <RequestVerification />;
      case 'newVerification':
        return <Verification />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="space-y-8">
          <PageHeader
            title="Dashboard"
            description="Manage your verifications and credits"
          />

          {/* Search Bar */}
          <Card>
            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <Input
                  type="search"
                  placeholder="Search by verification ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  label=""
                />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </Card>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('newVerification')}
                className={`${
                  activeTab === 'newVerification'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FileText className="h-4 w-4 mr-2" />
                New Verification
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`${
                  activeTab === 'history'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <History className="h-4 w-4 mr-2" />
                Verification History
              </button>
              <button
                onClick={() => setActiveTab('credits')}
                className={`${
                  activeTab === 'credits'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Credit Balance
              </button>
              <button
                onClick={() => setActiveTab('request')}
                className={`${
                  activeTab === 'request'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Request Verification
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">{renderTabContent()}</div>
        </div>
      </Container>
    </div>
  );
}
