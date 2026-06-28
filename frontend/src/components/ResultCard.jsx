import React from "react";

export default function ResultCard({ data, type }) {
  const r = data.results;

  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  if (type === "Compare") {
    return (
      <div style={card}>
        <h2 style={heading}>⚖️ Comparison Result</h2>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Parameter</th>
              <th style={th}>SIP</th>
              <th style={th}>Lumpsum</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={td}>Total Invested</td>   <td style={td}>{fmt(data.sip.total_invested)}</td>    <td style={td}>{fmt(data.lumpsum.total_invested)}</td></tr>
            <tr><td style={td}>Est. Returns</td>      <td style={td}>{fmt(data.sip.estimated_returns)}</td> <td style={td}>{fmt(data.lumpsum.estimated_returns)}</td></tr>
            <tr style={{ background: "#f0f9f0" }}>
              <td style={td}><strong>Maturity</strong></td>
              <td style={td}><strong>{fmt(data.sip.maturity_amount)}</strong></td>
              <td style={td}><strong>{fmt(data.lumpsum.maturity_amount)}</strong></td>
            </tr>
            <tr><td style={td}>Wealth Gained</td>    <td style={td}>{data.sip.wealth_gained_percent}%</td>  <td style={td}>{data.lumpsum.wealth_gained_percent}%</td></tr>
          </tbody>
        </table>
        <div style={insight}>
          <strong>🏆 Winner: {data.comparison.better_option}</strong><br />
          {data.comparison.insight}
        </div>
        <p style={disclaimer}>{data.disclaimer}</p>
      </div>
    );
  }

  if (type === "XIRR") {
    return (
      <div style={card}>
        <h2 style={heading}>📐 XIRR Result</h2>
        <div style={resultRow}><span>XIRR</span><strong style={big}>{data.xirr_percent}%</strong></div>
        <p style={{ color: "#555", marginTop: "1rem" }}>{data.interpretation}</p>
        <p style={disclaimer}>{data.disclaimer}</p>
      </div>
    );
  }

  return (
    <div style={card}>
      <h2 style={heading}>
        {type === "SIP" ? "📊" : type === "Step-Up SIP" ? "📈" : "💰"} {type} Result
      </h2>
      <div style={resultRow}><span>Total Invested</span>    <strong>{fmt(r.total_invested)}</strong></div>
      <div style={resultRow}><span>Estimated Returns</span> <strong style={{ color: "#2e7d32" }}>{fmt(r.estimated_returns)}</strong></div>
      <div style={{ ...resultRow, background: "#e8f5e9", borderRadius: "10px", padding: "1rem" }}>
        <span><strong>💰 Maturity Amount</strong></span>
        <strong style={big}>{fmt(r.maturity_amount)}</strong>
      </div>
      <div style={resultRow}><span>Wealth Gained</span>     <strong>{r.wealth_gained_percent}%</strong></div>

      {data.yearly_breakdown && (
        <>
          <h3 style={{ marginTop: "1.5rem", color: "#1a1a2e" }}>📅 Yearly Breakdown</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Year</th>
                  <th style={th}>Monthly SIP</th>
                  <th style={th}>Invested</th>
                  <th style={th}>Value</th>
                </tr>
              </thead>
              <tbody>
                {data.yearly_breakdown.map(y => (
                  <tr key={y.year}>
                    <td style={td}>{y.year}</td>
                    <td style={td}>{fmt(y.monthly_sip)}</td>
                    <td style={td}>{fmt(y.invested_so_far)}</td>
                    <td style={td}>{fmt(y.maturity_value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <p style={disclaimer}>{data.disclaimer}</p>
    </div>
  );
}

const card       = { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" };
const heading    = { marginTop: 0, color: "#1a1a2e" };
const resultRow  = { display: "flex", justifyContent: "space-between", padding: "0.7rem 0", borderBottom: "1px solid #f0f0f0" };
const big        = { fontSize: "1.4rem", color: "#1a1a2e" };
const table      = { width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" };
const th         = { background: "#1a1a2e", color: "#fff", padding: "0.6rem", textAlign: "left" };
const td         = { padding: "0.5rem", borderBottom: "1px solid #eee" };
const insight    = { background: "#e8f5e9", borderRadius: "10px", padding: "1rem", margin: "1rem 0", color: "#2e7d32" };
const disclaimer = { fontSize: "0.75rem", color: "#999", marginTop: "1rem" };
