# 💪 FitLog — Workout Library

**FitLog** is a dynamic, dark-themed Next.js workout companion built with the App Router, TypeScript, Tailwind CSS, daisyUI, and React Toastify. Browse a curated library of 12 compound and isolation lifts, lock them into **Today's Plan**, save them for later, and track your volume in real-time with live stat counters, sortable tabs, and smooth toast notifications.

## 🚀 Tech Stack

| Layer         | Technology                                       |
| ------------- | ------------------------------------------------ |
| Framework     | Next.js 16 (App Router, React 19, TypeScript)    |
| Styling       | Tailwind CSS v4 + daisyUI + custom dark theme    |
| UI Lib        | daisyUI components                               |
| State         | React Context API (`FitLogContext`)              |
| Notifications | React Toastify                                   |
| Fonts         | Geist (Sans/Mono) + Oswald (display headings)    |
| Persistence   | `localStorage` (auto-saves Today's Plan + Saved) |
| Data          | External REST APIs + built-in fallback dataset   |
| Deploy        | Vercel / Netlify / Cloudflare Pages ready        |

---

## ✨ 5 Key Features

### 1. 📚 **The 12-Lift Workout Library (3×4 Grid)**

A responsive 3-column library (collapses to 1 on mobile, 2 on tablet) of 12 curated compound + isolation lifts, rendered from the FitLog API with a hand-crafted fallback dataset embedded right into the app so it always works offline. Each card ships with an illustration, category badge pills, workout name, equipment line, and a stats row (**duration · calories · rating**).

### 2. 🧭 **Full App Router Navigation + Dynamic Detail Pages**

- **`/`** → Workouts Library (home) with Hero Banner + The Library section.
- **`/workouts/[id]`** → Dynamic detail page with left-column image, full specs table (Equipment / Difficulty / Sets / Reps / Duration / Calories / Rating), numbered step-by-step instructions, and two CTAs.
- **`/my-plan`** → Today's Plan + Saved dashboard with live stat cards, sortable tabs, per-card actions, and an empty state with CTA back to the library.
- **`not-found.tsx`** → Custom branded 404 page for any unknown route.

### 3. 🎯 **Global Context API with Today's Plan / Saved + Toast Feedback**

The `FitLogContext` wraps the whole app (see `src/context/FitLogContext.tsx`) and exposes:

- `addToTodaysPlan()` / `addToSaved()` — **automatically prevents duplicate entries** and fires a toast (`Already in your plan`).
- `removeFromTodaysPlan()` / `removeFromSaved()` — removes items and confirms with a toast.
- `markAsDone()` — toggles a green "Completed/Done" badge and line-through style.
- Live **Plan** and **Saved** pill counters in the Navbar that **link to `/my-plan`**.

Toasts are powered by `react-toastify` with `success`, `info`, and `warn` variants for every user action.

### 4. 📊 **My Plan Dashboard — Live Stats, Tabs & Sort By Dropdown**

The `/my-plan` page is a workout log hub:

- **3 Stat Cards**: Exercises / Minutes / Calories computed as the sum of items in Today's Plan (updates live as items are added / removed).
- **2 Tabs**: `Today's Plan` / `Saved` with per-tab item counts.
- **Sort By dropdown**: Duration (default) / Calories / Rating — descending order, reapplied instantly via `useMemo`.
- **Per-card actions**: View Details, Mark as Done, Remove (X).
- **Empty state**: "Nothing here yet" + Go to Workouts CTA.

### 5. 💾 **Auto-Persistence + Loading States + Responsive Dark UI**

- `localStorage` keeps **Today's Plan** and **Saved** across full page reloads and deployments.
- Global `loading.tsx`, skeleton loader (`LibrarySkeleton`) for the Library grid, and a Suspense fallback for the My Plan tab (shows "Loading workouts…").
- Mobile-friendly hamburger dropdown in the Navbar, hero stacks on small screens, library grid collapses correctly, My Plan cards reflow vertically — fully responsive on **mobile, tablet, desktop**.

---

## 🗂️ Project Structure

```
fitlog-app/
├── public/
│   ├── banner.png              # Hero banner image
│   ├── logo.png                # FitLog brand logo
│   └── ...                     # Next.js default icons
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind v4 + daisyUI plugin, custom keyframes
│   │   ├── layout.tsx          # Root layout: Navbar / Footer / Context / Toast
│   │   ├── page.tsx            # / (Home) — HeroBanner + LibrarySection
│   │   ├── loading.tsx         # Global app loading state
│   │   ├── not-found.tsx       # 404 page
│   │   ├── my-plan/
│   │   │   └── page.tsx        # /my-plan — Suspense → MyPlanClient
│   │   └── workouts/
│   │       └── [id]/
│   │           └── page.tsx    # /workouts/:id — server fetch → WorkoutDetailsClient
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navbar.tsx      # Logo / Workouts · My Plan / Plan + Saved pills / mobile menu
│   │   │   ├── Footer.tsx      # Logo + copyright line
│   │   │   └── WorkoutCard.tsx # Library card (image / badges / name / equipment / stats)
│   │   ├── homepage/
│   │   │   ├── HeroBanner.tsx      # Eyebrow / headline / CTA scroll-to-library / image
│   │   │   ├── LibrarySection.tsx  # 3×4 responsive grid of WorkoutCard
│   │   │   └── LibrarySkeleton.tsx # 12-card skeleton loader with pulse animation
│   │   ├── details/
│   │   │   └── WorkoutDetailsClient.tsx  # Image + spec panel + instructions + CTAs
│   │   └── myplan/
│   │       └── MyPlanClient.tsx  # Stats / Tabs / Sort By / PlanCard list / Empty state
│   ├── context/
│   │   └── FitLogContext.tsx  # Global state: plan, saved, totals, dedupe, localStorage
│   ├── data/
│   │   └── fallbackWorkouts.ts  # Embedded 12-workout dataset (API fallback)
│   └── types/
│       └── workout.type.ts      # IWorkout, IPlanWorkout, IFitLogContext
├── AGENTS.md · CLAUDE.md  # Next.js 16 agent rule files
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🛠️ API Integrations

FitLog tries both endpoints in order, then falls back to the bundled 12-workout dataset — so the app **never shows an empty library**, even if the network is down.

**All workouts:**

1. `https://api.api-store.workers.dev/api/fitlog` — (primary, 8s timeout)
2. `https://api.abcz.workers.dev/api/fitlog` — (secondary fallback)
3. `fallbackWorkouts` — embedded dataset (always works)

**Single workout by id:**

1. `https://api.api-store.workers.dev/api/fitlog/:id`
2. `https://api.abcz.workers.dev/api/fitlog/:id`
3. `fallbackWorkouts.find(id => …)`

---

## 🏃 Commands — Run Before Deploying to Vercel

From inside the `fitlog-app/` directory:

```bash
# 1. Install dependencies (already done during setup, re-run if you clone fresh)
npm install

# 2. Start the local dev server at http://localhost:3000
npm run dev
# → open http://localhost:3000 in your browser to test

# 3. Run a production build locally (RECOMMENDED before Vercel deploy)
npm run build

# 4. Serve the built app locally to double-check everything works as shipped
npm run start
# → http://localhost:3000 (production mode)

# 5. Lint pass (Next.js ESLint config):
npm run lint
```

**Deploy sequence we recommend:**

1. `npm run build` — fix any warnings/errors.
2. `npm run start` — smoke-test the production build on `:3000`.
3. Push to GitHub → import into Vercel → deploy (zero config needed for default Next.js App Router).

---

## 🖼️ Static Assets (copy into /public after cloning)

Two binary images ship with the local project but aren't tracked in every fresh clone. Copy them into `public/`:

```bash
# From the project root (Windows / PowerShell):
copy "D:\Development steps\NEXT\assets\banner.png"  public\banner.png
copy "D:\Development steps\NEXT\assets\logo.png"    public\logo.png

# Cross-platform (if you have a source folder):
# cp /path/to/assets/banner.png public/
# cp /path/to/assets/logo.png   public/
```

- `public/banner.png` — hero section illustration (aspect 4:5, 800–1200px wide recommended)
- `public/logo.png` — Navbar + Footer FitLog logo (32×32px)

> Missing these? The app auto-falls back to Unsplash images at runtime via the `onError` handlers in `src/components/homepage/HeroBanner.tsx` and `src/components/shared/WorkoutCard.tsx` — no 404s, no crashes.

---

## ⚡ Quick Start (TL;DR)

```bash
git clone https://github.com/zamanic/ph-assgn-6.git fitlog-app
cd fitlog-app
# (copy banner.png + logo.png into public/ — see section above)
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build (run BEFORE deploying to Vercel)
npm run lint       # lint check
```

---

## 📋 Features Checklist (Instructions v1)

- [x] Responsive on **mobile / tablet / desktop**
- [x] 8+ Git commits with clear, meaningful messages
- [x] Zero runtime errors after build/deploy
- [x] Navbar: Logo · Workouts + My Plan · **Plan** (filled accent pill) · **Saved** (outlined pill) counters linking to `/my-plan`
- [x] Hero: "WORKOUT LIBRARY" eyebrow · "TRAIN WITH INTENT. LOG EVERY SET." headline · subtitle · **BROWSE WORKOUTS** smooth-scroll anchor to `#library` · hero image
- [x] Library: "THE LIBRARY" heading · subtitle · 12 cards in a **3×4 (large) grid** with image / badges / name / equipment line · duration / calories / rating stats row
- [x] Detail page: Large image · title · description · badges · 7-row specs table · 4-step ordered instructions · **Add to today's plan** · **Save for later**
- [x] Toast notifications on every button click; dedupe toast if already added
- [x] My Plan page: Title/subtitle · 3 live **Exercises / Minutes / Calories** stat cards · Today's Plan + Saved tabs · Sort By dropdown (Duration / Calories / Rating) · per-card View Details / Mark as Done / Remove X · empty state + Go to Workouts CTA
- [x] Footer: FitLog logo + © 2026 FitLog copyright line
- [x] Custom 404 page · global loading state · library skeleton loader
- [x] **localStorage** persistence for Today's Plan + Saved (survives reloads)
- [x] Deployable on **Vercel** (default Next.js build output, zero extra config)

---

💪
