import React, { useState } from "react";
import { api } from "../api";

export default function GoalSIPForm({ onResult }) {
  const [form, setForm]       = useState({ goal_amount: "", annual_return_rate: "", duration_years: "" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const { data } = await api.goalSip(form);
      onResult(data);
    } catch { setError("Calculation failed. Check your inputs."); }
    finally  { setLoading(false); }
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <h2 style={heading}>🎯 Goal SIP</h2>
      <p style={sub}>Find how much to invest monthly to reach your target!</p>
      <Field label="Target Goal Amount (₹)"   name="goal_amount"        value={form.goal_amount}        onChange={handle} placeholder="e.g. 5000000" />
      <Field label="Expected Return (% p.a.)" name="annual_return_rate" value={form.annual_return_rate} onChange={handle} placeholder="e.g. 12" />
      <Field label="Duration (Years)"         name="duration_years"     value={form.duration_years}     onChange={handle} placeholder="e.g. 15" />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" style={btn} disabled={loading}>{loading ? "Calculating…" : "Calculate →"}</button>
    </form>
  );
}

function Field({ label, name, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: "0.3rem" }}>{label}</label>
      <input name={name} value={value} onChange={onChange} placeholder={placeholder}
             type="number" min="0" step="any" required style={input} />
    </div>
  );
}

const formStyle = { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" };
const heading   = { marginTop: 0, marginBottom: "0.3rem", color: "#1a1a2e" };
const sub       = { color: "#666", fontSize: "0.9rem", marginBottom: "1.2rem" };
const input     = { width: "100%", padding: "0.7rem", borderRadius: "8px", border: "2px solid #e0e0e0", fontSize: "1rem", boxSizing: "border-box" };
const btn       = { width: "100%", padding: "0.9rem", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: 700, cursor: "pointer" };
