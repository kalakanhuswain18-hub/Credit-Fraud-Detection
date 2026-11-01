
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  Activity,
  BrainCircuit,
  LockKeyhole,
  Code2,
} from "lucide-react";

import RobotAssistant from "../components/RobotAssistant";
import "../App.css";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Detection",
    description:
      "Machine learning models analyze transaction patterns and identify suspicious activity.",
  },
  {
    icon: ShieldCheck,
    title: "Smart Risk Analysis",
    description:
      "Evaluate transaction risk with fraud probability and risk-level indicators.",
  },
  {
    icon: LockKeyhole,
    title: "Transaction Security",
    description:
      "Identify potentially fraudulent financial transactions through ML predictions.",
  },
];

export default function Home() {
  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="/" className="brand">
          <div className="brand-icon">
            <ShieldCheck size={23} />
          </div>
          <span>
            CreditGuard<span className="brand-ai"> AI</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/analyzer">Analyzer</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <a
          className="github-link"
          href="https://github.com/kalakanhuswain18-hub/Credit-Fraud-Detection"
          target="_blank"
          rel="noreferrer"
        >
          <Code2 size={17} />
          GitHub
        </a>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="home">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="status-pill">
              <span className="status-dot" />
              AI-POWERED FRAUD DETECTION
            </div>

            <h1>
              Protect Every
              <br />
              <span>Transaction.</span>
            </h1>

            <p className="hero-description">
              Intelligent financial fraud detection powered by
              machine learning. Analyze transactions, identify
              suspicious patterns and understand financial risk.
            </p>

            <div className="hero-buttons">
              <a href="/analyzer" className="primary-button">
                Analyze Transaction
                <ArrowRight size={18} />
              </a>

              <a href="#about" className="secondary-button">
                Learn More
              </a>
            </div>

            <div className="hero-note">
              <Activity size={16} />
              Machine Learning · FastAPI · React
            </div>
          </motion.div>

          {/* ORIGINAL 3D ROBOT - UNCHANGED */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="shield-glow" />

            <div className="robot-wrapper">
              <RobotAssistant />
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="features-section" id="features">
          <div className="section-heading">
            <span>OUR CAPABILITIES</span>
            <h2>Smarter Security Starts Here</h2>
            <p>
              Explore the technology behind intelligent transaction analysis.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  className="feature-card"
                  key={feature.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  whileHover={{ y: -8 }}
                >
                  <div className="feature-icon">
                    <Icon size={25} />
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-section" id="about">
          <div>
            <span>ABOUT THE PROJECT</span>

            <h2>Intelligence Behind Every Decision.</h2>

            <p>
              CreditGuard AI is an educational machine learning project
              demonstrating transaction classification through a
              Random Forest model and FastAPI backend. It currently
              uses synthetic transaction data.
            </p>
          </div>

          <div className="about-badge">
            <ShieldCheck size={42} />
            <strong>CreditGuard AI</strong>
            <small>Machine Learning Project</small>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <span>© 2026 CreditGuard AI</span>
        <span>Built with React · FastAPI · Machine Learning</span>
      </footer>
    </div>
  );
}
