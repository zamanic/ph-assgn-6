import Image from "next/image";

const HeroBanner = () => {
  const scrollToLibrary = () => {
    const el = document.getElementById("library");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-neutral-900 to-[#0a0a0a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(204,255,0,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(204,255,0,0.05),transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/50 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                Workout Library
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
            >
              Train with intent.
              <br />
              <span className="text-[#ccff00]">Log every set.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 max-w-xl mb-10 leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <button
              onClick={scrollToLibrary}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#ccff00] text-black font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-[#b3e600] hover:shadow-xl hover:shadow-[#ccff00]/20 hover:scale-105 active:scale-100"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              Browse Workouts
            </button>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 aspect-[4/5] max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <Image
                src="/banner.png"
                alt="Workout Hero"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src =
                    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-[#ccff00]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      12 Lifts
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
                    <svg
                      className="w-4 h-4 text-[#ccff00]"
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
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Pro Level
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl border-2 border-[#ccff00]/30 hidden lg:block" />
            <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
