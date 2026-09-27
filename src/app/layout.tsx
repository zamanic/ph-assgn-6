import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FitLogProvider from "@/context/FitLogContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-neutral-200">
        <FitLogProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </FitLogProvider>
      </body>
    </html>
  );
}
