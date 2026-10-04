function About() {
  return (
    <main>
      {/* =========================
          ABOUT HEADER
      ========================== */}
      <section className="about-section">
        <div className="section-container">
          <div className="about-content">
            <p className="eyebrow">ABOUT SIGNBRIDGE-AI</p>

            <h1>Technology that connects people.</h1>

            <p className="about-description">
              SignBridge-AI is an AI-based sign language communication
              platform designed to make communication more accessible through
              multiple input and output directions.
            </p>

            {/* =========================
                CORE FEATURES
            ========================== */}
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
                    A simple interface designed to support different ways of
                    communicating.
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
          </div>
        </div>
      </section>

      {/* =========================
          COMMUNICATION DIRECTIONS
      ========================== */}
      <section className="how-section">
        <div className="section-container">
          <div className="section-heading">
            <p className="eyebrow">COMMUNICATION</p>

            <h2>Three ways to communicate</h2>

            <p>
              SignBridge-AI brings multiple communication directions together
              in one translator.
            </p>
          </div>

          <div className="steps">
            <article className="step-card">
              <div className="step-icon">🤟</div>
              <div className="step-number">01</div>

              <h3>Sign → Text</h3>

              <p>
                Camera-based sign-language input designed to provide a
                text-based communication result.
              </p>
            </article>

            <article className="step-card">
              <div className="step-icon">📝</div>
              <div className="step-number">02</div>

              <h3>Text → Sign</h3>

              <p>
                Text input designed to provide a sign-language communication
                output experience.
              </p>
            </article>

            <article className="step-card">
              <div className="step-icon">🎤</div>
              <div className="step-number">03</div>

              <h3>Speech → Sign</h3>

              <p>
                Speech input designed to provide a sign-language communication
                output experience.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================
          PROJECT VISION
      ========================== */}
      <section className="about-section">
        <div className="section-container">
          <div className="about-content">
            <p className="eyebrow">OUR VISION</p>

            <h2>Make communication more accessible.</h2>

            <p className="about-description">
              The goal of SignBridge-AI is to bring different communication
              methods together through an easy-to-use interface while
              providing a foundation for future AI-powered sign language
              translation.
            </p>

            <a className="primary-button" href="/translator">
              🤟 Try Translator
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;