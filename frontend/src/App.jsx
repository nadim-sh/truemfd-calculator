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
  { id: "Step-Up SIP",   label: "📊 Step-Up",       desc: "Increasing SIP every year" },
  { id: "Lumpsum",       label: "💰 Lumpsum",       desc: "One-time investment" },
  { id: "SIP + Lumpsum", label: "💎 SIP+Lumpsum",   desc: "Combined SIP & Lumpsum" },
  { id: "Goal SIP",      label: "🎯 Goal SIP",      desc: "Target-based planning" },
  { id: "SWP",           label: "🔄 SWP",           desc: "Systematic Withdrawal" },
  { id: "PPF",           label: "🏛️ PPF",           desc: "Public Provident Fund" },
  { id: "Compare",       label: "⚖️ Compare",       desc: "SIP vs Lumpsum" },
  { id: "XIRR",          label: "📐 XIRR",          desc: "Actual returns calculator" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("SIP");
  const [result,    setResult]    = useState(null);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const activeDesc = TABS.find(t => t.id === activeTab)?.desc;

  const handleTab = (tabId) => {
    setActiveTab(tabId);
    setResult(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              <div style={styles.logoSub}>AMFI Registered MF Distributor</div>
            </div>
          </div>
          <div style={styles.arnBadge}>ARN-2213</div>
        </div>
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>Investment Calculator</h1>
          <p style={styles.heroSub}>SIP · Lumpsum · Goal · SWP · PPF & more</p>
        </div>
      </header>

      {/* ── TAB BAR — Horizontally Scrollable on Mobile ── */}
      <div style={styles.tabBarWrap}>
        <div style={styles.tabBar}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {})
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── ACTIVE TAB DESCRIPTION ── */}
      <div style={styles.tabDesc}>{activeDesc}</div>

      {/* ── MAIN CONTENT ── */}
      <div style={styles.content}>

        {/* Form */}
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

        {/* Result */}
        {result && (
          <div style={styles.resultPanel}>
            <ResultCard data={result} type={activeTab} />
          </div>
        )}
      </div>

      {/* ── MOBILE CONTACT BAR ── */}
      <div style={styles.contactBar}>
        <a href="tel:9822204877" style={styles.contactBtn}>
          📞 Call Us
        </a>
        <a href="mailto:nadim@truemfd.com" style={styles.contactBtn}>
          ✉️ Email
        </a>
        <a href="https://www.truemfd.com" style={styles.contactBtn}
           target="_blank" rel="noreferrer">
          🌐 Website
        </a>
      </div>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            TrueMFD — True Mutual Fund Distributor
          </div>
          <div style={styles.footerDetails}>
            Nadim Sarfraz Husain | ARN-2213 | EUIN-E073190
          </div>
          <div style={styles.footerDetails}>
            📞 9822204877 / 9284731200
          </div>
          <div style={styles.footerDetails}>
            🌐 www.truemfd.com | ✉️ nadim@truemfd.com
          </div>
          <div style={styles.footerAddress}>
            Block No. 108, 1st Floor, Haakim Arcade,
            Dharampeth Coffee House Square, Nagpur - 440010
          </div>
          <div style={styles.footerDisclaimer}>
            ⚠️ Mutual Fund investments are subject to market risks.
            Returns shown are illustrative and not guaranteed.
            Read all scheme related documents carefully before investing.
          </div>
        </div>
      </footer>

    </div>
  );
}

