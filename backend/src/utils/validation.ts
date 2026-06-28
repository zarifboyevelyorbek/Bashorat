import { z } from "zod";

export const predictionSchema =z.object({
    name:z
    .string()
    .min(2, "Ism kamida 2ta harf bolishi kerak")
    .max(50, "Ism juda uzun"),
    age:z
    .number()
    .int("Yosh butun son bolishi kerak")
    .min(5, "Yosh kamida 5 yosh bolishi kerak")
    .max(100, "Yosh 100 dan otmasligi kerak"),
  interests:z  
    .array(z.string())
    .min(1, "Kamida 1 ta qiziqish kiritish kerak")
    .max(10, "Ko'pi bilan 10 ta qiziqish kiritish mumkin"),
  dream: z
    .string()
    .min(3, "Orzu kamida 3 harf bo'lishi kerak")
    .max(300, "Orzu juda uzun"),
  profession: z
    .string()
    .max(100, "Kasb nomi juda uzun")
    .optional(),
});

export type PredictionInput = z.infer<typeof predictionSchema>;
