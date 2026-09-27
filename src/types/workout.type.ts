export interface IWorkout {
  id: string;
  name: string;
  description: string;
  image: string;
  muscleGroups?: string[];
  badges?: string[];
  equipment: string;
  difficulty: string;
  sets?: number;
  reps?: string;
  duration: number;
  caloriesBurned?: number;
  calories?: number;
  rating: number;
  instructions?: string[];
}

export interface IPlanWorkout extends IWorkout {
  isDone?: boolean;
  addedAt: number;
}

export const getCalories = (w: IWorkout): number =>
  Number(w.caloriesBurned ?? w.calories ?? 0);

export const getMuscleGroups = (w: IWorkout): string[] => {
  if (Array.isArray(w.muscleGroups) && w.muscleGroups.length > 0) {
    return w.muscleGroups;
  }
  if (Array.isArray(w.badges) && w.badges.length > 0) {
    return w.badges;
  }
  return [];
};

export interface IFitLogContext {
  todaysPlan: IPlanWorkout[];
  saved: IPlanWorkout[];
  addToTodaysPlan: (workout: IWorkout) => boolean;
  addToSaved: (workout: IWorkout) => boolean;
  removeFromTodaysPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
  planCount: number;
  savedCount: number;
  totalMinutes: number;
  totalCalories: number;
}
