import React, { useState } from "react";
import { api } from "../api";

export default function XIRRForm({ onResult }) {
  const [rows,    setRows]    = useState([{ date: "", amount: "" }, { date: "", amount: "" }]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const updateRow = (i, field, val) => {
    const updated = [...rows];
    updated[i][field] = val;
    setRows(updated);
  };

  const addRow    = () => setRows([...rows, { date: "", amount: "" }]);
  const removeRow = (i) => setRows(rows.filter((_, idx) => idx !== i));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const cashflows = rows.map(r => ({ date: r.date, amount: parseFloat(r.amount) }));
      const { data }  = await api.xirr({ cashflows });
      onResult(data);
    } catch { setError("XIRR calculation failed. Check your cashflows."); }
    finally  { setLoading(false); }
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <h2 style={heading}>📐 XIRR Calculator</h2>
      <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "1rem" }}>
        Enter cashflows: <strong>negative = investment</strong>, <strong>positive = redemption</strong>
      </p>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.7rem", alignItems: "center" }}>
          <input type="date" value={row.date} onChange={e => updateRow(i, "date", e.target.value)}
                 required style={{ ...input, flex: 2 }} />
          <input type="number" value={row.amount} onChange={e => updateRow(i, "amount", e.target.value)}
                 placeholder="Amount" step="any" required style={{ ...input, flex: 2 }} />
          {rows.length > 2 && (
            <button type="button" onClick={() => removeRow(i)}
                    style={{ background: "#ff4444", color: "#fff", border: "none", borderRadius: "6px", padding: "0.5rem 0.7rem", cursor: "pointer" }}>✕</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addRow}
              style={{ width: "100%", padding: "0.6rem", background: "#f0f4f8", border: "2px dashed #ccc", borderRadius: "8px", cursor: "pointer", marginBottom: "1rem", fontWeight: 600 }}>
        + Add Row
      </button>
      {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
      <button type="submit" style={btn} disabled={loading}>{loading ? "Calculating…" : "Calculate XIRR →"}</button>
    </form>
  );
}

const formStyle = { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" };
const heading   = { marginTop: 0, marginBottom: "0.5rem", color: "#1a1a2e" };
const input     = { padding: "0.7rem", borderRadius: "8px", border: "2px solid #e0e0e0", fontSize: "0.95rem", boxSizing: "border-box" };
const btn       = { width: "100%", padding: "0.9rem", background: "#1a1a2e", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: 700, cursor: "pointer" };
