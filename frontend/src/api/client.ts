import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PredictionPayload {
  name: string;
  age: number;
  interests: string[];
  dream: string;
  profession?: string;
}

export interface PredictionResult {
  id: string;
  name: string;
  age: number;
  interests: string[];
  dream: string;
  profession?: string;
  resultText: string;
  shareSlug: string;
  createdAt: string;
}

export async function createPrediction(
  payload: PredictionPayload
): Promise<PredictionResult> {
  const response = await apiClient.post<{ data: PredictionResult }>(
    "/predict",
    payload
  );
  return response.data.data;
}

export async function getPredictionBySlug(
  slug: string
): Promise<PredictionResult> {
  const response = await apiClient.get<{ data: PredictionResult }>(
    `/predict/${slug}`
  );
  return response.data.data;
}