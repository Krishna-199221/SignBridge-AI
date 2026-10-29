
import { Link } from "react-router-dom";

const features = [
  {
    icon: "🛡️",
    title: "Accessible",
    description:
      "Designed to help bridge communication gaps for the deaf and hard-of-hearing community.",
    color: "orange",
  },
  {
    icon: "🧠",
    title: "AI Powered",
    description:
      "Uses machine learning for sign recognition and translation.",
    color: "pink",
  },
  {
    icon: "♡",
    title: "Inclusive",
    description:
      "Built to support more connected and understanding communication.",
    color: "orange",
  },
  {
    icon: "🌱",
    title: "Open Source Inspired",
    description:
      "Built with accessible tools and open-source technologies.",
    color: "green",
  },
];

function Home() {
  return (
    <main className="home-dashboard">
      {/* WIDE HERO BANNER */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <p className="dashboard-eyebrow">
            TECHNOLOGY THAT CONNECTS PEOPLE
          </p>

          <h1>
            Indian <span className="word-orange">Sign</span>{" "}
            <span className="word-green">Language</span>
            <br />
            Converter
          </h1>

          <p className="dashboard-hero-description">
            Convert between Sign, Text and Speech using Indian Sign
            Language (ISL).
          </p>

          <p className="dashboard-hero-subtitle">
            Bridging communication gaps, one sign at a time.
          </p>
        </div>

        <div
          className="dashboard-hero-art"
          role="img"
          aria-label="Illustration representing sign language communication"
        >
          <div className="hero-art-shape shape-one" />
          <div className="hero-art-shape shape-two" />
          <div className="hero-art-shape shape-three" />
          <div className="hero-art-emoji">🤟</div>

          <div className="hero-art-note">
            Sign
            <br />
            Learn
            <br />
            <span>Include ♡</span>
          </div>
        </div>
      </section>

      {/* THREE TRANSLATION MODES */}
      <section
        className="dashboard-modes"
        aria-label="Translation modes"
      >
        {/* SIGN TO TEXT */}
        <article className="dashboard-mode-card sign-mode">
          <div className="dashboard-mode-heading">
            <div className="dashboard-mode-icon">🤟</div>

            <div>
              <h2>Sign to Text</h2>
              <p>
                Use your camera to convert supported ISL signs into text.
              </p>
            </div>
          </div>

          <div className="mode-preview sign-preview">
            <div className="preview-camera-icon">◎</div>
            <strong>Live Sign Recognition</strong>
            <span>
              Start your camera to recognize supported signs.
            </span>
          </div>

          <div className="mode-action-row">
            <Link
              className="dashboard-action action-orange"
              to="/translator"
            >
              <span>▧</span> Open Camera Translator
            </Link>
          </div>

          <div className="mode-output sign-output-preview">
            <div className="mode-output-heading">
              <span>▤</span> Detected Text
            </div>
            <div className="mode-output-value">
              Your recognized sign will appear here.
            </div>
          </div>
        </article>

        {/* TEXT TO SIGN */}
        <article className="dashboard-mode-card text-mode">
          <div className="dashboard-mode-heading">
            <div className="dashboard-mode-icon">T →</div>

            <div>
              <h2>Text to Sign</h2>
              <p>
                Enter a word or sentence to find its available sign
                animations.
              </p>
            </div>
          </div>

          <div className="mode-preview text-preview">
            <div className="preview-text-icon">T →</div>
            <strong>Text-based Translation</strong>
            <span>
              Enter text and view the available sign video results.
            </span>
          </div>

          <div className="mode-action-row">
            <Link
              className="dashboard-action action-green"
              to="/translator?mode=text-to-sign"
            >
              <span>▶</span> Open Text to Sign
            </Link>
          </div>

          <div className="mode-output text-output-preview">
            <div className="mode-output-heading">
              <span>◷</span> Sign Video Output
            </div>
            <div className="mode-output-value">
              Your available sign animations will appear in the translator.
            </div>
          </div>
        </article>

        {/* SPEECH TO SIGN */}
        <article className="dashboard-mode-card speech-mode">
          <div className="dashboard-mode-heading">
            <div className="dashboard-mode-icon">🎙</div>

            <div>
              <h2>Speech to Sign</h2>
              <p>
                Explore speech-based communication through the planned
                speech-to-sign feature.
              </p>
            </div>
          </div>

          <div className="mode-preview speech-preview">
            <div className="speech-mic-icon">🎙</div>
            <strong>Speech Input</strong>

            <div className="speech-wave" aria-hidden="true">
              {Array.from({ length: 29 }, (_, index) => (
                <span
                  key={index}
                  style={{
                    height: `${10 + ((index * 17) % 25)}px`,
                  }}
                />
              ))}
            </div>

            <span>Speech-to-Sign is under development.</span>
          </div>

          <div className="mode-action-row">
            <button
              className="dashboard-action action-blue"
              type="button"
              onClick={() =>
                document
                  .getElementById("speech-prototype-note")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
              }
            >
              <span>ⓘ</span> View Feature Status
            </button>
          </div>

          <div
            className="mode-output speech-output-preview"
            id="speech-prototype-note"
          >
            <div className="mode-output-heading">
              <span>ⓘ</span> Prototype Status
            </div>
            <div className="mode-output-value">
              This mode is planned; live speech-to-sign translation is
              not connected yet.
            </div>
          </div>
        </article>
      </section>

      {/* FEATURE STRIP */}
      <section className="dashboard-features" aria-label="Project values">
        {features.map((feature) => (
          <article
            className={`dashboard-feature feature-${feature.color}`}
            key={feature.title}
          >
            <div className="dashboard-feature-icon">
              {feature.icon}
            </div>

            <div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </section>

      {/* FOOTER DECORATION */}
      <div className="dashboard-closing">
        <span className="closing-line" />
        <p>♥ &nbsp; Because every voice matters &nbsp; ♥</p>
        <span className="closing-line" />
      </div>
    </main>
  );
}

export default Home;
