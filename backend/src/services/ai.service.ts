import "dotenv/config";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

interface PredictionData {
  name: string;
  age: number;
  interests: string[];
  dream: string;
  profession?: string;
}

export async function generatePrediction(data: PredictionData): Promise<string> {
  const { name, age, interests, dream, profession } = data;

  const prompt = `
Sen "10 yildan keyin sen qanday bo'lasan?" deb ataluvchi qiziqarli, ijobiy va ilhomlantiruvchi bashorat yozuvchi AI'san.

Foydalanuvchi ma'lumotlari:
- Ism: ${name}
- Hozirgi yosh: ${age}
- Qiziqishlari: ${interests.join(", ")}
- Orzusi: ${dream}
- Hozirgi kasb/yo'nalish: ${profession || "ko'rsatilmagan"}

Vazifa: ${name} uchun, ${age + 10} yoshida (10 yildan keyin) qanday inson bo'lishi haqida qiziqarli, ijobiy, biroz hazil-mutoyiba bilan, lekin ilhomlantiruvchi bashorat yoz. Uning qiziqishlari va orzusini hikoyaga chiroyli singdir. Matn 4-6 jumladan iborat, o'zbek tilida, samimiy uslubda bo'lsin. Sarlavha yoki ortiqcha izoh yozma, faqat bashorat matnining o'zini qaytar.
`.trim();

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq API xato: ${response.status} - ${errorBody}`);
  }

  const result = await response.json();
  const text = result?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Groq javobida matn topilmadi");
  }

  return text.trim();
}