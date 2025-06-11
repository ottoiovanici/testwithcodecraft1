import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'thank-you') {
        setCurrentPage('thank-you');
      } else {
        setCurrentPage('dashboard');
      }
    };

    // Set initial page based on current hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'thank-you':
        return <ThankYouPage />;
      default:
        return (
          <div className="App">
            <Dashboard />
            <div style={{ 
              position: 'fixed', 
              bottom: '20px', 
              right: '20px', 
              zIndex: 1000 
            }}>
              <button
                onClick={() => window.location.hash = 'thank-you'}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                  }
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
              >
                Need Help Leaving? 📋
              </button>
            </div>
          </div>
        );
    }
  };

  return renderPage();
}

export default App;