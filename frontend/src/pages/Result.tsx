import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPredictionBySlug, type PredictionResult } from "../api/client";
import "./Result.css";

export default function Result() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;

    getPredictionBySlug(slug)
      .then(setPrediction)
      .catch(() => setError("Bu xat topilmadi. Havola eskirgan bo'lishi mumkin."))
      .finally(() => setLoading(false));
  }, [slug]);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="result-page result-page--center">
        <p className="result-page__loading">Xat ochilmoqda...</p>
      </div>
    );
  }

  if (error || !prediction) {
    return (
      <div className="result-page result-page--center">
        <p className="result-page__error">{error}</p>
        <button className="result-page__back" onClick={() => navigate("/")}>
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="result-page">
      <div className="result-card">
        <span className="result-card__eyebrow">
          {prediction.name} uchun, {prediction.age + 10} yoshida
        </span>
        <p className="result-card__text">{prediction.resultText}</p>
        <div className="result-card__actions">
          <button className="result-card__btn" onClick={handleCopyLink}>
            {copied ? "Nusxalandi ✓" : "Havolani nusxalash"}
          </button>
          <button
            className="result-card__btn result-card__btn--ghost"
            onClick={() => navigate("/forma")}
          >
            O'zim uchun yozish
          </button>
        </div>
      </div>
    </div>
  );
}