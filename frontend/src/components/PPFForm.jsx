import React, { useState } from "react";
import { api } from "../api";

export default function PPFForm({ onResult }) {
  const [form, setForm] = useState({
    annual_investment: "",
    duration_years: "15"
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.ppf(form);
      onResult(data);
    } catch {
      setError("Calculation failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <div style={headerStyle}>
        <span style={{ fontSize: "2rem" }}>🏛️</span>
        <h2 style={headingStyle}>PPF Calculator</h2>
        <p style={subStyle}>Public Provident Fund — 7.1% p.a. | Tax benefit under 80C.</p>
      </div>
      <Field label="Annual Investment (₹) — Max ₹1.5 Lakh" name="annual_investment" value={form.annual_investment} onChange={handle} placeholder="e.g. 150000" />
      <Field label="Duration (Years) — Min 15 Years"        name="duration_years"    value={form.duration_years}    onChange={handle} placeholder="e.g. 15" />
      {error && <p style={errorStyle}>⚠️ {error}</p>}
      <button type="submit" style={btnStyle} disabled={loading}>
        {loading ? "⏳ Calculating..." : "Calculate PPF →"}
      </button>
      <p style={noteStyle}>Interest rate: 7.1% p.a. | Compounded annually</p>
    </form>
  );
}

function Field({ label, name, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "1.2rem" }}>
      <label style={labelStyle}>{label}</label>
      <input name={name} value={value} onChange={onChange}
             placeholder={placeholder} type="number"
             min="0" step="any" required style={inputStyle} />
    </div>
  );
}

const formStyle    = { background: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 24px rgba(75,52,37,0.10)", border: "1px solid #DDD1C2" };
const headerStyle  = { marginBottom: "1.8rem", paddingBottom: "1rem", borderBottom: "2px solid #B08D57" };
const headingStyle = { margin: "0.3rem 0 0", fontSize: "1.4rem", fontWeight: 700, color: "#4B3425", fontFamily: "'Playfair Display', Georgia, serif" };
const subStyle     = { margin: "0.3rem 0 0", fontSize: "0.85rem", color: "#A59A8A" };
const labelStyle   = { display: "block", fontWeight: 600, marginBottom: "0.3rem", color: "#4B3425", fontSize: "0.9rem" };
const inputStyle   = { width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "2px solid #DDD1C2", fontSize: "1rem", boxSizing: "border-box", color: "#2E221B" };
const btnStyle     = { width: "100%", padding: "0.9rem", background: "linear-gradient(135deg, #B08D57, #8B6914)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", marginTop: "0.5rem" };
const errorStyle   = { color: "#c0392b", fontSize: "0.85rem", padding: "0.5rem", background: "#fdf0ed", borderRadius: "6px" };
const noteStyle    = { textAlign: "center", fontSize: "0.75rem", color: "#A59A8A", marginTop: "1rem" };
