import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showSectorModal, setShowSectorModal] = useState(false);

  const handleSectorSelect = (sector: 'formal' | 'informal') => {
    setShowSectorModal(false);
    navigate(`/loan/request/${sector}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px' }}>
      <header style={{ backgroundColor: 'white', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Loan App</h1>
          <button onClick={() => navigate('/loans')} style={{ padding: '8px 16px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px' }}>
            Past Loans
          </button>
        </div>
      </header>

      <main style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>
          Welcome to Your Loan Portal
        </h2>
        
        <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button
            onClick={() => navigate('/loan/pay')}
            style={{ padding: '12px 24px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
          >
            Pay Loan
          </button>
          
          <button
            onClick={() => setShowSectorModal(true)}
            style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
          >
            Request Loan
          </button>

          <button
            onClick={() => navigate('/uploadPDF')}
            style={{ padding: '12px 24px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}
          >
            Upload PDF
          </button>
        </div>
      </main>

      {showSectorModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', maxWidth: '400px', width: '90%' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Select Your Sector</h3>
            <p style={{ marginBottom: '24px', color: '#6b7280' }}>Are you from the Formal or Informal sector?</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => handleSectorSelect('formal')}
                style={{ padding: '16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ fontWeight: 'bold' }}>Formal Sector</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Employed with regular salary and bank statements</div>
              </button>
              
              <button
                onClick={() => handleSectorSelect('informal')}
                style={{ padding: '16px', border: '1px solid #d1d5db', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ fontWeight: 'bold' }}>Informal Sector</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Self-employed or irregular income</div>
              </button>
            </div>
            
            <button
              onClick={() => setShowSectorModal(false)}
              style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;