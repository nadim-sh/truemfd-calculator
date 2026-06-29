import React, { useState } from "react";
import { api } from "../api";

export default function GoalSIPForm({ onResult }) {
  const [form, setForm]       = useState({
    goal_amount: "", annual_return_rate: "", duration_years: ""
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const { data } = await api.goalSip(form);
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
        <span style={{ fontSize: "2rem" }}>🎯</span>
        <h2 style={headingStyle}>Goal SIP Calculator</h2>
        <p style={subStyle}>
          Enter your target amount — we will tell you exactly how much to invest monthly.
        </p>
      </div>
      <Field label="Target Goal Amount (₹)"    name="goal_amount"        value={form.goal_amount}        onChange={handle} placeholder="e.g. 50,00,000" />
      <Field label="Expected Annual Return (%)" name="annual_return_rate" value={form.annual_return_rate} onChange={handle} placeholder="e.g. 12" />
      <Field label="Investment Duration (Years)" name="duration_years"   value={form.duration_years}     onChange={handle} placeholder="e.g. 15" />
      {error && <p style={errorStyle}>⚠️ {error}</p>}
      <button type="submit" style={btnStyle} disabled={loading}>
        {loading ? "⏳ Calculating..." : "Find My Monthly SIP →"}
      </button>
      <p style={noteStyle}>Reverse SIP formula | Monthly compounding</p>
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
const subStyle     = { margin: "0.3rem 0 0", fontSize: "0.85rem", color: "#A59A8A", fontFamily: "'Lato', sans-serif" };
const labelStyle   = { display: "block", fontWeight: 600, marginBottom: "0.3rem", color: "#4B3425", fontSize: "0.9rem", fontFamily: "'Lato', sans-serif" };
const inputStyle   = { width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "2px solid #DDD1C2", fontSize: "1rem", boxSizing: "border-box", fontFamily: "'Lato', sans-serif", color: "#2E221B" };
const btnStyle     = { width: "100%", padding: "0.9rem", background: "linear-gradient(135deg, #B08D57, #8B6914)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "'Lato', sans-serif", marginTop: "0.5rem" };
const errorStyle   = { color: "#c0392b", fontSize: "0.85rem", padding: "0.5rem", background: "#fdf0ed", borderRadius: "6px" };
const noteStyle    = { textAlign: "center", fontSize: "0.75rem", color: "#
