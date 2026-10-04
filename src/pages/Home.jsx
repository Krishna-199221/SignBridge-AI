function Home() {
  return (
    <>
      {/* =========================
          HERO
      ========================== */}
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
              communication across sign language, text, and speech.
            </p>

            <div className="hero-buttons">
              <a className="primary-button" href="/translator">
                🤟 Start Translating
                <span>→</span>
              </a>

              <a className="secondary-button" href="/how-it-works">
                Learn More
              </a>
            </div>

            <div className="hero-status">
              <div className="hero-status-item">
                <span className="status-icon">🤟</span>

                <div>
                  <strong>Communication</strong>
                  <span>3 Modes</span>
                </div>
              </div>

              <div className="status-arrow">→</div>

              <div className="hero-status-item">
                <div>
                  <strong>Translation</strong>
                  <span>Sign • Text • Speech</span>
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
                <strong>AI Translator</strong>
                <small>Ready for communication</small>
              </div>

              <div className="hero-card-footer">
                <div>
                  <small>COMMUNICATION MODES</small>
                  <strong>3 Available</strong>
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
          HOW IT WORKS PREVIEW
      ========================== */}
      <section className="how-section">
        <div className="section-container">
          <div className="section-heading">
            <p className="eyebrow">SIMPLE & POWERFUL</p>

            <h2>How SignBridge-AI Works</h2>

            <p>
              Choose a communication direction, provide your input, and let
              SignBridge-AI translate it.
            </p>
          </div>

          <div className="steps">
            <article className="step-card">
              <div className="step-icon">🔄</div>
              <div className="step-number">01</div>

              <h3>Choose Direction</h3>

              <p>
                Select Sign → Text, Text → Sign, or Speech → Sign based on
                how you want to communicate.
              </p>
            </article>

            <article className="step-card">
              <div className="step-icon">📥</div>
              <div className="step-number">02</div>

              <h3>Provide Input</h3>

              <p>
                Use your camera, enter text, or speak through your microphone
                to provide the communication input.
              </p>
            </article>

            <article className="step-card">
              <div className="step-icon">💬</div>
              <div className="step-number">03</div>

              <h3>Translate</h3>

              <p>
                SignBridge-AI processes the selected input and provides the
                corresponding communication output.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================
          ABOUT PREVIEW
      ========================== */}
      <section className="about-section">
        <div className="section-container">
          <div className="about-content">
            <p className="eyebrow">OUR MISSION</p>

            <h2>Technology that connects people.</h2>

            <p className="about-description">
              SignBridge-AI is being built to make communication more
              accessible by combining artificial intelligence with a simple
              user experience across sign, text, and speech.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <span>🤖</span>

                <div>
                  <h3>AI Powered</h3>

                  <p>
                    AI-assisted communication across sign, text, and speech
                    input modes.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <span>🌐</span>

                <div>
                  <h3>Accessible</h3>

                  <p>
                    A simple interface designed to support different ways
                    of communicating.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <span>⚡</span>

                <div>
                  <h3>Real Time</h3>

                  <p>
                    Camera and speech-based interaction designed for
                    responsive communication.
                  </p>
                </div>
              </div>
            </div>

            <a className="secondary-button" href="/about">
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;