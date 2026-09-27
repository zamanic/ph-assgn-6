export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-neutral-800" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-[#ccff00] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-black text-[#ccff00] tracking-widest">
              F
            </span>
          </div>
        </div>
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-300 mb-2">
          Loading workouts…
        </h3>
        <p className="text-xs text-neutral-500">
          Grabbing the latest lifts from the library
        </p>
      </div>
    </div>
  );
}
