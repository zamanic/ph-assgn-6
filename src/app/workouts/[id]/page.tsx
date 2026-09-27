import { notFound } from "next/navigation";
import WorkoutDetailsClient from "@/components/details/WorkoutDetailsClient";
import { IWorkout } from "@/types/workout.type";
import fallbackWorkouts from "@/data/fallbackWorkouts";

const API_URL = "https://api.api-store.workers.dev/api/fitlog/";
const ALT_API_URL = "https://api.abcz.workers.dev/api/fitlog/";

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const hasOwnStr = (obj: Record<string, unknown>, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);

const normalizeWorkout = (
  raw: unknown,
  fallbackId: string,
): IWorkout | null => {
  let obj: unknown = raw;
  if (isRecord(obj)) {
    const nested = obj.data ?? obj.workout;
    if (isRecord(nested)) obj = nested;
  }
  if (!isRecord(obj)) return null;

  const w: Record<string, unknown> = obj;
  const muscleGroups = Array.isArray(w.muscleGroups)
    ? w.muscleGroups.filter((x) => typeof x === "string")
    : Array.isArray(w.badges)
      ? w.badges.filter((x) => typeof x === "string")
      : [];

  return {
    id: String(w.id ?? w._id ?? w.workoutId ?? fallbackId),
    name: String(w.name ?? w.title ?? w.workoutName ?? "Workout"),
    description: String(w.description ?? w.subtitle ?? w.overview ?? ""),
    image: String(
      w.image ?? w.img ?? w.picture ?? w.thumbnail ?? w.imageUrl ?? "",
    ),
    muscleGroups,
    badges: Array.isArray(w.badges)
      ? w.badges.filter((x) => typeof x === "string")
      : [],
    equipment: String(w.equipment ?? w.gear ?? "Bodyweight"),
    difficulty: String(w.difficulty ?? w.level ?? "Beginner"),
    sets: hasOwnStr(w, "sets") ? Number(w.sets) || 0 : undefined,
    reps: hasOwnStr(w, "reps") ? String(w.reps) : undefined,
    duration: Number(w.duration ?? w.time ?? w.minutes ?? 0),
    caloriesBurned: hasOwnStr(w, "caloriesBurned")
      ? Number(w.caloriesBurned) || 0
      : hasOwnStr(w, "calories")
        ? Number(w.calories) || 0
        : 0,
    calories: hasOwnStr(w, "calories") ? Number(w.calories) || 0 : undefined,
    rating: Number(w.rating ?? w.score ?? w.rate ?? 0),
    instructions: Array.isArray(w.instructions)
      ? w.instructions.filter((x) => typeof x === "string")
      : Array.isArray(w.steps)
        ? w.steps.filter((x) => typeof x === "string")
        : [],
  };
};

const fetchWorkoutById = async (id: string): Promise<IWorkout | null> => {
  try {
    try {
      const res = await fetch(`${API_URL}${id}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const item = normalizeWorkout(data, id);
        if (item) return item;
      }
    } catch {
      // ignore
    }

    const res2 = await fetch(`${ALT_API_URL}${id}`, { cache: "no-store" });
    if (res2.ok) {
      const data = await res2.json();
      const item = normalizeWorkout(data, id);
      if (item) return item;
    }
  } catch {
    // ignore
  }

  const fb = fallbackWorkouts.find((w) => String(w.id) === String(id));
  return fb || null;
};

interface DetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkoutDetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const workout = await fetchWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetailsClient workout={workout} />;
}
