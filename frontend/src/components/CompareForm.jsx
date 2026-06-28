import React, { useState } from "react";
import { api } from "../api";

export default function CompareForm({ onResult }) {
  const [form, setForm]       = useState({ monthly_investment: "", annual_return_rate: "", duration_years: "" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const { data } = await api.compare(form);
      onResult(data);
    } catch { setError("Comparison failed. Check your inputs."); }
    finally  { setLoading(false); }
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <h2 style={heading}>⚖️ SIP vs Lumpsum</h2>
      <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Compares monthly SIP vs investing the same total amount as lumpsum.
      </p>
      <Field label="Monthly SIP (₹)"        name="monthly_investment" value={form.monthly_investment} onChange={handle} placeholder="e.g. 10000" />
      <Field label="Expected Return (% p.a.)" name="annual_return_rate" value={form.annual_return_rate} onChange={handle} placeholder="e.g. 12" />
      <Field label="Duration (Years)"        name="duration_years"     value={form.duration_years}     onChange={handle} placeholder="e.g. 10" />
      {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
      <button type="submit" style={btn} disabled={loading}>{loading ? "Comparing…" : "Compare →"}</button>
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
const heading   = { marginTop: 0, marginBottom: "0.5rem", color: "#1a1a2e" };
const input     = { width: "100%", padding: "0.7rem", borderRadius: "8px", border: "2px solid #e0e0e0", fontSize: "1rem", boxSizing: "border-box" };
const btn       = { width: "100%", padding: "0.9rem", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: 700, cursor: "pointer" };
