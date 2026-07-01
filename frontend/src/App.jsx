import React, { useState } from "react";
import SIPForm        from "./components/SIPForm";
import StepUpForm     from "./components/StepUpForm";
import LumpsumForm    from "./components/LumpsumForm";
import CompareForm    from "./components/CompareForm";
import XIRRForm       from "./components/XIRRForm";
import GoalSIPForm    from "./components/GoalSIPForm";
import SWPForm        from "./components/SWPForm";
import PPFForm        from "./components/PPFForm";
import SIPLumpsumForm from "./components/SIPLumpsumForm";
import ResultCard     from "./components/ResultCard";

const TABS = [
  { id: "SIP",           label: "📈 SIP",          desc: "Systematic Investment Plan" },
  { id: "Step-Up SIP",   label: "📊 Step-Up SIP",  desc: "Increasing SIP every year" },
  { id: "Lumpsum",       label: "💰 Lumpsum",       desc: "One-time investment" },
  { id: "SIP + Lumpsum", label: "💎 SIP+Lumpsum",  desc: "Combined SIP & Lumpsum investment" },
  { id: "Goal SIP",      label: "🎯 Goal SIP",      desc: "Target-based planning" },
  { id: "SWP",           label: "🔄 SWP",           desc: "Systematic Withdrawal Plan" },
  { id: "PPF",           label: "🏛️ PPF",           desc: "Public Provident Fund" },
  { id: "Compare",       label: "⚖️ Compare",       desc: "SIP vs Lumpsum" },
  { id: "XIRR",          label: "📐 XIRR",          desc: "Actual returns calculator" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("SIP");
  const [result,    setResult]    = useState(null);

  const activeDesc = TABS.find(t => t.id === activeTab)?.desc;

  return (
    <div style={styles.app}>

      {/* ── HEADER ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoWrap}>
            <div style={styles.logoCircle}>T</div>
            <div>
              <div style={styles.logoText}>
                True<span style={styles.logoMFD}>MFD</span>
              </div>
              <div style={styles.logoSub}>AMFI Registered Mutual Fund Distributor</div>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.arnBadge}>ARN-2213 | EUIN-E073190</div>
            <div style={styles.headerTagline}>
              Guiding families with clarity and care
            </div>
          </div>
        </div>
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>Investment Calculator Suite</h1>
          <p style={styles.heroSub}>
            Plan your SIP, Lumpsum, Goal, SWP, PPF and more
          </p>
        </div>
      </header>

      {/* ── TAB BAR ── */}
      <div style={styles.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setResult(null); }}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {})
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB DESCRIPTION ── */}
      <div style={styles.tabDesc}>{activeDesc}</div>

      {/* ── MAIN CONTENT ── */}
      <div style={styles.content}>
        <div style={styles.formPanel}>
          {activeTab === "SIP"           && <SIPForm        onResult={setResult} />}
          {activeTab === "Step-Up SIP"   && <StepUpForm     onResult={setResult} />}
          {activeTab === "Lumpsum"       && <LumpsumForm    onResult={setResult} />}
          {activeTab === "SIP + Lumpsum" && <SIPLumpsumForm onResult={setResult} />}
          {activeTab === "Goal SIP"      && <GoalSIPForm    onResult={setResult} />}
          {activeTab === "SWP"           && <SWPForm        onResult={setResult} />}
          {activeTab === "PPF"           && <PPFForm        onResult={setResult} />}
          {activeTab === "Compare"       && <CompareForm    onResult={setResult} />}
          {activeTab === "XIRR"          && <XIRRForm       onResult={setResult} />}
        </div>
        {result && (
          <div style={styles.resultPanel}>
            <ResultCard data={result} type={activeTab} />
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            TrueMFD — True Mutual Fund Distributor
          </div>
          <div style={styles.footerDetails}>
            Nadim Sarfraz Husain | ARN-2213 | EUIN-E073190
            | 9822204877 / 9284731200 | www.truemfd.com
          </div>
          <div style={styles.footerAddress}>
            Block No. 108, 1st Floor, Haakim Arcade,
            Dharampeth Coffee House Square, Nagpur - 440010
          </div>
          <div style={styles.footerDisclaimer}>
            Mutual Fund investments are subject to market risks.
            Returns shown are illustrative and not guaranteed.
            Read all scheme related documents carefully before investing.
          </div>
        </div>
      </footer>

    </div>
  );
}

