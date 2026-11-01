
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  BrainCircuit,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../App.css";

const API_URL = "https://credit-fraud-detection-fr4k.onrender.com";

// PREMIUM ANIMATED RISK METER
function RiskMeter({ value, color }) {
  const safeValue = Math.min(100, Math.max(0, value));

  const riskLabel =
    safeValue >= 60
      ? "HIGH RISK"
      : safeValue >= 30
      ? "MEDIUM RISK"
      : "LOW RISK";

  return (
    <motion.div
      className="risk-meter"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="risk-meter-heading">
        <div>
          <span className="risk-meter-label">
            AI FRAUD RISK SCORE
          </span>

          <motion.h2
            key={safeValue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {safeValue.toFixed(2)}%
          </motion.h2>
        </div>

        <span
          className="risk-meter-status"
          style={{ color }}
        >
          {riskLabel}
        </span>
      </div>

      <div className="risk-meter-track">
        <motion.div
          className="risk-meter-fill"
          initial={{ width: 0 }}
          animate={{ width: `${safeValue}%` }}
          transition={{
            duration: 1.4,
            ease: "easeOut",
          }}
          style={{
            background: `linear-gradient(90deg, ${color}, #8b5cf6)`,
            boxShadow: `0 0 18px ${color}`,
          }}
        />
      </div>

      <div className="risk-meter-scale">
        <span>0% SAFE</span>
        <span>50% MODERATE</span>
        <span>100% HIGH</span>
      </div>
    </motion.div>
  );
}

export default function Analyzer() {
  const [form, setForm] = useState({
    transaction_amount: "",
    transaction_hour: "12",
    transaction_type: "UPI",
    account_balance: "",
    channel: "Mobile_App",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // HANDLE INPUT CHANGES
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // RESET FORM
  const handleReset = () => {
    setForm({
      transaction_amount: "",
      transaction_hour: "12",
      transaction_type: "UPI",
      account_balance: "",
      channel: "Mobile_App",
    });

    setResult(null);
    setError("");
  };

  // SEND DATA TO FASTAPI
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          transaction_amount: Number(form.transaction_amount),
          transaction_hour: Number(form.transaction_hour),
          account_balance: Number(form.account_balance),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail?.[0]?.msg || "Prediction failed."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message || "Could not connect to the API."
      );
    } finally {
      setLoading(false);
    }
  };

  // PROBABILITY CONVERSION
  const fraud = result
    ? Math.min(
        100,
        Math.max(
          0,
          result.fraud_probability > 1
            ? result.fraud_probability
            : result.fraud_probability * 100
        )
      )
    : 0;

  const genuine = result
    ? Math.min(
        100,
        Math.max(
          0,
          result.genuine_probability > 1
            ? result.genuine_probability
            : result.genuine_probability * 100
        )
      )
    : 0;

  const isFraud = result?.prediction === "FRAUD";

  const scoreColor = isFraud
    ? "#ff5b68"
    : "#24d6a0";

  const riskColor =
  result?.risk_level === "HIGH"
    ? "#ff5b68"
    : result?.risk_level === "MEDIUM"
    ? "#ffbd45"
    : "#24d6a0";

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <ShieldCheck size={23} />
          </div>

          <span>
            CreditGuard
            <span className="brand-ai"> AI</span>
          </span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="/#features">Features</a>
          <a href="/#about">About</a>
        </div>

        <Link to="/" className="github-link">
          <ArrowLeft size={17} />
          Home
        </Link>
      </nav>

      {/* ANALYZER SECTION */}
      <main className="analyzer-section" id="analyzer">

        {/* PAGE HEADING */}
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span>AI TRANSACTION ANALYZER</span>

          <h2>Analyze Your Transaction</h2>

          <p>
            Enter transaction details and get a machine
            learning prediction.
          </p>
        </motion.div>

        <div className="analyzer-grid">

          {/* TRANSACTION FORM */}
          <motion.form
            className="analyzer-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >

            <div className="form-heading">
              <div className="form-icon">
                <Activity size={23} />
              </div>

              <div>
                <h3>Transaction Details</h3>
                <p>Enter your transaction information</p>
              </div>
            </div>

            <label>
              Transaction Amount (₹)

              <input
                type="number"
                name="transaction_amount"
                min="0.01"
                step="any"
                value={form.transaction_amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </label>

            <label>
              Transaction Hour (0–23)

              <input
                type="number"
                name="transaction_hour"
                min="0"
                max="23"
                value={form.transaction_hour}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Transaction Type

              <select
                name="transaction_type"
                value={form.transaction_type}
                onChange={handleChange}
              >
                {[
                  "UPI",
                  "NEFT",
                  "IMPS",
                  "RTGS",
                  "ATM",
                  "POS",
                  "Credit_Card",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Account Balance (₹)

              <input
                type="number"
                name="account_balance"
                min="0"
                step="any"
                value={form.account_balance}
                onChange={handleChange}
                placeholder="Enter balance"
                required
              />
            </label>

            <label>
              Transaction Channel

              <select
                name="channel"
                value={form.channel}
                onChange={handleChange}
              >
                {[
                  "Mobile_App",
                  "Web",
                  "ATM",
                  "POS_Terminal",
                  "Branch",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </label>

            {error && (
              <p
                role="alert"
                className="error-message"
              >
                <AlertTriangle size={18} />
                {error}
              </p>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button predict-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      className="spin"
                      size={18}
                    />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Transaction
                    <BrainCircuit size={18} />
                  </>
                )}
              </button>

              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </motion.form>

          {/* PREDICTION RESULT */}
          <motion.div
            className="result-panel"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >

            <div className="form-heading">
              <div className="form-icon">
                <BrainCircuit size={23} />
              </div>

              <div>
                <h3>Prediction Result</h3>
                <p>Machine learning analysis output</p>
              </div>
            </div>

            {!result ? (
              <div className="empty-result">
                <ShieldCheck
                  size={55}
                  color="#60a5fa"
                />

                <h3>AI Protection</h3>

                <p>
                  Submit transaction details to see
                  the prediction.
                </p>
              </div>
            ) : (
              <motion.div
                className="prediction-output"
                key={`${result.prediction}-${fraud}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >

                <span>AI ANALYSIS COMPLETE</span>

                {/* CLASSIFICATION */}
                <div
                  className={`classification ${
                    isFraud ? "fraud" : "genuine"
                  }`}
                >
                  {isFraud ? (
                    <AlertTriangle size={42} />
                  ) : (
                    <CheckCircle2 size={42} />
                  )}

                  <div>
                    <h2>
                      {isFraud
                        ? "FRAUD DETECTED"
                        : "GENUINE TRANSACTION"}
                    </h2>

                    <p>Transaction Classification</p>
                  </div>
                </div>

                {/* NEW ANIMATED RISK METER */}
                <h3 className="risk-analysis-title">
                  AI Risk Analysis
                </h3>

                <RiskMeter
                  value={fraud}
                  color={scoreColor}
                />

                {/* PROBABILITY CARDS */}
                <div className="probability-cards">

                  <div className="fraud-probability-card">
                    <span>Fraud Probability</span>
                    <h3>{fraud.toFixed(2)}%</h3>
                  </div>

                  <div className="genuine-probability-card">
                    <span>Genuine Probability</span>
                    <h3>{genuine.toFixed(2)}%</h3>
                  </div>

                </div>

                {/* RISK LEVEL */}
                <div className="risk-level">
                  <span>Risk Level</span>

                  <strong style={{ color: riskColor }}>
                    {result.risk_level}
                  </strong>
                </div>

                {/* DISCLAIMER */}
                <p className="result-disclaimer">
                  Educational prediction based on synthetic
                  transaction data. Not a real banking decision.
                </p>

              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
