
import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/translate";
const ASSET_URL = "http://127.0.0.1:8000";

function TextToSign() {
  const [text, setText] = useState("");
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function translateText(event) {
    event.preventDefault();

    if (!text.trim()) {
      setError("Please enter a word or sentence.");
      setSigns([]);
      return;
    }

    setLoading(true);
    setError("");
    setSigns([]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setSigns(data.signs || []);
    } catch (err) {
      setError(
        "Could not connect to the translation service. Make sure FastAPI is running."
      );
      console.error("Text-to-Sign error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="text-sign-page">
      <div className="text-sign-container">
        <p className="eyebrow">TEXT TO SIGN</p>
        <h1>Convert Text into Sign Language</h1>
        <p>
          Enter text to find matching signs in the available vocabulary.
        </p>

        <form onSubmit={translateText}>
          <label htmlFor="sign-text">Enter text</label>

          <textarea
            id="sign-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Try: Hello, good morning"
            rows={4}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Translating..." : "Translate to Sign"}
          </button>
        </form>

        {error && <p role="alert">{error}</p>}

        {signs.length > 0 && (
          <div className="sign-results">
            <h2>Translation results</h2>

            {signs.map((sign, index) => (
              <article className="sign-result" key={`${sign.text}-${index}`}>
                <h3>{sign.text}</h3>

                {sign.sign_found && sign.sign_asset ? (
                  <img
                    src={`${ASSET_URL}${sign.sign_asset}`}
                    alt={`Indian Sign Language animation for ${sign.text}`}
                    className="sign-animation"
                  />
                ) : (
                  <p>{sign.message}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TextToSign;
