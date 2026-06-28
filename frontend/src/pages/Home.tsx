import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__stars" aria-hidden="true" />
      <div className="home__content">
        <span className="home__eyebrow">Kelajakdan kelgan xat</span>
        <h1 className="home__title">
          10 yildan keyin
          <br />
          <span className="home__title-accent">kim bo'lasan?</span>
        </h1>
        <p className="home__subtitle">
          Ismingni, qiziqishlaringni va orzularingni ayt — biz senga
          kelajakdan bir parcha xat olib kelamiz.
        </p>
        <button className="home__cta" onClick={() => navigate("/forma")}>
          Xatni boshlash →
        </button>
      </div>
    </div>
  );
}