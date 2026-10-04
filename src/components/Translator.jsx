import { useEffect, useRef, useState } from "react";

function Translator() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  // -----------------------------
  // TRANSLATOR MODE
  // -----------------------------
  const [mode, setMode] = useState("sign-to-text");

  // -----------------------------
  // CAMERA STATE
  // -----------------------------
  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState("");

  // -----------------------------
  // SIGN TO TEXT
  // -----------------------------
  const [detectedSign, setDetectedSign] = useState("—");
  const [translation, setTranslation] = useState("—");
  const [status, setStatus] = useState(
    "Waiting for sign detection..."
  );

  // -----------------------------
  // TEXT TO SIGN
  // -----------------------------
  const [textInput, setTextInput] = useState("");
  const [signOutput, setSignOutput] = useState("");

  // -----------------------------
  // SPEECH TO SIGN
  // -----------------------------
  const [speechText, setSpeechText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState("");

  // =========================================================
  // CAMERA
  // =========================================================

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

  // =========================================================
  // TEXT TO SIGN
  // =========================================================

  const handleTextToSign = () => {
    const text = textInput.trim();

    if (!text) {
      setSignOutput("");
      return;
    }

    const words = text
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const output = words
      .map((word) => `[${word}]`)
      .join(" ");

    setSignOutput(output);
  };

  const clearTextToSign = () => {
    setTextInput("");
    setSignOutput("");
  };

  // =========================================================
  // SPEECH TO SIGN
  // =========================================================

  const startSpeechRecognition = () => {
    setSpeechError("");

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        "Speech recognition is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError("");
    };

    recognition.onresult = (event) => {
      const result =
        event.results?.[0]?.[0]?.transcript || "";

      setSpeechText(result);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);

      setSpeechError(
        "Unable to recognize speech. Please try again."
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error("Speech recognition start error:", error);
      setIsListening(false);
      setSpeechError(
        "Speech recognition could not be started."
      );
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setIsListening(false);
  };

  const clearSpeech = () => {
    stopSpeechRecognition();
    setSpeechText("");
    setSpeechError("");
  };

  // =========================================================
  // CLEANUP
  // =========================================================

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // =========================================================
  // UI
  // =========================================================

  return (
    <section className="translator-section" id="translator">
      <div className="translator-container">

        {/* HEADER */}
        <div className="translator-header">
          <p className="eyebrow">
            SIGNBRIDGE-AI TRANSLATOR
          </p>

          <h2>
            Sign Language
            <span> Translator</span>
          </h2>

          <p>
            Choose a communication direction and use
            SignBridge-AI to make communication easier.
          </p>

          {/* MODE SELECTOR */}
          <div className="translator-modes">

            <button
              type="button"
              className={`translator-mode ${
                mode === "sign-to-text" ? "active" : ""
              }`}
              onClick={() => setMode("sign-to-text")}
            >
              🤟 Sign → Text
            </button>

            <button
              type="button"
              className={`translator-mode ${
                mode === "text-to-sign" ? "active" : ""
              }`}
              onClick={() => setMode("text-to-sign")}
            >
              📝 Text → Sign
            </button>

            <button
              type="button"
              className={`translator-mode ${
                mode === "speech-to-sign" ? "active" : ""
              }`}
              onClick={() => setMode("speech-to-sign")}
            >
              🎤 Speech → Sign
            </button>

          </div>
        </div>

        {/* =================================================
            SIGN → TEXT
        ================================================= */}

        {mode === "sign-to-text" && (
          <div className="translator-grid">

            {/* CAMERA CARD */}
            <div className="translator-card camera-card">

              <div className="translator-card-header">
                <div>
                  <span className="card-label">
                    CAMERA
                  </span>

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

              {/* CAMERA CONTROLS */}
              <div className="camera-controls">

                {!cameraStarted ? (
                  <button
                    type="button"
                    className="camera-button"
                    onClick={startCamera}
                  >
                    <span>📷</span>
                    Start Camera
                  </button>
                ) : (
                  <button
                    type="button"
                    className="camera-button stop"
                    onClick={stopCamera}
                  >
                    <span>⏹</span>
                    Stop Camera
                  </button>
                )}

              </div>

            </div>

            {/* TRANSLATION CARD */}
            <div className="translator-card translation-card">

              <div className="translator-card-header">

                <div>
                  <span className="card-label">
                    AI TRANSLATION
                  </span>

                  <h3>Translation</h3>
                </div>

                <span className="ai-icon">
                  🤖
                </span>

              </div>

              <p className="translation-description">
                Your detected sign will appear here.
              </p>

              {/* DETECTED SIGN */}
              <div className="result-box">

                <div className="result-header">
                  <span>Detected Sign</span>
                  <span className="result-icon">
                    🤟
                  </span>
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

                  <span className="result-icon">
                    💬
                  </span>
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
        )}

        {/* =================================================
            TEXT → SIGN
        ================================================= */}

        {mode === "text-to-sign" && (
          <div className="direction-card">

            <div className="direction-card-header">

              <div>
                <span className="card-label">
                  TEXT INPUT
                </span>

                <h3>
                  Text → Sign Language
                </h3>
              </div>

              <span className="direction-icon">
                📝
              </span>

            </div>

            <p className="direction-description">
              Enter text and convert it into a
              sign-language representation.
            </p>

            {/* TEXT INPUT */}
            <label
              className="input-label"
              htmlFor="signbridge-text-input"
            >
              Enter your message
            </label>

            <textarea
              id="signbridge-text-input"
              className="translation-input"
              value={textInput}
              onChange={(event) =>
                setTextInput(event.target.value)
              }
              placeholder="Example: Hello, how are you?"
              rows="5"
            />

            {/* BUTTONS */}
            <div className="direction-actions">

              <button
                type="button"
                className="primary-button"
                onClick={handleTextToSign}
              >
                🤟 Convert to Sign
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={clearTextToSign}
              >
                Clear
              </button>

            </div>

            {/* OUTPUT */}
            <div className="sign-output-box">

              <div className="result-header">
                <span>
                  Sign Language Output
                </span>

                <span className="result-icon">
                  🤟
                </span>
              </div>

              {signOutput ? (
                <div className="sign-output">
                  {signOutput}
                </div>
              ) : (
                <div className="sign-output empty">
                  Your sign-language output will
                  appear here.
                </div>
              )}

            </div>

            {/* INFORMATION */}
            <div className="demo-note">
              ℹ️ This is currently a frontend
              demonstration. The actual sign-language
              generation model will be connected later.
            </div>

          </div>
        )}

        {/* =================================================
            SPEECH → SIGN
        ================================================= */}

        {mode === "speech-to-sign" && (
          <div className="direction-card">

            <div className="direction-card-header">

              <div>
                <span className="card-label">
                  VOICE INPUT
                </span>

                <h3>
                  Speech → Sign Language
                </h3>
              </div>

              <span className="direction-icon">
                🎤
              </span>

            </div>

            <p className="direction-description">
              Speak into your microphone and convert
              your speech into a sign-language
              representation.
            </p>

            {/* SPEECH BUTTON */}
            <div className="speech-controls">

              {!isListening ? (
                <button
                  type="button"
                  className="camera-button"
                  onClick={startSpeechRecognition}
                >
                  <span>🎤</span>
                  Start Listening
                </button>
              ) : (
                <button
                  type="button"
                  className="camera-button stop listening"
                  onClick={stopSpeechRecognition}
                >
                  <span>⏹</span>
                  Stop Listening
                </button>
              )}

              <button
                type="button"
                className="secondary-button"
                onClick={clearSpeech}
              >
                Clear
              </button>

            </div>

            {/* SPEECH ERROR */}
            {speechError && (
              <div className="camera-error">

                <span>⚠️</span>

                <p>{speechError}</p>

              </div>
            )}

            {/* SPEECH RESULT */}
            <div className="speech-result-box">

              <div className="result-header">
                <span>
                  Recognized Speech
                </span>

                <span className="result-icon">
                  🎤
                </span>
              </div>

              {speechText ? (
                <div className="speech-text">
                  {speechText}
                </div>
              ) : (
                <div className="speech-text empty">
                  Your recognized speech will
                  appear here.
                </div>
              )}

            </div>

            {/* SIGN OUTPUT */}
            <div className="sign-output-box">

              <div className="result-header">
                <span>
                  Sign Language Output
                </span>

                <span className="result-icon">
                  🤟
                </span>
              </div>

              {speechText ? (
                <div className="sign-output">
                  {speechText
                    .toLowerCase()
                    .split(/\s+/)
                    .filter(Boolean)
                    .map((word) => `[${word}]`)
                    .join(" ")}
                </div>
              ) : (
                <div className="sign-output empty">
                  Sign-language output will appear
                  after speech recognition.
                </div>
              )}

            </div>

            {/* INFORMATION */}
            <div className="demo-note">
              ℹ️ Speech recognition uses your browser's
              available speech-recognition capability.
              The actual sign-generation model will be
              connected later.
            </div>

          </div>
        )}

        {/* =================================================
            INFO
        ================================================= */}

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
                Ready for gesture recognition
                integration.
              </p>
            </div>

          </div>

          <div className="info-item">

            <span>⚡</span>

            <div>
              <strong>Real Time</strong>

              <p>
                Designed for real-time
                sign detection.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Translator;