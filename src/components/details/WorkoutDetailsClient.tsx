"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFitLog } from "@/context/FitLogContext";
import { IWorkout } from "@/types/workout.type";

interface WorkoutDetailsClientProps {
  workout: IWorkout;
}

const WorkoutDetailsClient = ({ workout }: WorkoutDetailsClientProps) => {
  const router = useRouter();
  const { addToTodaysPlan, addToSaved, planCount } = useFitLog();

  const fallbackImage =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80";
  const imgSrc =
    workout.image &&
    (workout.image.startsWith("http") || workout.image.startsWith("/"))
      ? workout.image
      : fallbackImage;

  const handleAddToPlan = () => {
    if (planCount >= 5) {
      toast.warn(
        "Plan is full (cap of 5 lifts). Finish some or remove one to add more.",
        { position: "top-right", autoClose: 3000 },
      );
      return;
    }
    const added = addToTodaysPlan(workout);
    if (!added) {
      toast.info("Already in your plan", {
        position: "top-right",
        autoClose: 2500,
      });
      return;
    }
    toast.success("Added to today's plan 💪", {
      position: "top-right",
      autoClose: 2500,
    });
  };

  const handleSaveForLater = () => {
    const added = addToSaved(workout);
    if (!added) {
      toast.info("Already in saved list", {
        position: "top-right",
        autoClose: 2500,
      });
      return;
    }
    toast.success("Saved for later 📌", {
      position: "top-right",
      autoClose: 2500,
    });
  };

  const specs = [
    { label: "Equipment", value: workout.equipment || "—" },
    { label: "Difficulty", value: workout.difficulty || "—" },
    { label: "Sets", value: workout.sets ? String(workout.sets) : "—" },
    { label: "Reps", value: workout.reps || "—" },
    { label: "Duration", value: `${workout.duration || 0} min` },
    { label: "Calories", value: `${workout.calories || 0} kcal` },
    { label: "Rating", value: String(workout.rating || "—") },
  ];

  return (
    <section className="bg-[#0a0a0a] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#ccff00] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Library
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl aspect-square lg:aspect-[4/5] bg-neutral-900">
            <Image
              src={imgSrc}
              alt={workout.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.src = fallbackImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 flex flex-wrap gap-2">
              {(workout.badges || []).map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-black/70 backdrop-blur-sm text-[#ccff00] border border-[#ccff00]/30"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
              >
                {workout.name}
              </h1>
              <p className="text-base text-neutral-400 leading-relaxed">
                {workout.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {(workout.badges || []).map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-neutral-300 bg-neutral-800 border border-neutral-700"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-6 gap-y-4">
                {specs.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-1">
                      {s.label}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-5">
                Instructions
              </h3>
              <ol className="space-y-4">
                {(workout.instructions || []).map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ccff00] text-black font-bold flex items-center justify-center text-sm">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-neutral-300 leading-relaxed pt-1.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToPlan}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#ccff00] text-black font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-[#b3e600] hover:shadow-xl hover:shadow-[#ccff00]/20 active:scale-[0.98]"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add to Today&apos;s Plan
              </button>
              <button
                onClick={handleSaveForLater}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-transparent text-white font-bold uppercase tracking-wider rounded-xl border-2 border-neutral-700 hover:border-[#ccff00] hover:text-[#ccff00] transition-all duration-300 active:scale-[0.98]"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                Save for Later
              </button>
            </div>

            <button
              onClick={() => router.push("/my-plan")}
              className="mt-4 text-sm text-neutral-500 hover:text-[#ccff00] transition-colors text-center sm:text-right"
            >
              View My Plan →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetailsClient;
