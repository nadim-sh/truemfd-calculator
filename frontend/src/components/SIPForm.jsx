import React, { useState } from 'react';
import { calculateSIP } from '../api';

const BRAND = {
  walnut: '#4B3425',
  espresso: '#2E221B',
  gold: '#B08D57',
  ivory: '#F4EFE8',
  beige: '#DDD1C2',
  stone: '#A59A8A',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  fontSize: '16px',
  border: `1px solid ${BRAND.beige}`,
  borderRadius: '8px',
  fontFamily: "'Lato', sans-serif",
  color: BRAND.espresso,
  backgroundColor: BRAND.ivory,
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: BRAND.walnut,
  marginBottom: '6px',
  marginTop: '14px',
};

export default function SIPForm({ onResult }) {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await calculateSIP({
        monthly_investment: Number(monthly),
        years: Number(years),
        annual_rate: Number(rate),
      });
      onResult(data);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        color: BRAND.walnut,
        margin: '0 0 6px 0',
        fontSize: '22px',
      }}>
        📈 SIP Calculator
      </h2>
      <p style={{ fontSize: '13px', color: BRAND.stone, margin: '0 0 16px 0' }}>
        Calculate maturity for monthly investments
      </p>

      <label style={labelStyle}>Monthly Investment (₹)</label>
      <input
        type="number"
        value={monthly}
        onChange={(e) => setMonthly(e.target.value)}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Investment Period (Years)</label>
      <input
        type="number"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Expected Annual Return (%)</label>
      <input
        type="number"
        step="0.1"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        style={inputStyle}
        required
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          marginTop: '20px',
          padding: '14px',
          fontSize: '15px',
          fontWeight: 700,
          color: BRAND.ivory,
          backgroundColor: BRAND.walnut,
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'wait' : 'pointer',
          fontFamily: "'Lato', sans-serif",
          letterSpacing: '0.5px',
        }}
      >
        {loading ? 'Calculating...' : 'Calculate →'}
      </button>
    </form>
  );
}
