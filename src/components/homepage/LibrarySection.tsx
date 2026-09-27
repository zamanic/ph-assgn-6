import { IWorkout } from "@/types/workout.type";
import WorkoutCard from "@/components/shared/WorkoutCard";

interface LibrarySectionProps {
  workouts: IWorkout[];
}

const LibrarySection = ({ workouts }: LibrarySectionProps) => {
  return (
    <section id="library" className="bg-[#0a0a0a] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
          >
            The Library
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 animate-fade-in">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LibrarySection;
