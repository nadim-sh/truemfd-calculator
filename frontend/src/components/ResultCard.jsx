import React from "react";

export default function ResultCard({ data, type }) {
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  // ── GOAL SIP ──────────────────────────────────────
  if (type === "Goal SIP") {
    const r = data.results;
    return (
      <div style={card}>
        <h2 style={heading}>🎯 Goal SIP Result</h2>
        <div style={highlightBox}>
          <div style={highlightLabel}>Required Monthly SIP</div>
          <div style={highlightValue}>{fmt(r.required_monthly_sip)}</div>
        </div>
        <Row label="Target Goal Amount"  value={fmt(r.goal_amount)} />
        <Row label="Total Investment"    value={fmt(r.total_investment)} />
        <Row label="Total Gains"         value={fmt(r.total_gains)} color="#2e7d32" />
        <Row label="Duration"            value={`${r.duration_years} Years`} />
        <Row label="Expected Return"     value={`${r.annual_return_rate}% p.a.`} />
        <Row label="Wealth Gained"       value={`${r.wealth_gained_percent}%`} />
        <p style={disclaimer}>{data.disclaimer}</p>
      </div>
    );
  }

  // ── SWP ───────────────────────────────────────────
  if (type === "SWP") {
    const r = data.results;
    return (
      <div style={card}>
        <h2 style={heading}>🔄 SWP Result</h2>
        <div style={r.corpus_survives ? successBox : warningBox}>
          {r.corpus_survives
            ? "✅ Corpus survives the full withdrawal period!"
            : "⚠️ Corpus gets exhausted before the period ends."}
        </div>
        <Row label="Starting Corpus"     value={fmt(r.corpus_amount)} />
        <Row label="Monthly Withdrawal"  value={fmt(r.monthly_withdrawal)} />
        <Row label="Annual Return"       value={`${r.annual_return_rate}% p.a.`} />
        <Row label="Duration"            value={`${r.duration_years} Years`} />
        <Row label="Total Withdrawn"     value={fmt(r.total_withdrawn)} color="#2e7d32" />
        <Row label="Final Balance"       value={fmt(r.final_balance)}
             color={r.final_balance > 0 ? "#2e7d32" : "#c0392b"} />

        {r.yearly_breakdown?.length > 0 && (
          <>
            <h3 style={tableTitle}>📅 Yearly Breakdown</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={table}>
                <thead>
                  <tr>
                    <th style={th}>Year</th>
                    <th style={th}>Withdrawn</th>
                    <th style={th}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {r.yearly_breakdown.map((y) => (
                    <tr key={y.year}>
                      <td style={td}>{y.year}</td>
                      <td style={td}>{fmt(y.total_withdrawn)}</td>
                      <td style={td}>{fmt(y.balance)}</td>
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

  // ── PPF ───────────────────────────────────────────
  if (type === "PPF") {
    const r = data.results;
    return (
      <div style={card}>
        <h2 style={heading}>🏛️ PPF Result</h2>
        <div style={successBox}>
          🏛️ {r.tax_benefit}
        </div>
        <div style={highlightBox}>
          <div style={highlightLabel}>Maturity Amount</div>
          <div style={highlightValue}>{fmt(r.maturity_amount)}</div>
        </div>
        <Row label="Annual Investment"   value={fmt(r.annual_investment)} />
        <Row label="Duration"            value={`${r.duration_years} Years`} />
        <Row label="Interest Rate"       value={`${r.interest_rate}% p.a.`} />
        <Row label="Total Invested"      value={fmt(r.total_invested)} />
        <Row label="Estimated Returns"   value={fmt(r.estimated_returns)} color="#2e7d32" />
        <Row label="Wealth Gained"       value={`${r.wealth_gained_percent}%`} />

        {r.yearly_breakdown?.length > 0 && (
          <>
            <h3 style={tableTitle}>📅 Yearly Breakdown</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={table}>
                <thead>
                  <tr>
                    <th style={th}>Year</th>
                    <th style={th}>Invested</th>
                    <th style={th}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {r.yearly_breakdown.map((y) => (
                    <tr key={y.year}>
                      <td style={td}>{y.year}</td>
                      <td style={td}>{fmt(y.invested)}</td>
                      <td style={td}>{fmt(y.balance)}</td>
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

  // ── SIP + LUMPSUM COMBINED ────────────────────────
  if (type === "SIP + Lumpsum") {
    const r = data.results;
    return (
      <div style={card}>
        <h2 style={heading}>💎 SIP + Lumpsum Result</h2>
        <div style={highlightBox}>
          <div style={highlightLabel}>💰 Total Maturity Amount</div>
          <div style={highlightValue}>{fmt(r.total_maturity)}</div>
        </div>

        <div style={{ display: "flex", gap: "1rem", margin: "1rem 0", flexWrap: "wrap" }}>
          <div style={miniCard}>
            <div style={miniLabel}>💰 Lumpsum Maturity</div>
            <div style={miniValue}>{fmt(r.lumpsum_maturity)}</div>
            <div style={miniSub}>Invested: {fmt(r.lumpsum_invested)}</div>
            <div style={miniSub}>Gains: {fmt(r.lumpsum_gains)}</div>
          </div>
          <div style={miniCard}>
            <div style={miniLabel}>📅 SIP Maturity</div>
            <div style={miniValue}>{fmt(r.sip_maturity)}</div>
            <div style={miniSub}>Invested: {fmt(r.sip_invested)}</div>
            <div style={miniSub}>Gains: {fmt(r.sip_gains)}</div>
          </div>
        </div>

        <Row label="Total Invested"      value={fmt(r.total_invested)} />
        <Row label="Total Gains"         value={fmt(r.total_gains)} color="#2e7d32" />
        <Row label="Wealth Gained"       value={`${r.wealth_gained_percent}%`} />
        <Row label="Annual Return"       value={`${r.annual_return_rate}% p.a.`} />
        <Row label="Duration"            value={`${r.duration_years} Years`} />
        <p style={disclaimer}>{data.disclaimer}</p>
      </div>
    );
  }
  // ── COMPARE ───────────────────────────────────────
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
            <tr>
              <td style={td}>Total Invested</td>
              <td style={td}>{fmt(data.sip.total_invested)}</td>
              <td style={td}>{fmt(data.lumpsum.total_invested)}</td>
            </tr>
            <tr>
              <td style={td}>Est. Returns</td>
              <td style={td}>{fmt(data.sip.estimated_returns)}</td>
              <td style={td}>{fmt(data.lumpsum.estimated_returns)}</td>
            </tr>
            <tr style={{ background: "#F4EFE8" }}>
              <td style={td}><strong>Maturity</strong></td>
              <td style={td}><strong>{fmt(data.sip.maturity_amount)}</strong></td>
              <td style={td}><strong>{fmt(data.lumpsum.maturity_amount)}</strong></td>
            </tr>
            <tr>
              <td style={td}>Wealth Gained</td>
              <td style={td}>{data.sip.wealth_gained_percent}%</td>
              <td style={td}>{data.lumpsum.wealth_gained_percent}%</td>
            </tr>
          </tbody>
        </table>
        <div style={winnerBox}>
          <strong>🏆 Winner: {data.comparison.better_option}</strong>
          <br />{data.comparison.insight}
        </div>
        <p style={disclaimer}>{data.disclaimer}</p>
      </div>
    );
  }

  // ── XIRR ──────────────────────────────────────────
  if (type === "XIRR") {
    return (
      <div style={card}>
        <h2 style={heading}>📐 XIRR Result</h2>
        <div style={highlightBox}>
          <div style={highlightLabel}>Your XIRR</div>
          <div style={highlightValue}>{data.xirr_percent}%</div>
        </div>
        <p style={{ color: "#4B3425", marginTop: "1rem", fontSize: "0.95rem" }}>
          {data.interpretation}
        </p>
        <p style={disclaimer}>{data.disclaimer}</p>
      </div>
    );
  }

  // ── SIP / STEP-UP / LUMPSUM ───────────────────────
  const r = data.results;
  const icons = { "SIP": "📊", "Step-Up SIP": "📈", "Lumpsum": "💰" };

  return (
    <div style={card}>
      <h2 style={heading}>{icons[type] || "📊"} {type} Result</h2>
      <div style={highlightBox}>
        <div style={highlightLabel}>💰 Maturity Amount</div>
        <div style={highlightValue}>{fmt(r.maturity_amount)}</div>
      </div>
      <Row label="Total Invested"    value={fmt(r.total_invested)} />
      <Row label="Estimated Returns" value={fmt(r.estimated_returns)} color="#2e7d32" />
      <Row label="Wealth Gained"     value={`${r.wealth_gained_percent}%`} />

      {data.yearly_breakdown?.length > 0 && (
        <>
          <h3 style={tableTitle}>📅 Yearly Breakdown</h3>
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
                {data.yearly_breakdown.map((y) => (
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

// ── Reusable Row Component ─────────────────────────
function Row({ label, value, color }) {
  return (
    <div style={resultRow}>
      <span style={{ color: "#A59A8A", fontSize: "0.9rem" }}>{label}</span>
      <strong style={{ color: color || "#4B3425", fontSize: "0.95rem" }}>{value}</strong>
    </div>
  );
}

// ── TrueMFD Brand Styles ───────────────────────────
const card         = { background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 20px rgba(75,52,37,0.10)", border: "1px solid #DDD1C2" };
const heading      = { marginTop: 0, color: "#4B3425", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem" };
const resultRow    = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0", borderBottom: "1px solid #F4EFE8" };
const highlightBox = { background: "linear-gradient(135deg, #4B3425, #2E221B)", borderRadius: "12px", padding: "1.2rem", textAlign: "center", margin: "1rem 0" };
const highlightLabel = { color: "#B08D57", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.5px" };
const highlightValue = { color: "#F4EFE8", fontSize: "1.8rem", fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", marginTop: "0.3rem" };
const tableTitle   = { color: "#4B3425", fontFamily: "'Playfair Display', Georgia, serif", marginTop: "1.5rem", fontSize: "1rem" };
const table        = { width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" };
const th           = { background: "#4B3425", color: "#B08D57", padding: "0.6rem 0.8rem", textAlign: "left", fontFamily: "'Lato', sans-serif" };
const td           = { padding: "0.5rem 0.8rem", borderBottom: "1px solid #F4EFE8", color: "#2E221B" };
const successBox   = { background: "#e8f5e9", borderRadius: "10px", padding: "0.8rem 1rem", margin: "0.8rem 0", color: "#2e7d32", fontSize: "0.88rem" };
const warningBox   = { background: "#fff3e0", borderRadius: "10px", padding: "0.8rem 1rem", margin: "0.8rem 0", color: "#e65100", fontSize: "0.88rem" };
const winnerBox    = { background: "linear-gradient(135deg,#F4EFE8,#DDD1C2)", borderRadius: "10px", padding: "1rem", margin: "1rem 0", color: "#4B3425" };
const disclaimer   = { fontSize: "0.72rem", color: "#A59A8A", marginTop: "1rem", lineHeight: 1.5 };
