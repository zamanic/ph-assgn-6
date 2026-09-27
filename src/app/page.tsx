import HeroBanner from "@/components/homepage/HeroBanner";
import LibrarySection from "@/components/homepage/LibrarySection";
import { IWorkout } from "@/types/workout.type";
import fallbackWorkouts from "@/data/fallbackWorkouts";
import LibrarySkeleton from "@/components/homepage/LibrarySkeleton";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";
const ALT_API_URL = "https://api.abcz.workers.dev/api/fitlog";

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
        const items = Array.isArray(data)
          ? data
          : data?.data || data?.workouts || data?.items || null;
        if (Array.isArray(items) && items.length > 0) {
          return items as IWorkout[];
        }
      }
    } catch {
      clearTimeout(timeoutId);
    }

    const res2 = await fetch(ALT_API_URL, { cache: "no-store" });
    if (res2.ok) {
      const data = await res2.json();
      const items = Array.isArray(data)
        ? data
        : data?.data || data?.workouts || data?.items || null;
      if (Array.isArray(items) && items.length > 0) {
        return items as IWorkout[];
      }
    }

    return fallbackWorkouts;
  } catch {
    return fallbackWorkouts;
  }
};

const HomePage = async () => {
  const workoutsPromise = fetchWorkouts();
  let workouts: IWorkout[];
  let hasError = false;

  try {
    workouts = await Promise.race([
      workoutsPromise,
      new Promise<IWorkout[]>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 12000),
      ),
    ]);
  } catch {
    workouts = fallbackWorkouts;
    hasError = true;
  }

  return (
    <>
      <HeroBanner />
      {hasError || true ? (
        <LibrarySection workouts={workouts} />
      ) : (
        <LibrarySkeleton />
      )}
    </>
  );
};

export default HomePage;
