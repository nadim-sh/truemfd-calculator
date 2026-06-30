import React, { useState, useEffect } from 'react';
import SIPForm from './components/SIPForm';
import StepUpForm from './components/StepUpForm';
import LumpsumForm from './components/LumpsumForm';
import GoalSIPForm from './components/GoalSIPForm';
import SWPForm from './components/SWPForm';
import PPFForm from './components/PPFForm';
import SIPLumpsumForm from './components/SIPLumpsumForm';
import CompareForm from './components/CompareForm';
import XIRRForm from './components/XIRRForm';
import ResultCard from './components/ResultCard';

const BRAND = {
  walnut: '#4B3425',
  espresso: '#2E221B',
  gold: '#B08D57',
  ivory: '#F4EFE8',
  beige: '#DDD1C2',
  stone: '#A59A8A',
};

const TABS = [
  { id: 'sip', label: 'SIP', icon: '📈' },
  { id: 'stepup', label: 'Step-Up', icon: '📊' },
  { id: 'lumpsum', label: 'Lumpsum', icon: '💵' },
  { id: 'goal', label: 'Goal SIP', icon: '🎯' },
  { id: 'swp', label: 'SWP', icon: '💸' },
  { id: 'ppf', label: 'PPF', icon: '🏦' },
  { id: 'siplump', label: 'SIP+Lump', icon: '🔀' },
  { id: 'compare', label: 'Compare', icon: '⚖️' },
  { id: 'xirr', label: 'XIRR', icon: '📐' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('sip');
  const [result, setResult] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderForm = () => {
    
    switch (activeTab) {
      case 'sip': return <SIPForm onResult={setResult} />;
      case 'stepup': return <StepUpForm onResult={setResult} />;
      case 'lumpsum': return <LumpsumForm onResult={setResult} />;
      case 'goal': return <GoalSIPForm onResult={setResult} />;
      case 'swp': return <SWPForm onResult={setResult} />;
      case 'ppf': return <PPFForm onResult={setResult} />;
      case 'siplump': return <SIPLumpsumForm onResult={setResult} />;
      case 'compare': return <CompareForm onResult={setResult} />;
      case 'xirr': return <XIRRForm onResult={setResult} />;
      default: return <SIPForm onResult={setResult} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: BRAND.ivory,
      fontFamily: "'Lato', sans-serif",
      color: BRAND.espresso,
    }}>
      {/* HEADER */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: `linear-gradient(135deg, ${BRAND.walnut} 0%, ${BRAND.espresso} 100%)`,
        color: BRAND.ivory,
        padding: isMobile ? '12px 16px' : '20px 40px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '20px' : '28px',
              margin: 0,
              color: BRAND.gold,
              letterSpacing: '0.5px',
            }}>
              TrueMFD
            </h1>
            <p style={{
              margin: 0,
              fontSize: isMobile ? '11px' : '13px',
              color: BRAND.beige,
              letterSpacing: '1px',
            }}>
              Calculator Suite
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: isMobile ? '10px' : '12px',
              color: BRAND.beige,
              opacity: 0.8,
            }}>
              ARN-2213
            </div>
            <div style={{
              fontSize: isMobile ? '9px' : '11px',
              color: BRAND.stone,
            }}>
              EUIN E073190
            </div>
          </div>
        </div>
      </header>

      {/* TAB BAR */}
      <nav style={{
        position: 'sticky',
        top: isMobile ? 64 : 92,
        zIndex: 99,
        backgroundColor: BRAND.beige,
        borderBottom: `2px solid ${BRAND.gold}`,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}>
        <div style={{
          display: 'inline-flex',
          padding: '8px',
          gap: '4px',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setResult(null); }}
              style={{
                background: activeTab === tab.id ? BRAND.walnut : 'transparent',
                color: activeTab === tab.id ? BRAND.ivory : BRAND.espresso,
                border: `1px solid ${activeTab === tab.id ? BRAND.walnut : BRAND.stone}`,
                borderRadius: '20px',
                padding: isMobile ? '8px 14px' : '10px 18px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "'Lato', sans-serif",
                whiteSpace: 'nowrap',
                minHeight: '40px',
              }}
            >
              <span style={{ marginRight: 6 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: isMobile ? '16px' : '32px 40px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '16px' : '24px',
      }}>
        {/* FORM PANEL */}
        <section style={{
          backgroundColor: '#fff',
          padding: isMobile ? '20px' : '32px',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(75,52,37,0.08)',
          border: `1px solid ${BRAND.beige}`,
        }}>
          {renderForm()}
        </section>

        {/* RESULT PANEL */}
        <section style={{
          backgroundColor: result ? '#fff' : BRAND.beige,
          padding: isMobile ? '20px' : '32px',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(75,52,37,0.08)',
          border: `1px solid ${BRAND.beige}`,
          minHeight: isMobile ? 'auto' : '300px',
        }}>
          {result ? (
            <ResultCard result={result} type={activeTab} />
          ) : (
            <div style={{
              textAlign: 'center',
              color: BRAND.stone,
              padding: '40px 20px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>💼</div>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '18px',
                color: BRAND.walnut,
                margin: 0,
              }}>
                Fill the form to see results
              </p>
              <p style={{ fontSize: '13px', marginTop: 8 }}>
                Your projection appears here
              </p>
            </div>
          )}
        </section>
      </main>

      {/* DISCLAIMER */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: isMobile ? '0 16px 16px' : '0 40px 24px',
      }}>
        <p style={{
          fontSize: '11px',
          color: BRAND.stone,
          fontStyle: 'italic',
          textAlign: 'center',
          lineHeight: 1.5,
          margin: 0,
        }}>
          ⚠️ Mutual fund investments are subject to market risks. Read all
          scheme-related documents carefully. Past performance is not indicative
          of future returns.
        </p>
      </div>

      {/* FOOTER */}
      <footer style={{
        background: `linear-gradient(135deg, ${BRAND.espresso} 0%, ${BRAND.walnut} 100%)`,
        color: BRAND.ivory,
        padding: isMobile ? '20px 16px' : '32px 40px',
        marginTop: '24px',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: isMobile ? 'block' : 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{ marginBottom: isMobile ? 16 : 0 }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              color: BRAND.gold,
              margin: '0 0 4px 0',
              fontSize: isMobile ? '18px' : '22px',
            }}>
              True Mutual Fund Distributor
            </h3>
            <p style={{
              margin: 0,
              fontSize: '12px',
              color: BRAND.beige,
              fontStyle: 'italic',
            }}>
              Guiding families with clarity and care
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '10px' : '20px',
            fontSize: '13px',
          }}>
            <a
              href="tel:9822204877"
              style={{
                color: BRAND.ivory,
                textDecoration: 'none',
                padding: isMobile ? '12px 16px' : '8px 14px',
                backgroundColor: 'rgba(176,141,87,0.2)',
                border: `1px solid ${BRAND.gold}`,
                borderRadius: '6px',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              📞 9822204877
            </a>
            <a
              href="mailto:nadim@truemfd.com"
              style={{
                color: BRAND.ivory,
                textDecoration: 'none',
                padding: isMobile ? '12px 16px' : '8px 14px',
                backgroundColor: 'rgba(176,141,87,0.2)',
                border: `1px solid ${BRAND.gold}`,
                borderRadius: '6px',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              ✉️ Email Us
            </a>
            <a
              href="https://www.truemfd.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: BRAND.ivory,
                textDecoration: 'none',
                padding: isMobile ? '12px 16px' : '8px 14px',
                backgroundColor: 'rgba(176,141,87,0.2)',
                border: `1px solid ${BRAND.gold}`,
                borderRadius: '6px',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              🌐 truemfd.com
            </a>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: `1px solid ${BRAND.stone}`,
          fontSize: '11px',
          color: BRAND.stone,
        }}>
          © {new Date().getFullYear()} TrueMFD · Nagpur · ARN-2213 · EUIN E073190
        </div>
      </footer>
    </div>
  );
}
