"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IFitLogContext, IPlanWorkout, IWorkout } from "@/types/workout.type";

const FitLogContext = createContext<IFitLogContext>({
  todaysPlan: [],
  saved: [],
  addToTodaysPlan: () => false,
  addToSaved: () => false,
  removeFromTodaysPlan: () => {},
  removeFromSaved: () => {},
  markAsDone: () => {},
  planCount: 0,
  savedCount: 0,
  totalMinutes: 0,
  totalCalories: 0,
});

export const useFitLog = () => useContext(FitLogContext);

const STORAGE_KEY_PLAN = "fitlog_todays_plan";
const STORAGE_KEY_SAVED = "fitlog_saved";

const loadFromStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = <T,>(key: string, data: T) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
};

const FitLogProvider = ({ children }: { children: ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<IPlanWorkout[]>([]);
  const [saved, setSaved] = useState<IPlanWorkout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setTodaysPlan(loadFromStorage<IPlanWorkout[]>(STORAGE_KEY_PLAN, []));
      setSaved(loadFromStorage<IPlanWorkout[]>(STORAGE_KEY_SAVED, []));
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveToStorage(STORAGE_KEY_PLAN, todaysPlan);
    }
  }, [todaysPlan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveToStorage(STORAGE_KEY_SAVED, saved);
    }
  }, [saved, isLoaded]);

  const addToTodaysPlan = (workout: IWorkout): boolean => {
    if (todaysPlan.some((w) => w.id === workout.id)) {
      return false;
    }
    const planWorkout: IPlanWorkout = {
      ...workout,
      isDone: false,
      addedAt: Date.now(),
    };
    setTodaysPlan((prev) => [...prev, planWorkout]);
    return true;
  };

  const addToSaved = (workout: IWorkout): boolean => {
    if (saved.some((w) => w.id === workout.id)) {
      return false;
    }
    const planWorkout: IPlanWorkout = {
      ...workout,
      isDone: false,
      addedAt: Date.now(),
    };
    setSaved((prev) => [...prev, planWorkout]);
    return true;
  };

  const removeFromTodaysPlan = (id: string) => {
    setTodaysPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id: string) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  const markAsDone = (id: string) => {
    setTodaysPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isDone: true } : w)),
    );
  };

  const planCount = todaysPlan.length;
  const savedCount = saved.length;
  const totalMinutes = todaysPlan.reduce(
    (sum, w) => sum + (w.duration || 0),
    0,
  );
  const totalCalories = todaysPlan.reduce(
    (sum, w) => sum + (w.calories || 0),
    0,
  );

  const sharedData: IFitLogContext = {
    todaysPlan,
    saved,
    addToTodaysPlan,
    addToSaved,
    removeFromTodaysPlan,
    removeFromSaved,
    markAsDone,
    planCount,
    savedCount,
    totalMinutes,
    totalCalories,
  };

  return (
    <FitLogContext.Provider value={sharedData}>
      {children}
    </FitLogContext.Provider>
  );
};

export default FitLogProvider;
