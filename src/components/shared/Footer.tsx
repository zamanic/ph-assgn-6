import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-neutral-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-extrabold tracking-wider text-white uppercase">
            FitLog
          </span>
        </div>
        <div className="text-sm text-neutral-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
