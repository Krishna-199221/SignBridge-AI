function HowItWorks() {
  return (
    <main>
      {/* =========================
          PAGE HEADER
      ========================== */}
      <section className="how-section">
        <div className="section-container">
          <div className="section-heading">
            <p className="eyebrow">HOW IT WORKS</p>

            <h1>One platform. Three communication directions.</h1>

            <p>
              SignBridge-AI is designed to support communication through
              sign language, text, and speech using simple translation flows.
            </p>
          </div>

          {/* =========================
              THREE MODES
          ========================== */}
          <div className="steps">
            <article className="step-card">
              <div className="step-icon">🤟</div>
              <div className="step-number">01</div>

              <h3>Sign → Text</h3>

              <p>
                Use your camera to provide sign-language input. The
                translator is designed to recognize the gesture and provide
                a text-based result.
              </p>
            </article>

            <article className="step-card">
              <div className="step-icon">📝</div>
              <div className="step-number">02</div>

              <h3>Text → Sign</h3>

              <p>
                Enter text into the translator and convert the communication
                into a sign-language output experience.
              </p>
            </article>

            <article className="step-card">
              <div className="step-icon">🎤</div>
              <div className="step-number">03</div>

              <h3>Speech → Sign</h3>

              <p>
                Use speech input to provide spoken communication and convert
                the recognized speech into a sign-language output experience.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================
          TRANSLATION FLOW
      ========================== */}
      <section className="about-section">
        <div className="section-container">
          <div className="about-content">
            <p className="eyebrow">THE TRANSLATION FLOW</p>

            <h2>Choose. Provide. Translate.</h2>

            <p className="about-description">
              Every communication mode follows a simple flow so users can
              focus on communicating instead of learning a complicated
              interface.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <span>🔄</span>

                <div>
                  <h3>1. Choose Direction</h3>

                  <p>
                    Select Sign → Text, Text → Sign, or Speech → Sign.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <span>📥</span>

                <div>
                  <h3>2. Provide Input</h3>

                  <p>
                    Use the camera, text field, or microphone depending on
                    the selected communication mode.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <span>💬</span>

                <div>
                  <h3>3. Receive Output</h3>

                  <p>
                    The translator presents the corresponding communication
                    result.
                  </p>
                </div>
              </div>
            </div>

            <a className="primary-button" href="/translator">
              🤟 Open Translator
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HowItWorks;