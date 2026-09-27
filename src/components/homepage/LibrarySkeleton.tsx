const LibrarySkeleton = () => {
  return (
    <section id="library" className="bg-[#0a0a0a] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="h-10 w-48 mx-auto bg-neutral-800 rounded-md animate-pulse-skeleton mb-4" />
          <div className="h-5 w-96 mx-auto max-w-full bg-neutral-800 rounded-md animate-pulse-skeleton" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden h-full flex flex-col"
            >
              <div className="aspect-[4/3] bg-neutral-800 animate-pulse-skeleton" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-neutral-800 rounded animate-pulse-skeleton" />
                <div className="h-4 w-full bg-neutral-800 rounded animate-pulse-skeleton" />
                <div className="h-4 w-5/6 bg-neutral-800 rounded animate-pulse-skeleton" />
                <div className="flex gap-4 pt-2">
                  <div className="h-4 w-14 bg-neutral-800 rounded animate-pulse-skeleton" />
                  <div className="h-4 w-16 bg-neutral-800 rounded animate-pulse-skeleton" />
                  <div className="h-4 w-10 bg-neutral-800 rounded animate-pulse-skeleton ml-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LibrarySkeleton;
