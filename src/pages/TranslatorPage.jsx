
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Translator from "../components/Translator";
import TextToSign from "../components/TextToSign";

function TranslatorPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getMode = () =>
    searchParams.get("mode") === "text-to-sign"
      ? "text-to-sign"
      : "sign-to-text";

  const [activeTab, setActiveTab] = useState(getMode);

  useEffect(() => {
    setActiveTab(getMode());
  }, [searchParams]);

  function changeMode(mode) {
    setActiveTab(mode);
    setSearchParams({ mode });
  }

  return (
    <main className="translator-page">
      <div className="translator-tabs">
        <button
          type="button"
          className={activeTab === "sign-to-text" ? "active" : ""}
          onClick={() => changeMode("sign-to-text")}
        >
          Sign to Text
        </button>

        <button
          type="button"
          className={activeTab === "text-to-sign" ? "active" : ""}
          onClick={() => changeMode("text-to-sign")}
        >
          Text to Sign
        </button>
      </div>

      {activeTab === "sign-to-text" ? (
        <Translator />
      ) : (
        <TextToSign />
      )}
    </main>
  );
}

export default TranslatorPage;
