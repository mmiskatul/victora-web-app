import { apiRequest } from './api';

export type WorkoutLibraryItem = {
  id: string;
  title: string;
  vimeoId: string;
  tag: string;
  thumbnail: string;
  dateAdded: string;
};

export type WorkoutLibraryCategory = {
  id: string;
  name: string;
  count: number;
  image: string;
};

export type WorkoutLibraryResponse = {
  featuredWorkout: WorkoutLibraryItem | null;
  workouts: WorkoutLibraryItem[];
  categories: WorkoutLibraryCategory[];
};

export async function fetchWorkoutLibrary(query = '') {
  const params = new URLSearchParams();
  if (query.trim()) {
    params.set('query', query.trim());
  }

  const suffix = params.toString() ? `?${params.toString()}` : '';
  return apiRequest<WorkoutLibraryResponse>(`/workouts/library${suffix}`);
}
