import HeroBanner from "@/components/homepage/HeroBanner";
import LibrarySection from "@/components/homepage/LibrarySection";
import { IWorkout } from "@/types/workout.type";
import fallbackWorkouts from "@/data/fallbackWorkouts";
import LibrarySkeleton from "@/components/homepage/LibrarySkeleton";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";
const ALT_API_URL = "https://api.abcz.workers.dev/api/fitlog";

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const hasOwnStr = (obj: Record<string, unknown>, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);

const normalizeWorkout = (raw: unknown, idx = 0): IWorkout | null => {
  if (!isRecord(raw)) return null;
  const w: Record<string, unknown> = raw;
  const muscleGroups = Array.isArray(w.muscleGroups)
    ? w.muscleGroups.filter((x) => typeof x === "string")
    : Array.isArray(w.badges)
      ? w.badges.filter((x) => typeof x === "string")
      : [];
  return {
    id: String(w.id ?? w._id ?? w.workoutId ?? String(idx)),
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

const extractList = (val: unknown): IWorkout[] => {
  let items: unknown[] | null = null;
  if (Array.isArray(val)) items = val;
  else if (isRecord(val)) {
    const cand = val.data ?? val.workouts ?? val.items ?? null;
    if (Array.isArray(cand)) items = cand;
  }
  if (!items) return [];
  return items
    .map((item, i) => normalizeWorkout(item, i))
    .filter((x): x is IWorkout => Boolean(x));
};

const fetchWorkouts = async (): Promise<IWorkout[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(API_URL, {
        cache: "no-store",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        const normalized = extractList(data);
        if (normalized.length > 0) return normalized;
      }
    } catch {
      clearTimeout(timeoutId);
    }

    const res2 = await fetch(ALT_API_URL, { cache: "no-store" });
    if (res2.ok) {
      const data = await res2.json();
      const normalized = extractList(data);
      if (normalized.length > 0) return normalized;
    }

    return fallbackWorkouts;
  } catch {
    return fallbackWorkouts;
  }
};

const HomePage = async () => {
  const workoutsPromise = fetchWorkouts();
  let workouts: IWorkout[];

  try {
    workouts = await Promise.race([
      workoutsPromise,
      new Promise<IWorkout[]>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 12000),
      ),
    ]);
  } catch {
    workouts = fallbackWorkouts;
  }

  const showSkeleton = false;

  return (
    <>
      <HeroBanner />
      {showSkeleton ? (
        <LibrarySkeleton />
      ) : (
        <LibrarySection workouts={workouts} />
      )}
    </>
  );
};

export default HomePage;
