import { useRef } from "react";
import "./App.css";
import Translator from "./components/Translator";

function App() {
  const translatorRef = useRef(null);

  const scrollToTranslator = () => {
    translatorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      {/* =========================
          NAVIGATION
      ========================== */}
      <header className="navbar">
        <div className="nav-container">
          <button className="brand" onClick={scrollToHome}>
            <span className="brand-icon">🤟</span>
            <span className="brand-name">SignBridge-AI</span>
          </button>

          <nav className="nav-links">
            <button onClick={scrollToHome}>Home</button>

            <button onClick={scrollToHowItWorks}>
              How It Works
            </button>

            <button onClick={scrollToAbout}>
              About
            </button>
          </nav>

          <button className="nav-cta" onClick={scrollToTranslator}>
            Try Translator
          </button>
        </div>
      </header>

      {/* =========================
          HERO
      ========================== */}
      <main>
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <p className="eyebrow">
                AI-POWERED SIGN LANGUAGE COMMUNICATION
              </p>

              <h1>
                Breaking
                <span> Communication </span>
                Barriers
              </h1>

              <p className="hero-description">
                SignBridge-AI uses artificial intelligence to help bridge
                communication between sign language and spoken language.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-button"
                  onClick={scrollToTranslator}
                >
                  🤟 Start Translating
                  <span>→</span>
                </button>

                <button
                  className="secondary-button"
                  onClick={scrollToHowItWorks}
                >
                  Learn More
                </button>
              </div>

              <div className="hero-status">
                <div className="hero-status-item">
                  <span className="status-icon">🤟</span>

                  <div>
                    <strong>AI Detection</strong>
                    <span>Ready</span>
                  </div>
                </div>

                <div className="status-arrow">→</div>

                <div className="hero-status-item">
                  <div>
                    <strong>Translation</strong>
                    <span>Sign → Text</span>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================
                HERO VISUAL
            ========================== */}
            <div className="hero-visual">
              <div className="hero-glow"></div>

              <div className="hero-card">
                <div className="hero-card-header">
                  <div className="hero-card-brand">
                    <span className="live-dot"></span>
                    <span>SignBridge-AI</span>
                  </div>

                  <span className="hero-card-menu">•••</span>
                </div>

                <div className="hero-camera">
                  <div className="hero-camera-icon">📷</div>

                  <strong>AI Camera</strong>

                  <small>Ready for detection</small>
                </div>

                <div className="hero-card-footer">
                  <div>
                    <small>DETECTED SIGN</small>
                    <strong>Waiting...</strong>
                  </div>

                  <div>
                    <small>TRANSLATION</small>
                    <strong>Ready</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            HOW IT WORKS
        ========================== */}
        <section id="how-it-works" className="how-section">
          <div className="section-container">
            <div className="section-heading">
              <p className="eyebrow">SIMPLE & POWERFUL</p>

              <h2>How SignBridge-AI Works</h2>

              <p>
                Three simple steps to make sign language communication easier.
              </p>
            </div>

            <div className="steps">
              <article className="step-card">
                <div className="step-icon">📷</div>

                <div className="step-number">01</div>

                <h3>Capture</h3>

                <p>
                  Use your camera to capture sign language gestures in real
                  time.
                </p>
              </article>

              <article className="step-card">
                <div className="step-icon">🤖</div>

                <div className="step-number">02</div>

                <h3>AI Detection</h3>

                <p>
                  Our AI analyzes hand gestures and identifies the sign being
                  performed.
                </p>
              </article>

              <article className="step-card">
                <div className="step-icon">💬</div>

                <div className="step-number">03</div>

                <h3>Translate</h3>

                <p>
                  The detected sign is converted into understandable text or
                  speech.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* =========================
            ABOUT
        ========================== */}
        <section id="about" className="about-section">
          <div className="section-container">
            <div className="about-content">
              <p className="eyebrow">OUR MISSION</p>

              <h2>Technology that connects people.</h2>

              <p className="about-description">
                SignBridge-AI is being built to make communication more
                accessible by combining computer vision, artificial
                intelligence, and a simple user experience.
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <span>🤖</span>

                  <div>
                    <h3>AI Powered</h3>

                    <p>
                      Intelligent gesture recognition designed for
                      sign-language communication.
                    </p>
                  </div>
                </div>

                <div className="about-feature">
                  <span>🌐</span>

                  <div>
                    <h3>Accessible</h3>

                    <p>
                      A simple interface designed to make communication easier
                      for everyone.
                    </p>
                  </div>
                </div>

                <div className="about-feature">
                  <span>⚡</span>

                  <div>
                    <h3>Real Time</h3>

                    <p>
                      Camera-based interaction designed for fast
                      sign-to-text translation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            TRANSLATOR
        ========================== */}
        <div ref={translatorRef}>
          <Translator />
        </div>
      </main>

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

export default App;