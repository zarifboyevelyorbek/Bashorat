import express from "express";
import cors from "cors";
import "dotenv/config";
import { generatePrediction } from "./services/ai.service";
import predictionRoutes from "./routes/prediction.routes";


const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use("/api/predict", predictionRoutes);

app.get("/test-ai", async (req, res) => {
  try {
    const result = await generatePrediction({
      name: "Elyorbek",
      age: 17,
      interests: ["dasturlash", "futbol"],
      dream: "o'z IT kompaniyasini ochish",
      profession: "Backend dasturchi (o'rganmoqda)",
    });
    res.json({ message: "AI ishlayapti ✅", prediction: result });
  } catch (error) {
    res.status(500).json({ message: "AI xato ❌", error: String(error) });
  }
});


app.get("/", (req, res) => {
    res.json({ message: "Oyna 10 Yil API ishlamoqda" });
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishga tushdi..`);
});