const styles = {
  app: {
    fontFamily: "'Lato', 'Segoe UI', sans-serif",
    minHeight:  "100vh",
    background: "#F4EFE8",
  },
  header: {
    background: "linear-gradient(135deg, #2E221B 0%, #4B3425 100%)",
    color:      "#F4EFE8",
    padding:    "1.5rem 2rem 2rem",
  },
  headerInner: {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "center",
    flexWrap:       "wrap",
    gap:            "1rem",
    maxWidth:       "1100px",
    margin:         "0 auto",
  },
  logoWrap: {
    display:    "flex",
    alignItems: "center",
    gap:        "0.8rem",
  },
  logoCircle: {
    width:          "48px",
    height:         "48px",
    borderRadius:   "50%",
    background:     "linear-gradient(135deg, #B08D57, #8B6914)",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    fontSize:       "1.4rem",
    fontWeight:     700,
    color:          "#fff",
    fontFamily:     "'Playfair Display', Georgia, serif",
    border:         "2px solid #B08D57",
  },
  logoText: {
    fontSize:   "1.6rem",
    fontWeight: 700,
    fontFamily: "'Playfair Display', Georgia, serif",
    color:      "#F4EFE8",
    lineHeight: 1.2,
  },
  logoMFD: {
    color: "#B08D57",
  },
  logoSub: {
    fontSize:      "0.65rem",
    color:         "#A59A8A",
    letterSpacing: "0.5px",
  },
  headerRight: {
    textAlign: "right",
  },
  arnBadge: {
    background:   "rgba(176,141,87,0.2)",
    border:       "1px solid #B08D57",
    borderRadius: "20px",
    padding:      "0.3rem 0.9rem",
    fontSize:     "0.8rem",
    color:        "#B08D57",
    fontWeight:   700,
    display:      "inline-block",
  },
  headerTagline: {
    fontSize:  "0.78rem",
    color:     "#DDD1C2",
    marginTop: "0.4rem",
    fontStyle: "italic",
  },
  heroText: {
    textAlign: "center",
    maxWidth:  "1100px",
    margin:    "1.5rem auto 0",
  },
  heroTitle: {
    margin:     0,
    fontSize:   "2rem",
    fontWeight: 700,
    fontFamily: "'Playfair Display', Georgia, serif",
    color:      "#F4EFE8",
  },
  heroSub: {
    margin:   "0.5rem 0 0",
    color:    "#DDD1C2",
    fontSize: "0.95rem",
  },
  tabBar: {
    display:        "flex",
    justifyContent: "center",
    flexWrap:       "wrap",
    gap:            "0.5rem",
    padding:        "1.2rem 1rem",
    background:     "#fff",
    boxShadow:      "0 2px 12px rgba(75,52,37,0.10)",
    position:       "sticky",
    top:            0,
    zIndex:         100,
  },
  tab: {
    padding:      "0.5rem 1.1rem",
    border:       "2px solid #DDD1C2",
    borderRadius: "25px",
    background:   "#fff",
    cursor:       "pointer",
    fontWeight:   600,
    color:        "#4B3425",
    fontSize:     "0.85rem",
    fontFamily:   "'Lato', sans-serif",
    transition:   "all 0.2s",
  },
  tabActive: {
    background:  "linear-gradient(135deg, #4B3425, #2E221B)",
    color:       "#B08D57",
    borderColor: "#4B3425",
  },
  tabDesc: {
    textAlign:  "center",
    padding:    "0.6rem",
    fontSize:   "0.85rem",
    color:      "#A59A8A",
    background: "#F4EFE8",
    fontStyle:  "italic",
  },
  content: {
    display:  "flex",
    flexWrap: "wrap",
    gap:      "1.5rem",
    padding:  "1.5rem",
    maxWidth: "1100px",
    margin:   "0 auto",
  },
  formPanel:   { flex: "1 1 380px" },
  resultPanel: { flex: "1 1 380px" },
  footer: {
    background: "#2E221B",
    color:      "#DDD1C2",
    marginTop:  "2rem",
    padding:    "2rem",
  },
  footerInner: {
    maxWidth:  "1100px",
    margin:    "0 auto",
    textAlign: "center",
  },
  footerBrand: {
    color:        "#B08D57",
    fontSize:     "1rem",
    fontFamily:   "'Playfair Display', Georgia, serif",
    marginBottom: "0.5rem",
    fontWeight:   700,
  },
  footerDetails: {
    fontSize:     "0.82rem",
    marginBottom: "0.4rem",
    color:        "#DDD1C2",
  },
  footerAddress: {
    fontSize:     "0.78rem",
    color:        "#A59A8A",
    marginBottom: "0.8rem",
  },
  footerDisclaimer: {
    fontSize:   "0.72rem",
    color:      "#A59A8A",
    borderTop:  "1px solid #4B3425",
    paddingTop: "0.8rem",
    marginTop:  "0.8rem",
  },
};
