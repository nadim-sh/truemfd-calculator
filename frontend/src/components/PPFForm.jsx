import React, { useState } from "react";
import { api } from "../api";

export default function PPFForm({ onResult }) {
  const [form, setForm]       = useState({ annual_investment: "", duration_years: "15" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const { data } = await api.ppf(form);
      onResult(data);
    } catch { setError("Calculation failed. Check your inputs."); }
    finally  { setLoading(false); }
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <h2 style={heading}>🏦 PPF Calculator</h2>
      <p style={sub}>7.1% p.a. | Tax-free returns | Section 80C benefit</p>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.3rem" }}>
          Annual Investment (₹) — Max ₹1,50,000
        </label>
        <input name="annual_investment" value={form.annual_investment} onChange={handle}
               placeholder="e.g. 150000" type="number" min="500" max="150000"
               step="any" required style={input} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: "0.3rem" }}>
          Duration (Years) — Min 15 years
        </label>
        <input name="duration_years" value={form.duration_years} onChange={handle}
               placeholder="e.g. 15" type="number" min="15" max="50"
               required style={input} />
      </div>
      <div style={{ background: "#fff8e1", borderRadius: "8px", padding: "0.8rem", marginBottom: "1rem", fontSize: "0.85rem", color: "#f57f17" }}>
        ⚠️ PPF rate set by Government (currently 7.1% p.a.) — may change quarterly.
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" style={btn} disabled={loading}>{loading ? "Calculating…" : "Calculate →"}</button>
    </form>
  );
}

const formStyle = { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" };
const heading   = { marginTop: 0, marginBottom: "0.3rem", color: "#1a1a2e" };
const sub       = { color: "#666", fontSize: "0.9rem", marginBottom: "1.2rem" };
const input     = { width: "100%", padding: "0.7rem", borderRadius: "8px", border: "2px solid #e0e0e0", fontSize: "1rem", boxSizing: "border-box" };
const btn       = { width: "100%", padding: "0.9rem", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: 700, cursor: "pointer" };
