import { apiRequest } from './api';

export type StrengthPlanExercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  weight: string;
  type: string;
};

export type StrengthPlanDay = {
  day: string;
  title: string;
  est_time: string;
  volume: string;
  intensity: string;
  exercises: StrengthPlanExercise[];
};

export type StrengthPlanResponse = {
  summary: string;
  days: StrengthPlanDay[];
};

export type VideoPlanItem = {
  id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
  tag: string;
  vimeo_id: string;
};

export type VideoPlanDay = {
  day: string;
  duration_label: string;
  workouts_count: number;
  workouts: VideoPlanItem[];
};

export type VideoPlanResponse = {
  summary: string;
  days: VideoPlanDay[];
};

let latestStrengthPlan: StrengthPlanResponse | null = null;
let latestVideoPlan: VideoPlanResponse | null = null;

export async function createStrengthWorkoutPlan(payload: Record<string, unknown>) {
  const plan = await apiRequest<StrengthPlanResponse>('/ai/workout-plan/strength', {
    method: 'POST',
    body: payload,
  });
  latestStrengthPlan = plan;
  return plan;
}

export async function createVideoWorkoutPlan(payload: Record<string, unknown>) {
  const plan = await apiRequest<VideoPlanResponse>('/ai/workout-plan/video', {
    method: 'POST',
    body: payload,
  });
  latestVideoPlan = plan;
  return plan;
}

export function getLatestStrengthWorkoutPlan() {
  return latestStrengthPlan;
}

export function getLatestVideoWorkoutPlan() {
  return latestVideoPlan;
}
