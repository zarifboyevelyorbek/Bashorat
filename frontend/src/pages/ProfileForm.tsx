import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createPrediction } from "../api/client";
import "./ProfileForm.css";

const INTEREST_OPTIONS = [
  "Dasturlash",
  "Rasm chizish",
  "Musiqa",
  "Sport",
  "O'qish",
  "Sayohat",
  "Oshpazlik",
  "Fotosurat",
  "Yozish",
  "O'yinlar",
];

export default function ProfileForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [dream, setDream] = useState("");
  const [profession, setProfession] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function toggleInterest(interest: string) {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !age || interests.length === 0 || !dream.trim()) {
      setError("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    setLoading(true);
    try {
      const result = await createPrediction({
        name: name.trim(),
        age: Number(age),
        interests,
        dream: dream.trim(),
        profession: profession.trim() || undefined,
      });
      navigate(`/natija/${result.shareSlug}`);
    } catch (err) {
      setError("Xat yetib bormadi. Birozdan keyin qayta urinib ko'r.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-form-page">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="profile-form__title">O'zingni tanit</h2>

        <label className="profile-form__label">
          Isming
          <input
            className="profile-form__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masalan, Malika"
            maxLength={50}
          />
        </label>

        <label className="profile-form__label">
          Yoshing
          <input
            className="profile-form__input"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Masalan, 17"
            min={5}
            max={100}
          />
        </label>

        <div className="profile-form__label">
          Qiziqishlaring (kamida 1ta tanla)
          <div className="profile-form__chips">
            {INTEREST_OPTIONS.map((interest) => (
              <button
                key={interest}
                type="button"
                className={`profile-form__chip ${
                  interests.includes(interest) ? "profile-form__chip--active" : ""
                }`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <label className="profile-form__label">
          Eng katta orzuying nima?
          <textarea
            className="profile-form__textarea"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="Masalan, o'z kompaniyamni ochish"
            maxLength={300}
            rows={3}
          />
        </label>

        <label className="profile-form__label">
          Hozirgi kasb/yo'nalish (ixtiyoriy)
          <input
            className="profile-form__input"
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Masalan, talaba"
            maxLength={100}
          />
        </label>

        {error && <p className="profile-form__error">{error}</p>}

        <button className="profile-form__submit" type="submit" disabled={loading}>
          {loading ? "Xat yozilmoqda..." : "Bashoratni ko'rish →"}
        </button>
      </form>
    </div>
  );
}