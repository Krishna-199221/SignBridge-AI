import { useEffect, useRef, useState } from "react";

function Translator() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const [detectedSign, setDetectedSign] = useState("—");
  const [translation, setTranslation] = useState(
    "Start the camera and show a sign."
  );
  const [status, setStatus] = useState("Waiting");

  // ==============================
  // Start camera
  // ==============================

  const startCamera = async () => {
    try {
      setCameraError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraStarted(true);
      setStatus("AI detection active");

      intervalRef.current = setInterval(
        sendFrameToBackend,
        500
      );
    } catch (error) {
      console.error(error);

      setCameraError("Unable to access the camera.");
      setStatus("Camera error");
    }
  };

  // ==============================
  // Stop camera
  // ==============================

  const stopCamera = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

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
    setTranslation("Camera stopped.");
    setStatus("Waiting");
  };

  // ==============================
  // Send camera frame to backend
  // ==============================

  const sendFrameToBackend = async () => {
    if (!videoRef.current) {
      return;
    }

    const video = videoRef.current;

    if (video.readyState < 2) {
      return;
    }

    if (!video.videoWidth || !video.videoHeight) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          return;
        }

        const formData = new FormData();

        formData.append(
          "image",
          blob,
          "frame.jpg"
        );

        try {
          const response = await fetch(
            "http://127.0.0.1:5000/predict",
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();

          console.log("Backend response:", data);

          if (data.stable_prediction) {
            setDetectedSign(data.stable_prediction);

            setTranslation(
              data.stable_prediction.replace("_", " ")
            );

            setStatus("Sign detected");
          } else {
            setDetectedSign("—");

            setTranslation("Analyzing sign....");

            setStatus("AnalyzingS");
          }
        } catch (error) {
          console.error(
            "Backend connection error:",
            error
          );

          setStatus("Backend connection error");
        }
      },
      "image/jpeg",
      0.8
    );
  };

  // ==============================
  // Cleanup
  // ==============================

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  // ==============================
  // UI
  // ==============================

  return (
    <section className="translator-page">
      <div className="translator-container">

        {/* Header */}

        <div className="translator-header">
          <div>
            <p className="eyebrow">
              LIVE TRANSLATOR
            </p>

            <h1>
              Sign Language Translator
            </h1>

            <p>
              Use your camera to translate
              supported hand signs into text
              in real time.
            </p>
          </div>

          <div className="translator-status">
            <span
              className={
                cameraStarted
                  ? "status-dot active"
                  : "status-dot"
              }
            />

            {status}
          </div>
        </div>

        {/* Main translator */}

        <div className="translator-grid">

          {/* Camera */}

          <div className="translator-card">

            <div className="card-header">
              <div>
                <h2>
                  Camera Input
                </h2>

                <p>
                  Position your hand clearly
                  inside the camera frame.
                </p>
              </div>
            </div>

            <div className="camera-box">

              <video
                ref={videoRef}
                className="camera-video"
                autoPlay
                muted
                playsInline
              />

              {!cameraStarted && (
                <div className="camera-placeholder">

                  <div className="camera-placeholder-icon">
                    ◎
                  </div>

                  <h3>
                    Camera is off
                  </h3>

                  <p>
                    Start the camera to begin
                    sign detection.
                  </p>

                </div>
              )}

              {cameraStarted && (
                <div className="camera-overlay">
                  <span>
                    AI detection active
                  </span>
                </div>
              )}

            </div>

            {cameraError && (
              <p className="camera-error">
                {cameraError}
              </p>
            )}

            <div className="camera-controls">

              {!cameraStarted ? (
                <button
                  className="primary-btn"
                  onClick={startCamera}
                >
                  Start Camera
                </button>
              ) : (
                <button
                  className="secondary-btn"
                  onClick={stopCamera}
                >
                  Stop Camera
                </button>
              )}

            </div>

          </div>

          {/* Translation result */}

          <div className="translator-card result-card">

            <div className="card-header">

              <div>
                <h2>
                  Translation Result
                </h2>

                <p>
                  AI recognition from your
                  camera.
                </p>
              </div>

            </div>

            <div className="result-section">

              <span className="result-label">
                DETECTED SIGN
              </span>

              <div className="detected-sign">
                {detectedSign}
              </div>

            </div>

            <div className="result-section">

              <span className="result-label">
                TRANSLATION
              </span>

              <div className="translation-output">
                {translation}
              </div>

            </div>

            <div className="result-status">

              <span
                className={
                  cameraStarted
                    ? "status-dot active"
                    : "status-dot"
                }
              />

              <span>
                {status}
              </span>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Translator;
