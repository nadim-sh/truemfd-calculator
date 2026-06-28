import React, { useState } from "react";
import SIPForm     from "./components/SIPForm";
import StepUpForm  from "./components/StepUpForm";
import LumpsumForm from "./components/LumpsumForm";
import CompareForm from "./components/CompareForm";
import XIRRForm    from "./components/XIRRForm";
import GoalSIPForm from "./components/GoalSIPForm";
import SWPForm     from "./components/SWPForm";
import PPFForm     from "./components/PPFForm";
import ResultCard  from "./components/ResultCard";

const TABS = ["SIP","Step-Up SIP","Lumpsum","Goal SIP","SWP","PPF","Compare","XIRR"];

export default function App() {
  const [activeTab, setActiveTab] = useState("SIP");
  const [result,    setResult]    = useState(null);

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>📈 SIP Calculator</h1>
        <p style={styles.subtitle}>Complete Investment Planning Tool</p>
      </header>
      <div style={styles.tabBar}>
        {TABS.map((tab) => (
          <button key={tab}
            onClick={() => { setActiveTab(tab); setResult(null); }}
            style={{ ...styles.tab, ...(activeTab === tab ? styles.tabActive : {}) }}>
            {tab}
          </button>
        ))}
      </div>
      <div style={styles.content}>
        <div style={styles.formPanel}>
          {activeTab === "SIP"         && <SIPForm     onResult={setResult} />}
          {activeTab === "Step-Up SIP" && <StepUpForm  onResult={setResult} />}
          {activeTab === "Lumpsum"     && <LumpsumForm onResult={setResult} />}
          {activeTab === "Compare"     && <CompareForm onResult={setResult} />}
          {activeTab === "XIRR"        && <XIRRForm    onResult={setResult} />}
          {activeTab === "Goal SIP"    && <GoalSIPForm onResult={setResult} />}
          {activeTab === "SWP"         && <SWPForm     onResult={setResult} />}
          {activeTab === "PPF"         && <PPFForm     onResult={setResult} />}
        </div>
        {result && (
          <div style={styles.resultPanel}>
            <ResultCard data={result} type={activeTab} />
          </div>
        )}
      </div>
      <footer style={styles.footer}>
        ⚠️ Mutual fund investments are subject to market risks. Returns are illustrative only.
      </footer>
    </div>
  );
}

const styles = {
  app:         { fontFamily: "Segoe UI, sans-serif", minHeight: "100vh", background: "#f0f4f8" },
  header:      { background: "linear-gradient(135deg,#1a1a2e,#16213e)", color: "#fff", padding: "2rem", textAlign: "center" },
  title:       { margin: 0, fontSize: "2rem", fontWeight: 700 },
  subtitle:    { margin: "0.5rem 0 0", opacity: 0.7 },
  tabBar:      { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem", padding: "1rem", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  tab:         { padding: "0.5rem 1.2rem", border: "2px solid #e0e0e0", borderRadius: "25px", background: "#fff", cursor: "pointer", fontWeight: 600, color: "#555" },
  tabActive:   { background: "#1a1a2e", color: "#fff", borderColor: "#1a1a2e" },
  content:     { display: "flex", flexWrap: "wrap", gap: "1.5rem", padding: "1.5rem", maxWidth: "1100px", margin: "0 auto" },
  formPanel:   { flex: "1 1 380px" },
  resultPanel: { flex: "1 1 380px" },
  footer:      { textAlign: "center", padding: "1rem", fontSize: "0.8rem", color: "#888", background: "#fff", marginTop: "2rem" },
};
