import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { predictionSchema } from "../utils/validation";
import { generatePrediction } from "../services/ai.service";
import { generateSlug } from "../utils/slug";

export async function createPrediction(req: Request, res: Response) {
  try {
    const parsed = predictionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Ma'lumot noto'g'ri",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, age, interests, dream, profession } = parsed.data;

    const resultText = await generatePrediction({
      name,
      age,
      interests,
      dream,
      profession,
    });

    const shareSlug = generateSlug();

    const prediction = await prisma.prediction.create({
      data: {
        name,
        age,
        interests,
        dream,
        profession,
        resultText,
        shareSlug,
      },
    });

    return res.status(201).json({
      message: "Bashorat tayyor 🎉",
      data: prediction,
    });
  } catch (error) {
    console.error("createPrediction xato:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: String(error),
    });
  }
}

export async function getPredictionBySlug(req: Request, res: Response) {
  try {
   const slug = req.params.slug as string;

    const prediction = await prisma.prediction.findUnique({
      where: { shareSlug: slug },
    });

    if (!prediction) {
      return res.status(404).json({ message: "Natija topilmadi" });
    }

    return res.json({ data: prediction });
  } catch (error) {
    console.error("getPredictionBySlug xato:", error);
    return res.status(500).json({
      message: "Server xatosi",
      error: String(error),
    });
  }
}