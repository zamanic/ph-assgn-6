export interface IWorkout {
  id: string;
  name: string;
  description: string;
  image: string;
  badges: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
}

export interface IPlanWorkout extends IWorkout {
  isDone?: boolean;
  addedAt: number;
}

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
