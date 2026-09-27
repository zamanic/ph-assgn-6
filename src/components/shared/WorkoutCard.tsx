import Link from "next/link";
import Image from "next/image";
import { IWorkout } from "@/types/workout.type";

interface WorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80";
  const imgSrc =
    workout.image &&
    (workout.image.startsWith("http") || workout.image.startsWith("/"))
      ? workout.image
      : fallbackImage;

  return (
    <Link href={`/workouts/${workout.id}`} className="group block">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#ccff00]/60 hover:shadow-lg hover:shadow-[#ccff00]/10 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
          <Image
            src={imgSrc}
            alt={workout.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {(workout.badges || []).slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/70 backdrop-blur-sm text-[#ccff00] border border-[#ccff00]/30"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-black uppercase tracking-tight text-white leading-tight mb-2 line-clamp-2">
            {workout.name}
          </h3>
          <p className="text-sm text-neutral-400 mb-4 line-clamp-2 min-h-[2.5rem]">
            {workout.equipment || workout.description}
          </p>

          <div className="mt-auto flex items-center gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-neutral-500"
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
                className="w-4 h-4 text-red-500"
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
              <span>{workout.calories} kcal</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <svg
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-white font-semibold">{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
