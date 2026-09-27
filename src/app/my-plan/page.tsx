import MyPlanClient from "@/components/myplan/MyPlanClient";
import { Suspense } from "react";

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center bg-[#0a0a0a]">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-4 border-neutral-700 border-t-[#ccff00] rounded-full animate-spin mb-4" />
            <p className="text-sm text-neutral-400 font-medium">
              Loading workouts…
            </p>
          </div>
        </div>
      }
    >
      <MyPlanClient />
    </Suspense>
  );
}
