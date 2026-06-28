import { Router } from "express";
import { createPrediction, getPredictionBySlug } from "../controllers/prediction.controller";

const router = Router();

router.post("/", createPrediction);
router.get("/:slug", getPredictionBySlug);

export default router;