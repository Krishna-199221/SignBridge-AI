import { useEffect, useRef, useState } from "react";

function Translator() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const [detectedSign, setDetectedSign] = useState("—");
  const [translation, setTranslation] = useState("—");
  const [status, setStatus] = useState(
    "Waiting for sign detection..."
  );

  const startCamera = async () => {
    try {
      setCameraError("");
      setStatus("Starting camera...");

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera API is not supported.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: {
            ideal: 1280,
          },
          height: {
            ideal: 720,
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();
      }

      setCameraStarted(true);
      setDetectedSign("—");
      setTranslation("—");
      setStatus("Camera ready — waiting for sign detection...");
    } catch (error) {
      console.error("Camera error:", error);

      setCameraStarted(false);

      setCameraError(
        "Unable to access the camera. Please allow camera permission and try again."
      );

      setStatus("Camera permission required.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraStarted(false);
    setDetectedSign("—");
    setTranslation("—");
    setStatus("Camera stopped.");
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <section className="translator-section" id="translator">
      <div className="translator-container">

        {/* =========================
            TRANSLATOR HEADER
        ========================== */}
        <div className="translator-header">
          <p className="eyebrow">SIGNBRIDGE-AI TRANSLATOR</p>

          <h2>
            Sign Language
            <span> Translator</span>
          </h2>

          <p>
            Use your camera to capture sign language and translate it
            into understandable text.
          </p>
        </div>

        {/* =========================
            TRANSLATOR GRID
        ========================== */}
        <div className="translator-grid">

          {/* =========================
              CAMERA CARD
          ========================== */}
          <div className="translator-card camera-card">

            <div className="translator-card-header">
              <div>
                <span className="card-label">CAMERA</span>

                <h3>Camera Preview</h3>
              </div>

              <div
                className={`camera-status ${
                  cameraStarted ? "active" : ""
                }`}
              >
                <span></span>

                {cameraStarted ? "LIVE" : "READY"}
              </div>
            </div>

            {/* CAMERA */}
            <div className="camera-box">
              {!cameraStarted && (
                <div className="camera-placeholder">
                  <div className="camera-placeholder-icon">
                    📷
                  </div>

                  <h4>Camera Preview</h4>

                  <p>
                    Your camera feed will appear here.
                  </p>
                </div>
              )}

              <video
                ref={videoRef}
                className={`camera-video ${
                  cameraStarted ? "visible" : ""
                }`}
                autoPlay
                playsInline
                muted
              />

              {cameraStarted && (
                <div className="camera-overlay">
                  <div className="corner top-left"></div>
                  <div className="corner top-right"></div>
                  <div className="corner bottom-left"></div>
                  <div className="corner bottom-right"></div>

                  <div className="detection-line"></div>

                  <div className="camera-overlay-text">
                    🤖 AI detection active
                  </div>
                </div>
              )}
            </div>

            {/* CAMERA ERROR */}
            {cameraError && (
              <div className="camera-error">
                <span>⚠️</span>

                <p>{cameraError}</p>
              </div>
            )}

            {/* BUTTON */}
            <div className="camera-controls">
              {!cameraStarted ? (
                <button
                  className="camera-button"
                  onClick={startCamera}
                >
                  <span>📷</span>
                  Start Camera
                </button>
              ) : (
                <button
                  className="camera-button stop"
                  onClick={stopCamera}
                >
                  <span>⏹</span>
                  Stop Camera
                </button>
              )}
            </div>
          </div>

          {/* =========================
              TRANSLATION CARD
          ========================== */}
          <div className="translator-card translation-card">

            <div className="translator-card-header">
              <div>
                <span className="card-label">AI TRANSLATION</span>

                <h3>Translation</h3>
              </div>

              <span className="ai-icon">🤖</span>
            </div>

            <p className="translation-description">
              Your detected sign will appear here.
            </p>

            {/* DETECTED SIGN */}
            <div className="result-box">
              <div className="result-header">
                <span>Detected Sign</span>

                <span className="result-icon">🤟</span>
              </div>

              <strong className="result-value">
                {detectedSign}
              </strong>
            </div>

            {/* AI STATUS */}
            <div className="result-box ai-result">
              <div className="result-header">
                <span>AI Recognition</span>

                <span className="pulse-dot"></span>
              </div>

              <strong className="result-status">
                {cameraStarted
                  ? "Analyzing camera..."
                  : "Waiting for camera"}
              </strong>
            </div>

            {/* TRANSLATION */}
            <div className="result-box">
              <div className="result-header">
                <span>Translation</span>

                <span className="result-icon">💬</span>
              </div>

              <strong className="result-value">
                {translation}
              </strong>
            </div>

            {/* STATUS */}
            <div className="translation-status">
              <span
                className={`status-dot ${
                  cameraStarted ? "active" : ""
                }`}
              ></span>

              <span>{status}</span>
            </div>
          </div>
        </div>

        {/* =========================
            INFO
        ========================== */}
        <div className="translator-info">
          <div className="info-item">
            <span>🔒</span>

            <div>
              <strong>Private</strong>

              <p>
                Camera access stays in your browser.
              </p>
            </div>
          </div>

          <div className="info-item">
            <span>🤖</span>

            <div>
              <strong>AI Ready</strong>

              <p>
                Ready for gesture recognition integration.
              </p>
            </div>
          </div>

          <div className="info-item">
            <span>⚡</span>

            <div>
              <strong>Real Time</strong>

              <p>
                Designed for real-time sign detection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Translator;