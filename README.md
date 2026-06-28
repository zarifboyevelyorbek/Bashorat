# 🔮 Oyna 10 Yil

AI yordamida foydalanuvchining profili (ism, yosh, qiziqishlar, orzular) asosida "10 yildan keyin sen qanday bo'lasan?" bashoratini generatsiya qiluvchi qiziqarli veb-sayt.

## 📋 Loyiha haqida

Foydalanuvchi o'z profilini to'ldiradi (ism, yosh, qiziqishlar, orzu, kasb), so'rov backend orqali AI'ga (Groq) yuboriladi va shaxsiylashtirilgan, ijobiy va qiziqarli "kelajak bashorati" qaytariladi. Natija bazada saqlanadi va noyob link orqali ulashish mumkin.

## 🛠️ Texnologiyalar

**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM (v7, `@prisma/adapter-pg` orqali)
- PostgreSQL
- Zod (validatsiya)
- Groq API (`fetch` orqali, SDK siz) — Llama 3.3 70B model

**Frontend:**
- React + Vite
- TypeScript
- React Router (sahifalar orasida navigatsiya)
- Axios (backend bilan aloqa)

**Infratuzilma:**
- Docker / Docker Compose (lokal PostgreSQL uchun)

## 📁 Loyiha tuzilmasi

```
oyna-10-yil/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── prediction.controller.ts   # So'rovlarni qabul qilish, javob qaytarish
│   │   ├── routes/
│   │   │   └── prediction.routes.ts       # /api/predict yo'nalishlari
│   │   ├── services/
│   │   │   └── ai.service.ts              # Groq API bilan ishlash
│   │   ├── lib/
│   │   │   └── prisma.ts                  # Prisma Client (pg adapter bilan)
│   │   ├── utils/
│   │   │   ├── validation.ts              # Zod sxemalari
│   │   │   └── slug.ts                    # Ulashish linki uchun noyob kod
│   │   └── app.ts                         # Asosiy kirish nuqtasi
│   ├── prisma/
│   │   ├── schema.prisma                  # Ma'lumotlar bazasi sxemasi
│   │   └── migrations/                    # Migratsiya tarixi
│   ├── prisma.config.ts                   # Prisma 7 konfiguratsiyasi
│   ├── docker-compose.yml                 # Lokal PostgreSQL konteyneri
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.tsx / Home.css           # Bosh sahifa
    │   │   ├── ProfileForm.tsx / .css         # Profil to'ldirish formasi
    │   │   └── Result.tsx / .css              # Bashorat natijasi
    │   ├── api/
    │   │   └── client.ts                      # Backend bilan aloqa (Axios)
    │   ├── App.tsx                            # Routing
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## 🗄️ Ma'lumotlar bazasi sxemasi

```prisma
model Prediction {
  id          String   @id @default(uuid())
  name        String
  age         Int
  interests   String[]
  dream       String
  profession  String?
  resultText  String   @db.Text
  shareSlug   String   @unique
  createdAt   DateTime @default(now())
}
```

## 🚀 O'rnatish va ishga tushirish

### Backend

#### 1. Papkaga o'tish va paketlarni o'rnatish

```bash
cd backend
npm install
```

#### 2. Muhit o'zgaruvchilarini sozlash

`.env.example` faylidan nusxa olib `.env` yarat va to'ldir:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/oyna10yil?schema=public"
GROQ_API_KEY="gsk_..."
PORT=5000
```

> Groq API key'ni [console.groq.com](https://console.groq.com) dan bepul olish mumkin (kartasiz).

#### 3. PostgreSQL'ni Docker orqali ishga tushirish

```bash
docker-compose up -d
docker ps   # oyna10yil_db konteyneri 0.0.0.0:5433->5432/tcp bilan ko'rinishi kerak
```

#### 4. Prisma sozlash

```bash
npx prisma generate
npx prisma migrate dev --name init
```

#### 5. Backend serverni ishga tushirish

```bash
npm run dev
```

Server `http://localhost:5000` da ishga tushadi.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Sayt `http://localhost:5173` da ochiladi.

## 📡 API Endpointlar

| Method | Endpoint              | Tavsif                                       |
|--------|------------------------|-----------------------------------------------|
| POST   | `/api/predict`         | Profil ma'lumotini qabul qiladi, AI bashoratini generatsiya qilib, bazaga saqlaydi |
| GET    | `/api/predict/:slug`   | Saqlangan natijani noyob link (`shareSlug`) orqali olish |

**POST `/api/predict` so'rov namunasi:**
```json
{
  "name": "Malika",
  "age": 16,
  "interests": ["rasm chizish", "musiqa"],
  "dream": "mashhur dizayner bo'lish",
  "profession": "talaba"
}
```

## 🌐 Sahifalar (Frontend)

| Yo'l               | Sahifa        | Tavsif                                      |
|---------------------|---------------|-----------------------------------------------|
| `/`                 | Home          | Intro, "Xatni boshlash" tugmasi               |
| `/forma`            | ProfileForm   | Ism, yosh, qiziqish, orzu, kasb kiritish      |
| `/natija/:slug`     | Result        | AI bashorati va ulashish tugmasi              |

## 🧩 Holat (Status)

- [x] Backend papka tuzilmasi
- [x] TypeScript sozlamalari
- [x] Docker + PostgreSQL (lokal)
- [x] Prisma schema va migratsiya
- [x] Express server va middleware'lar
- [x] AI service (Groq API integratsiyasi)
- [x] `/api/predict` endpointlari (POST va GET)
- [x] Frontend (React + Vite, 3 sahifa)
- [x] Frontend ↔ Backend to'liq integratsiya
- [ ] Test endpointlarni tozalash (`/test-db`, `/test-ai`)
- [ ] Frontend'ni Netlify'ga deploy qilish
- [ ] Backend'ni Render.com'ga deploy qilish
- [ ] Production muhit o'zgaruvchilarini sozlash

## 👤 Muallif

**Elyorbek** — Backend dasturchi
GitHub: [@zarifboyevelyorbek](https://github.com/zarifboyevelyorbek)

## 📄 Litsenziya

Shaxsiy/o'quv loyihasi.