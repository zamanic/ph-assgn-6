import { notFound } from "next/navigation";
import WorkoutDetailsClient from "@/components/details/WorkoutDetailsClient";
import { IWorkout } from "@/types/workout.type";
import fallbackWorkouts from "@/data/fallbackWorkouts";

const API_URL = "https://api.api-store.workers.dev/api/fitlog/";
const ALT_API_URL = "https://api.abcz.workers.dev/api/fitlog/";

const fetchWorkoutById = async (id: string): Promise<IWorkout | null> => {
  try {
    try {
      const res = await fetch(`${API_URL}${id}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const item = !Array.isArray(data) && typeof data === "object" && (data as any)?.id
          ? (data as IWorkout)
          : data?.data || data?.workout || null;
        if (item && (item.id || item._id)) {
          return { ...item, id: String(item.id || item._id || id) } as IWorkout;
        }
      }
    } catch {
      // ignore
    }

    const res2 = await fetch(`${ALT_API_URL}${id}`, { cache: "no-store" });
    if (res2.ok) {
      const data = await res2.json();
      const item =
        !Array.isArray(data) &&
        typeof data === "object" &&
        (data as any)?.id
          ? (data as IWorkout)
          : data?.data || data?.workout || null;
      if (item && (item.id || item._id)) {
        return { ...item, id: String(item.id || item._id || id) } as IWorkout;
      }
    }
  } catch {
    // ignore
  }

  const fb = fallbackWorkouts.find(
    (w) => String(w.id) === String(id)
  );
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
