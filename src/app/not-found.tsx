import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="text-center max-w-lg animate-fade-in">
        <h2
          className="text-8xl sm:text-9xl font-black text-[#ccff00] mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
        >
          404
        </h2>
        <p className="text-2xl sm:text-3xl font-bold uppercase text-white mb-3">
          Page not found
        </p>
        <p className="text-neutral-400 mb-10">
          The workout you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ccff00] text-black font-bold uppercase tracking-wider rounded-xl transition-all hover:bg-[#b3e600] hover:shadow-lg hover:shadow-[#ccff00]/20"
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Workouts
        </Link>
      </div>
    </div>
  );
}
