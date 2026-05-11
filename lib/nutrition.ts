import { apiRequest } from './api';

export type NutritionMealEntry = {
  name: string;
  desc: string;
  kcal: number;
  p: number;
  c: number;
  f: number;
  ingredients: string[];
  instructions: string[];
};

export type NutritionDayPlan = {
  day: string;
  breakfast: NutritionMealEntry;
  lunch: NutritionMealEntry;
  dinner: NutritionMealEntry;
};

export type NutritionShoppingItem = {
  name: string;
  qty: string;
};

export type NutritionShoppingSection = {
  category: string;
  items: NutritionShoppingItem[];
};

export type NutritionPlanApiResponse = {
  plan_id?: string | null;
  summary: string;
  goal_label: string;
  days: NutritionDayPlan[];
  shopping_list: NutritionShoppingSection[];
  meal_completions?: Record<string, Record<string, boolean>>;
  profile?: Record<string, unknown> | null;
};

export type NutritionPlanJobResponse = {
  job_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | string;
  plan_id?: string | null;
  plan?: NutritionPlanApiResponse | null;
  error?: string | null;
  created_at: string;
  updated_at: string;
};

export async function startNutritionPlanJob(payload: Record<string, unknown>) {
  return apiRequest<NutritionPlanJobResponse>('/ai/nutrition/plan/jobs', {
    method: 'POST',
    body: payload,
  });
}

export async function getNutritionPlanJob(jobId: string) {
  return apiRequest<NutritionPlanJobResponse>(`/ai/nutrition/plan/jobs/${encodeURIComponent(jobId)}`);
}

export async function updateNutritionMealCompletion(payload: {
  day: string;
  meal_key: string;
  completed: boolean;
}) {
  return apiRequest<NutritionPlanApiResponse>('/ai/nutrition/plan/latest/completions', {
    method: 'PATCH',
    body: payload,
  });
}
