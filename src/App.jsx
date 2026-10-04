import { Link } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import TranslatorPage from "./pages/TranslatorPage";

import "./App.css";

function Layout() {
  return (
    <div className="app">
      {/* =========================
          NAVIGATION
      ========================== */}
      <header className="navbar">
        <div className="nav-container">
          <Link className="brand" to="/">
            <span className="brand-icon">🤟</span>
            <span className="brand-name">SignBridge-AI</span>
          </Link>

          <nav className="nav-links">
            <Link to="/">Home</Link>

            <Link to="/how-it-works">
              How It Works
            </Link>

            <Link to="/about">
              About
            </Link>
          </nav>

          <Link className="nav-cta" to="/translator">
            Try Translator
          </Link>
        </div>
      </header>

      {/* =========================
          PAGE CONTENT
      ========================== */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/translator"
          element={<TranslatorPage />}
        />
      </Routes>

      {/* =========================
          FOOTER
      ========================== */}
      <footer>
        <div className="footer-brand">
          <span className="brand-icon">🤟</span>

          <div>
            <strong>SignBridge-AI</strong>

            <p>AI-based Sign Language Communication Platform</p>
          </div>
        </div>

        <p>© 2026 SignBridge-AI</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Layout />
  );
}

export default App;