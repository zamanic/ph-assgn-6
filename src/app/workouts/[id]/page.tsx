import { notFound } from "next/navigation";
import WorkoutDetailsClient from "@/components/details/WorkoutDetailsClient";
import { IWorkout } from "@/types/workout.type";
import fallbackWorkouts from "@/data/fallbackWorkouts";

const API_URL = "https://api.api-store.workers.dev/api/fitlog/";
const ALT_API_URL = "https://api.abcz.workers.dev/api/fitlog/";

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const extractWorkout = (val: unknown, fallbackId: string): IWorkout | null => {
  let obj: unknown = val;
  if (isRecord(obj)) {
    const nested = obj.data ?? obj.workout;
    if (isRecord(nested)) obj = nested;
  }
  if (!isRecord(obj)) return null;
  const hasIdKey = typeof obj.id !== "undefined";
  const hasUnderscoreId = typeof obj._id !== "undefined";
  if (!hasIdKey && !hasUnderscoreId) return null;
  const rawId = hasIdKey ? obj.id : hasUnderscoreId ? obj._id : fallbackId;
  const base = { ...(obj as unknown as IWorkout) };
  return {
    ...base,
    id: String(rawId ?? fallbackId),
  };
};

const fetchWorkoutById = async (id: string): Promise<IWorkout | null> => {
  try {
    try {
      const res = await fetch(`${API_URL}${id}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const item = extractWorkout(data, id);
        if (item) return item;
      }
    } catch {
      // ignore
    }

    const res2 = await fetch(`${ALT_API_URL}${id}`, { cache: "no-store" });
    if (res2.ok) {
      const data = await res2.json();
      const item = extractWorkout(data, id);
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
