"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useFitLog } from "@/context/FitLogContext";
import {
  IPlanWorkout,
  getCalories,
  getMuscleGroups,
} from "@/types/workout.type";

type SortKey = "duration" | "calories" | "rating";
type TabKey = "plan" | "saved";

const PlanCard = ({
  workout,
  showDone,
  onDone,
  onRemove,
}: {
  workout: IPlanWorkout;
  showDone: boolean;
  onDone: () => void;
  onRemove: () => void;
}) => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80";
  const imgSrc =
    workout.image &&
    (workout.image.startsWith("http") || workout.image.startsWith("/"))
      ? workout.image
      : fallbackImage;

  const muscleGroups = getMuscleGroups(workout);
  const calories = getCalories(workout);

  return (
    <div
      className={`group bg-neutral-900 border rounded-xl overflow-hidden transition-all duration-300 hover:border-neutral-600 ${
        workout.isDone ? "border-green-800/60 opacity-80" : "border-neutral-800"
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-48 md:w-56 flex-shrink-0 aspect-[16/10] sm:aspect-auto sm:h-auto bg-neutral-800">
          <Image
            src={imgSrc}
            alt={workout.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 224px"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
            {muscleGroups.slice(0, 2).map((mg) => (
              <span
                key={mg}
                className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-black/70 backdrop-blur-sm text-white border border-neutral-500"
              >
                {mg}
              </span>
            ))}
          </div>
          {workout.isDone && (
            <div className="absolute inset-0 bg-green-950/40 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-wider">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Done
              </span>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 flex-1 flex flex-col min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h4
                className={`text-base sm:text-lg font-black uppercase tracking-tight leading-tight truncate ${
                  workout.isDone ? "text-green-400 line-through" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
              >
                {workout.name}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 truncate">
                {workout.equipment || workout.description}
              </p>
            </div>
            <button
              onClick={onRemove}
              aria-label="Remove"
              title="Remove from list"
              className="flex-shrink-0 w-8 h-8 rounded-full text-neutral-500 hover:text-red-400 hover:bg-red-500/10 border border-neutral-700 hover:border-red-500/40 flex items-center justify-center transition-colors"
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
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-neutral-400 mb-4 sm:mb-5 flex-wrap">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
              <span>{calories} kcal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-white font-semibold">{workout.rating}</span>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-2 sm:gap-3">
            <Link
              href={`/workouts/${workout.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View Details
            </Link>
            {showDone && (
              <button
                onClick={onDone}
                disabled={workout.isDone}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  workout.isDone
                    ? "text-green-400 bg-green-500/10 border border-green-500/30 cursor-default"
                    : "text-[#0a0a0a] bg-[#ccff00] hover:bg-[#b3e600] border border-[#ccff00] active:scale-[0.98]"
                }`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {workout.isDone ? "Completed" : "Mark as Done"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyPlanClient = () => {
  const {
    todaysPlan,
    saved,
    removeFromTodaysPlan,
    removeFromSaved,
    markAsDone,
    planCount,
    totalMinutes,
    totalCalories,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<TabKey>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const currentList = activeTab === "plan" ? todaysPlan : saved;

  const sortedList = useMemo(() => {
    const copy = [...currentList];
    copy.sort((a, b) => {
      if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
      if (sortBy === "calories") return getCalories(b) - getCalories(a);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
    return copy;
  }, [currentList, sortBy]);

  const handleRemove = (id: string) => {
    if (activeTab === "plan") {
      removeFromTodaysPlan(id);
      toast.success("Plan removed 🗑️", {
        position: "top-right",
        autoClose: 2200,
      });
    } else {
      removeFromSaved(id);
      toast.success("Removed from saved 🗑️", {
        position: "top-right",
        autoClose: 2200,
      });
    }
  };

  const handleMarkDone = (id: string) => {
    const workout = todaysPlan.find((w) => w.id === id);
    if (workout?.isDone) return;
    markAsDone(id);
    toast.success("Marked as completed! Great work 💪", {
      position: "top-right",
      autoClose: 2500,
    });
  };

  const statCards = [
    {
      label: "Exercises",
      value: planCount,
      suffix: "",
      accent: "#ccff00",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      label: "Minutes",
      value: totalMinutes,
      suffix: " min",
      accent: "#60a5fa",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Calories",
      value: totalCalories,
      suffix: " kcal",
      accent: "#f87171",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-10 lg:py-16 min-h-[calc(100vh-10rem)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 animate-fade-in">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3"
            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
          >
            My Plan
          </h1>
          <p className="text-base text-neutral-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          {statCards.map((s) => (
            <div
              key={s.label}
              className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-5 overflow-hidden group hover:border-neutral-700 transition-colors"
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ background: s.accent }}
              />
              <div className="relative flex items-start justify-between mb-4">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: s.accent }}
                >
                  {s.label}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.accent}15`, color: s.accent }}
                >
                  {s.icon}
                </div>
              </div>
              <div className="relative">
                <span
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                  style={{ color: s.accent }}
                >
                  {s.value}
                </span>
                <span className="text-base font-bold text-neutral-400 ml-1">
                  {s.suffix}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <div
            role="tablist"
            className="tabs tabs-bordered inline-flex p-1 bg-neutral-900 border border-neutral-800 rounded-xl w-full sm:w-auto"
          >
            <button
              role="tab"
              aria-selected={activeTab === "plan"}
              onClick={() => setActiveTab("plan")}
              className={`tab px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex-1 sm:flex-none ${
                activeTab === "plan"
                  ? "tab-active bg-[#ccff00] text-black !border-transparent"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800 !border-transparent"
              }`}
            >
              Today&apos;s Plan
              <span
                className={`ml-2 inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full text-[10px] font-black ${
                  activeTab === "plan"
                    ? "bg-black/20 text-black"
                    : "bg-neutral-800 text-neutral-300"
                }`}
              >
                {todaysPlan.length}
              </span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              className={`tab px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex-1 sm:flex-none ${
                activeTab === "saved"
                  ? "tab-active bg-white text-black !border-transparent"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800 !border-transparent"
              }`}
            >
              Saved
              <span
                className={`ml-2 inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full text-[10px] font-black ${
                  activeTab === "saved"
                    ? "bg-black/20 text-black"
                    : "bg-neutral-800 text-neutral-300"
                }`}
              >
                {saved.length}
              </span>
            </button>
          </div>

          <div className="relative w-full sm:w-auto">
            <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 block mb-1.5 sm:hidden">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="select select-sm w-full sm:w-56 bg-neutral-900 border border-neutral-700 rounded-xl text-sm font-semibold text-white appearance-none cursor-pointer hover:border-neutral-600 focus:border-[#ccff00] focus:outline-none pr-10"
            >
              <option value="duration">Sort By: Duration</option>
              <option value="calories">Sort By: Calories</option>
              <option value="rating">Sort By: Rating</option>
            </select>
            <svg
              className="w-4 h-4 text-neutral-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {sortedList.length === 0 ? (
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="bg-neutral-900 border border-dashed border-neutral-700 rounded-2xl p-10 sm:p-14 text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center mb-6 text-neutral-500">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3
                className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-3"
                style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
              >
                Nothing here yet
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto mb-8 leading-relaxed">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ccff00] text-black font-bold uppercase tracking-wider rounded-xl transition-all hover:bg-[#b3e600] hover:shadow-xl hover:shadow-[#ccff00]/20 active:scale-[0.98]"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Go to Workouts
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="space-y-4 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            {sortedList.map((workout, idx) => (
              <div key={workout.id} style={{ animationDelay: `${idx * 50}ms` }}>
                <PlanCard
                  workout={workout}
                  showDone={activeTab === "plan"}
                  onDone={() => handleMarkDone(workout.id)}
                  onRemove={() => handleRemove(workout.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPlanClient;
