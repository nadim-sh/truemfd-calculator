import React, { useState } from "react";
import { api } from "../api";

export default function SWPForm({ onResult }) {
  const [form, setForm]       = useState({ corpus_amount: "", monthly_withdrawal: "", annual_return_rate: "", duration_years: "" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const { data } = await api.swp(form);
      onResult(data);
    } catch { setError("Calculation failed. Check your inputs."); }
    finally  { setLoading(false); }
  };

  const fields = [
    { label: "Total Corpus (₹)",          name: "corpus_amount",      placeholder: "e.g. 5000000" },
    { label: "Monthly Withdrawal (₹)",    name: "monthly_withdrawal", placeholder: "e.g. 30000"   },
    { label: "Expected Return (% p.a.)",  name: "annual_return_rate", placeholder: "e.g. 8"       },
    { label: "Duration (Years)",          name: "duration_years",     placeholder: "e.g. 20"      },
  ];

  return (
    <form onSubmit={submit} style={formStyle}>
      <h2 style={heading}>💸 SWP Calculator</h2>
      <p style={sub}>Plan your monthly withdrawals from your retirement corpus.</p>
      {fields.map(f => (
        <div key={f.name} style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "0.3rem" }}>{f.label}</label>
          <input name={f.name} value={form[f.name]} onChange={handle}
                 placeholder={f.placeholder} type="number" min="0" step="any" required style={input} />
        </div>
      ))}
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