// ── TrueMFD Brand + Mobile Responsive Styles ─────────
const styles = {
  app: {
    fontFamily: "'Lato', 'Segoe UI', sans-serif",
    minHeight:  "100vh",
    background: "#F4EFE8",
    overflowX:  "hidden",
  },

  // Header
  header: {
    background: "linear-gradient(135deg, #2E221B 0%, #4B3425 100%)",
    color:      "#F4EFE8",
    padding:    "1rem 1rem 1.5rem",
  },
  headerInner: {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "center",
    maxWidth:       "1100px",
    margin:         "0 auto",
  },
  logoWrap: {
    display:    "flex",
    alignItems: "center",
    gap:        "0.6rem",
  },
  logoCircle: {
    width:          "42px",
    height:         "42px",
    borderRadius:   "50%",
    background:     "linear-gradient(135deg, #B08D57, #8B6914)",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    fontSize:       "1.2rem",
    fontWeight:     700,
    color:          "#fff",
    fontFamily:     "'Playfair Display', Georgia, serif",
    flexShrink:     0,
  },
  logoText: {
    fontSize:   "1.3rem",
    fontWeight: 700,
    fontFamily: "'Playfair Display', Georgia, serif",
    color:      "#F4EFE8",
    lineHeight: 1.2,
  },
  logoMFD: {
    color: "#B08D57",
  },
  logoSub: {
    fontSize:  "0.6rem",
    color:     "#A59A8A",
    marginTop: "1px",
  },
  arnBadge: {
    background:   "rgba(176,141,87,0.2)",
    border:       "1px solid #B08D57",
    borderRadius: "20px",
    padding:      "0.3rem 0.8rem",
    fontSize:     "0.75rem",
    color:        "#B08D57",
    fontWeight:   700,
    flexShrink:   0,
  },
  heroText: {
    textAlign: "center",
    marginTop: "1.2rem",
  },
  heroTitle: {
    margin:     0,
    fontSize:   "clamp(1.4rem, 5vw, 2rem)",
    fontWeight: 700,
    fontFamily: "'Playfair Display', Georgia, serif",
    color:      "#F4EFE8",
  },
  heroSub: {
    margin:   "0.4rem 0 0",
    color:    "#DDD1C2",
    fontSize: "clamp(0.75rem, 3vw, 0.95rem)",
  },

  // Tab Bar — horizontal scroll on mobile
  tabBarWrap: {
    background:  "#fff",
    boxShadow:   "0 2px 12px rgba(75,52,37,0.10)",
    overflowX:   "auto",
    WebkitOverflowScrolling: "touch",
    position:    "sticky",
    top:         0,
    zIndex:      100,
  },
  tabBar: {
    display:    "flex",
    gap:        "0.4rem",
    padding:    "0.8rem 1rem",
    width:      "max-content",
    minWidth:   "100%",
  },
  tab: {
    padding:      "0.45rem 0.9rem",
    border:       "2px solid #DDD1C2",
    borderRadius: "25px",
    background:   "#fff",
    cursor:       "pointer",
    fontWeight:   600,
    color:        "#4B3425",
    fontSize:     "0.8rem",
    fontFamily:   "'Lato', sans-serif",
    whiteSpace:   "nowrap",
    transition:   "all 0.2s",
    flexShrink:   0,
  },
  tabActive: {
    background:  "linear-gradient(135deg, #4B3425, #2E221B)",
    color:       "#B08D57",
    borderColor: "#4B3425",
  },
  tabDesc: {
    textAlign:  "center",
    padding:    "0.5rem 1rem",
    fontSize:   "0.82rem",
    color:      "#A59A8A",
    background: "#F4EFE8",
    fontStyle:  "italic",
  },

  // Content — stacks vertically on mobile
  content: {
    display:   "flex",
    flexWrap:  "wrap",
    gap:       "1rem",
    padding:   "1rem",
    maxWidth:  "1100px",
    margin:    "0 auto",
  },
  formPanel:   { flex: "1 1 320px", minWidth: 0 },
  resultPanel: { flex: "1 1 320px", minWidth: 0 },

  // Mobile Contact Bar
  contactBar: {
    display:         "flex",
    justifyContent:  "center",
    gap:             "0.5rem",
    padding:         "0.8rem 1rem",
    background:      "#fff",
    borderTop:       "1px solid #DDD1C2",
    flexWrap:        "wrap",
  },
  contactBtn: {
    padding:        "0.5rem 1rem",
    background:     "linear-gradient(135deg, #B08D57, #8B6914)",
    color:          "#fff",
    borderRadius:   "25px",
    textDecoration: "none",
    fontSize:       "0.82rem",
    fontWeight:     700,
    fontFamily:     "'Lato', sans-serif",
  },

  // Footer
  footer: {
    background: "#2E221B",
    color:      "#DDD1C2",
    padding:    "1.5rem 1rem",
    marginTop:  "1rem",
  },
  footerInner: {
    maxWidth:  "1100px",
    margin:    "0 auto",
    textAlign: "center",
  },
  footerBrand: {
    color:        "#B08D57",
    fontSize:     "0.95rem",
    fontFamily:   "'Playfair Display', Georgia, serif",
    fontWeight:   700,
    marginBottom: "0.5rem",
  },
  footerDetails: {
    fontSize:     "0.78rem",
    marginBottom: "0.3rem",
    color:        "#DDD1C2",
  },
  footerAddress: {
    fontSize:     "0.72rem",
    color:        "#A59A8A",
    marginBottom: "0.8rem",
    marginTop:    "0.3rem",
  },
  footerDisclaimer: {
    fontSize:    "0.68rem",
    color:       "#A59A8A",
    borderTop:   "1px solid #4B3425",
    paddingTop:  "0.8rem",
    marginTop:   "0.8rem",
    lineHeight:  1.5,
  },
};
