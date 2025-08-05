import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Loan } from '../types';

const PastLoans: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock past loans data
  const pastLoans: Loan[] = [
    {
      id: 'LOAN-004',
      principal: 3000,
      interest: 450,
      dueDate: '2023-12-15',
      status: 'completed',
      sector: 'informal',
      createdAt: '2023-10-15',
    },
    {
      id: 'LOAN-005',
      principal: 8000,
      interest: 1200,
      dueDate: '2023-11-30',
      status: 'completed',
      sector: 'formal',
      createdAt: '2023-09-01',
    },
    {
      id: 'LOAN-006',
      principal: 1500,
      interest: 225,
      dueDate: '2023-10-20',
      status: 'completed',
      sector: 'informal',
      createdAt: '2023-08-20',
    },
    {
      id: 'LOAN-007',
      principal: 12000,
      interest: 1800,
      dueDate: '2024-01-15',
      status: 'pending',
      sector: 'formal',
      createdAt: '2023-11-15',
    },
  ];

  const handleViewDetails = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowDetailModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Past Loans</h1>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ← Back to Home
            </button>
          </div>

          {pastLoans.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Loan History</h3>
              <p className="text-gray-500">You haven't taken any loans yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sector
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pastLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {loan.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(loan.principal + loan.interest)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                          {loan.sector}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(loan.status)}`}>
                          {loan.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(loan.dueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(loan.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(loan)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                Loan Details - {selectedLoan.id}
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Loan Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Loan Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Principal Amount:</span>
                    <div className="font-medium">{formatCurrency(selectedLoan.principal)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Interest:</span>
                    <div className="font-medium">{formatCurrency(selectedLoan.interest)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Amount:</span>
                    <div className="font-medium text-lg">{formatCurrency(selectedLoan.principal + selectedLoan.interest)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Sector:</span>
                    <div className="font-medium capitalize">{selectedLoan.sector}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Application Date:</span>
                    <div className="font-medium">{formatDate(selectedLoan.createdAt)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Due Date:</span>
                    <div className="font-medium">{formatDate(selectedLoan.dueDate)}</div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Current Status</h4>
                <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(selectedLoan.status)}`}>
                  {selectedLoan.status}
                </span>
              </div>

              {/* Mock Additional Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Application Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Interest Rate:</span>
                    <span>15% per annum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Loan Term:</span>
                    <span>6 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Collateral:</span>
                    <span>Asset-backed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guarantors:</span>
                    <span>2 provided</span>
                  </div>
                </div>
              </div>

              {selectedLoan.status === 'pending' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Pending Application</h4>
                  <p className="text-sm text-yellow-700">
                    This loan application is still being processed. You can check the status on the loan pending page.
                  </p>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      navigate(`/loan/pending/${selectedLoan.id}`);
                    }}
                    className="mt-2 text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                  >
                    View Status
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastLoans;