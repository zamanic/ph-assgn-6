"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

const Navbar = () => {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path === "/my-plan" && pathname === "/my-plan") return true;
    if (path.startsWith("/workouts/") && pathname.startsWith("/workouts/"))
      return false;
    return false;
  };

  return (
    <nav className="bg-[#0a0a0a] border-b border-neutral-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="FitLog Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white uppercase">
                FitLog
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 px-4">
            <ul className="flex gap-1">
              <li>
                <Link
                  href="/"
                  className={`px-4 py-2 rounded-md font-bold text-sm uppercase tracking-wider transition-colors ${
                    isActive("/")
                      ? "text-white bg-neutral-800"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  Workouts
                </Link>
              </li>
              <li>
                <Link
                  href="/my-plan"
                  className={`px-4 py-2 rounded-md font-bold text-sm uppercase tracking-wider transition-colors ${
                  isActive("/my-plan")
                    ? "text-white bg-neutral-800"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/my-plan" className="inline-flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-black bg-[#ccff00] border border-[#ccff00]">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Plan
                <span className="ml-1">{planCount}</span>
              </span>
            </Link>

            <Link href="/my-plan" className="inline-flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-neutral-300 bg-transparent border border-neutral-600 hover:border-neutral-500">
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                Saved
                <span className="ml-1">{savedCount}</span>
              </span>
            </Link>

            <div className="md:hidden ml-2">
              <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="p-2 text-neutral-400 hover:text-white"
              >
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-neutral-900 border border-neutral-700 rounded-box z-[1] w-52 p-2 shadow mt-2"
              >
                <li>
                  <Link
                    href="/"
                    className={`${
                      isActive("/") ? "bg-neutral-800 text-white" : ""
                    }`}
                  >
                    Workouts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-plan"
                    className={`${
                      isActive("/my-plan") ? "bg-neutral-800 text-white" : ""
                    }`}
                  >
                    My Plan
                  </Link>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
