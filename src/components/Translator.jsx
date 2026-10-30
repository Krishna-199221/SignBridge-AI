
import { useCallback, useEffect, useRef, useState } from "react";

const API_URL = "/api/predict";
const FRAME_INTERVAL = 500;
const REQUEST_TIMEOUT = 8000;

function Translator() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const inFlightRef = useRef(false);
  const sessionRef = useRef(0);

  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [detectedSign, setDetectedSign] = useState("—");
  const [translation, setTranslation] = useState(
    "Start the camera and show one of the six supported signs."
  );
  const [status, setStatus] = useState("Waiting");

  const stopCamera = useCallback(() => {
    sessionRef.current += 1;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const stream = streamRef.current;
    streamRef.current = null;

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    const video = videoRef.current;

    if (video) {
      video.pause();
      video.srcObject = null;
    }

    inFlightRef.current = false;
    setCameraStarted(false);
    setCameraStarting(false);
    setVideoReady(false);
    setDetectedSign("—");
    setTranslation("Camera stopped.");
    setCameraError("");
    setStatus("Waiting");
  }, []);

  const sendFrameToBackend = useCallback(async () => {
    const video = videoRef.current;
    const session = sessionRef.current;

    if (
      inFlightRef.current ||
      !streamRef.current ||
      !video ||
      video.readyState < 2 ||
      !video.videoWidth ||
      !video.videoHeight
    ) {
      return;
    }

    inFlightRef.current = true;
    let timeoutId;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Unable to prepare the camera image.");
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (imageBlob) => {
            if (imageBlob) {
              resolve(imageBlob);
            } else {
              reject(new Error("Could not capture a camera frame."));
            }
          },
          "image/jpeg",
          0.8
        );
      });

      if (session !== sessionRef.current) return;

      const formData = new FormData();
      formData.append("image", blob, "frame.jpg");

      const controller = new AbortController();

      timeoutId = setTimeout(
        () => controller.abort(),
        REQUEST_TIMEOUT
      );

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 503 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        throw new Error(
          errorData.detail || `AI backend returned HTTP ${response.status}.`
        );
      }

      const data = await response.json();

      if (session !== sessionRef.current) return;

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.stable_prediction) {
        const sign = String(data.stable_prediction);

        setDetectedSign(sign);
        setTranslation(sign.replace(/_/g, " "));
        setStatus("Sign detected");
        setCameraError("");
      } else if (data.prediction == null) {
        setDetectedSign("—");
        setTranslation("No hand detected. Show a supported sign.");
        setStatus("Waiting for hand");
      } else {
        setStatus("Analyzing sign…");
      }
    } catch (error) {
      if (session !== sessionRef.current) return;

      console.error("Sign recognition error:", error);

      if (error.name === "AbortError") {
        setStatus("AI request timed out");
        setCameraError("The AI backend took too long to respond.");
      } else {
        setStatus("Recognition error");
        setCameraError(
          error.message ||
            "Cannot connect to the FastAPI sign-recognition service."
        );
      }
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      inFlightRef.current = false;
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (streamRef.current || cameraStarting) return;

    setCameraStarting(true);
    setCameraError("");
    setVideoReady(false);
    setStatus("Starting camera…");

    let stream;

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera access is unavailable. Open the app on localhost or HTTPS."
        );
      }

      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      const video = videoRef.current;

      if (!video) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;

      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.srcObject = stream;

      // Wait until the browser knows the video's dimensions.
      await new Promise((resolve, reject) => {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          resolve();
          return;
        }

        const cleanup = () => {
          video.removeEventListener("loadedmetadata", onLoaded);
          video.removeEventListener("error", onError);
        };

        const onLoaded = () => {
          cleanup();
          resolve();
        };

        const onError = () => {
          cleanup();
          reject(
            new Error("The browser could not load the camera video.")
          );
        };

        video.addEventListener("loadedmetadata", onLoaded);
        video.addEventListener("error", onError);

        // Check again in case metadata arrived just before the listeners.
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          cleanup();
          resolve();
        }
      });

      await video.play();

      if (streamRef.current !== stream) return;

      console.info("SignBridge camera stream:", stream);
      console.info("SignBridge video dimensions:", {
        width: video.videoWidth,
        height: video.videoHeight,
        readyState: video.readyState,
        paused: video.paused,
      });

      sessionRef.current += 1;

      setVideoReady(true);
      setCameraStarted(true);
      setCameraStarting(false);
      setDetectedSign("—");
      setTranslation("Show one supported sign clearly to the camera.");
      setStatus("AI detection active");

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(
        sendFrameToBackend,
        FRAME_INTERVAL
      );
    } catch (error) {
      console.error("Camera startup error:", error);

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (streamRef.current === stream) {
        streamRef.current = null;
      }

      const video = videoRef.current;

      if (video) {
        video.pause();
        video.srcObject = null;
      }

      setCameraStarted(false);
      setCameraStarting(false);
      setVideoReady(false);
      setCameraError(
        error.message ||
          "Unable to access the camera. Check browser permissions."
      );
      setStatus("Camera error");
    }
  }, [cameraStarting, sendFrameToBackend]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return undefined;

    const handlePlaying = () => setVideoReady(true);
    const handleWaiting = () => setVideoReady(false);

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("waiting", handleWaiting);

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("waiting", handleWaiting);

      sessionRef.current += 1;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      video.pause();
      video.srcObject = null;
    };
  }, []);

  return (
    <section className="translator-page">
      <div className="translator-container">
        <div className="translator-header">
          <div>
            <p className="eyebrow">LIVE TRANSLATOR</p>
            <h1>Sign Language Translator</h1>
            <p>
              Use your camera to translate supported hand signs into text
              in real time.
            </p>
          </div>

          <div className="translator-status">
            <span
              className={
                cameraStarted ? "status-dot active" : "status-dot"
              }
            />
            {status}
          </div>
        </div>

        <div className="translator-grid">
          <div className="translator-card">
            <div className="card-header">
              <div>
                <h2>Camera Input</h2>
                <p>Position your hand clearly inside the camera frame.</p>
              </div>
            </div>

            <div className="camera-box">
              <video
                ref={videoRef}
                className={`camera-video${videoReady ? " visible" : ""}`}
                autoPlay
                muted
                playsInline
                onLoadedMetadata={(event) => {
                  const video = event.currentTarget;

                  console.info("Camera metadata loaded:", {
                    width: video.videoWidth,
                    height: video.videoHeight,
                  });
                }}
              />

              {!cameraStarted && (
                <div className="camera-placeholder">
                  <div className="camera-placeholder-icon">◎</div>
                  <h3>
                    {cameraStarting ? "Starting camera…" : "Camera is off"}
                  </h3>
                  <p>
                    {cameraStarting
                      ? "Please allow camera access if prompted."
                      : "Start the camera to begin sign detection."}
                  </p>
                </div>
              )}

              {cameraStarted && (
                <div className="camera-overlay">
                  <span>AI detection active</span>
                </div>
              )}
            </div>

            {cameraError && (
              <p className="camera-error" role="alert">
                {cameraError}
              </p>
            )}

            <div className="camera-controls">
              {!cameraStarted ? (
                <button
                  className="primary-btn"
                  onClick={startCamera}
                  disabled={cameraStarting}
                >
                  {cameraStarting ? "Starting…" : "Start Camera"}
                </button>
              ) : (
                <button className="secondary-btn" onClick={stopCamera}>
                  Stop Camera
                </button>
              )}
            </div>
          </div>

          <div className="translator-card result-card">
            <div className="card-header">
              <div>
                <h2>Translation Result</h2>
                <p>Recognition from your camera using the trained model.</p>
              </div>
            </div>

            <div className="result-section">
              <span className="result-label">DETECTED SIGN</span>
              <div className="detected-sign">{detectedSign}</div>
            </div>

            <div className="result-section">
              <span className="result-label">TRANSLATION</span>
              <div className="translation-output">{translation}</div>
            </div>

            <div className="result-status">
              <span
                className={
                  cameraStarted ? "status-dot active" : "status-dot"
                }
              />
              <span>{status}</span>
            </div>

            <p className="supported-signs">
              Supported signs: HELLO, YES, NO, THANK YOU, PLEASE and HELP.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Translator;
