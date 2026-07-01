import React, { useState } from "react";
import { api } from "../api";

export default function XIRRForm({ onResult }) {
  const [rows,    setRows]    = useState([{ date: "", amount: "" }, { date: "", amount: "" }]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const updateRow = (i, field, value) => {
    const updated = rows.map((r, idx) => idx === i ? { ...r, [field]: value } : r);
    setRows(updated);
  };

  const addRow    = () => setRows([...rows, { date: "", amount: "" }]);
  const removeRow = (i) => { if (rows.length > 2) setRows(rows.filter((_, idx) => idx !== i)); };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cashflows = rows.map(r => ({ date: r.date, amount: parseFloat(r.amount) }));
      const { data }  = await api.xirr({ cashflows });
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
        <span style={{ fontSize: "2rem" }}>📐</span>
        <h2 style={headingStyle}>XIRR Calculator</h2>
        <p style={subStyle}>Calculate your actual annualized returns from irregular cashflows.</p>
      </div>
      <p style={noteStyle}>
        Enter negative amounts for investments, positive for redemptions.
      </p>
      {rows.map((row, i) => (
        <div key={i} style={rowStyle}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Date</label>
            <input type="date" value={row.date}
                   onChange={(e) => updateRow(i, "date", e.target.value)}
                   required style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Amount (₹)</label>
            <input type="number" value={row.amount} step="any"
                   onChange={(e) => updateRow(i, "amount", e.target.value)}
                   placeholder="e.g. -10000" required style={inputStyle} />
          </div>
          {rows.length > 2 && (
            <button type="button" onClick={() => removeRow(i)} style={removeBtnStyle}>✕</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addRow} style={addBtnStyle}>+ Add Cashflow</button>
      {error && <p style={errorStyle}>⚠️ {error}</p>}
      <button type="submit" style={btnStyle} disabled={loading}>
        {loading ? "⏳ Calculating..." : "Calculate XIRR →"}
      </button>
    </form>
  );
}

const formStyle    = { background: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 4px 24px rgba(75,52,37,0.10)", border: "1px solid #DDD1C2" };
const headerStyle  = { marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "2px solid #B08D57" };
const headingStyle = { margin: "0.3rem 0 0", fontSize: "1.4rem", fontWeight: 700, color: "#4B3425", fontFamily: "'Playfair Display', Georgia, serif" };
const subStyle     = { margin: "0.3rem 0 0", fontSize: "0.85rem", color: "#A59A8A" };
const rowStyle     = { display: "flex", gap: "0.8rem", alignItems: "flex-end", marginBottom: "0.8rem" };
const labelStyle   = { display: "block", fontWeight: 600, marginBottom: "0.3rem", color: "#4B3425", fontSize: "0.85rem" };
const inputStyle   = { width: "100%", padding: "0.65rem", borderRadius: "8px", border: "2px solid #DDD1C2", fontSize: "0.9rem", boxSizing: "border-box", color: "#2E221B" };
const btnStyle     = { width: "100%", padding: "0.9rem", background: "linear-gradient(135deg, #B08D57, #8B6914)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", marginTop: "0.5rem" };
const addBtnStyle  = { width: "100%", padding: "0.6rem", background: "#F4EFE8", color: "#4B3425", border: "2px solid #DDD1C2", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", marginBottom: "1rem" };
const removeBtnStyle = { padding: "0.65rem 0.8rem", background: "#fdf0ed", color: "#c0392b", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 700 };
const errorStyle   = { color: "#c0392b", fontSize: "0.85rem", padding: "0.5rem", background: "#fdf0ed", borderRadius: "6px" };
const noteStyle    = { fontSize: "0.8rem", color: "#A59A8A", marginBottom: "1rem", background: "#F4EFE8", padding: "0.6rem", borderRadius: "6px" };
