import { IWorkout } from "@/types/workout.type";

const fallbackWorkouts: IWorkout[] = [
  {
    id: "1",
    name: "Barbell Bench Press",
    description:
      "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    badges: ["Chest", "Arms"],
    equipment: "Barbell, Bench",
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-8",
    duration: 25,
    calories: 180,
    rating: 4.8,
    instructions: [
      "Lie flat on a bench with feet planted firmly on the floor.",
      "Grip the bar slightly wider than shoulder-width, unrack and hold at arm's length.",
      "Lower the bar to mid-chest, keeping elbows at ~45° to your body.",
      "Press the bar explosively back to the starting position.",
    ],
  },
  {
    id: "2",
    name: "Deadlift",
    description:
      "The king of compound lifts — builds a thick back, powerful glutes, and crushing grip.",
    image:
      "https://images.unsplash.com/photo-1598575436823-e89f8eb9a3c0?w=800&q=80",
    badges: ["Back", "Legs"],
    equipment: "Barbell, Plates",
    difficulty: "Advanced",
    sets: 4,
    reps: "4-6",
    duration: 30,
    calories: 260,
    rating: 4.9,
    instructions: [
      "Stand with feet hip-width under the bar, shins close to the steel.",
      "Hinge at hips, bend knees, and grip bar just outside your knees.",
      "Keep chest up and a neutral spine, drive through heels to stand.",
      "Lower the bar under control to the floor and reset.",
    ],
  },
  {
    id: "3",
    name: "Squat",
    description:
      "Foundation of leg strength — targets quads, glutes, and the entire posterior chain.",
    image:
      "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&q=80",
    badges: ["Legs", "Core"],
    equipment: "Barbell, Rack",
    difficulty: "Intermediate",
    sets: 4,
    reps: "8-10",
    duration: 28,
    calories: 220,
    rating: 4.8,
    instructions: [
      "Set bar across upper traps, grip wide, and unrack carefully.",
      "Feet shoulder-width, toes slightly turned out.",
      "Break at hips and knees, descend until thighs are parallel.",
      "Drive through heels and squeeze glutes to stand.",
    ],
  },
  {
    id: "4",
    name: "Pull-Ups",
    description:
      "Classic bodyweight builder for a wide, thick back and bulletproof biceps.",
    image:
      "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=800&q=80",
    badges: ["Back", "Arms"],
    equipment: "Pull-up Bar",
    difficulty: "Intermediate",
    sets: 4,
    reps: "8-12",
    duration: 20,
    calories: 150,
    rating: 4.7,
    instructions: [
      "Hang from a bar with a slightly wider than shoulder-width grip.",
      "Engage your lats and pull your chest up to the bar.",
      "Keep your body tight, avoid swinging or kipping.",
      "Lower under full control to a dead hang between reps.",
    ],
  },
  {
    id: "5",
    name: "Overhead Press",
    description:
      "Builds cannonball delts and thick triceps with raw, strict pressing strength.",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    badges: ["Shoulders", "Arms"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    sets: 4,
    reps: "6-8",
    duration: 22,
    calories: 170,
    rating: 4.6,
    instructions: [
      "Clean or unrack the bar to shoulder height, palms forward.",
      "Core tight, glutes squeezed, bar at upper chest/clavicle.",
      "Press straight up until arms are fully extended overhead.",
      "Lower the bar back to the shoulders with control.",
    ],
  },
  {
    id: "6",
    name: "Russian Twist",
    description:
      "Rotational core burner for obliques, transverse abdominis, and hip stability.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    badges: ["Core"],
    equipment: "Medicine Ball",
    difficulty: "Beginner",
    sets: 3,
    reps: "20/side",
    duration: 12,
    calories: 90,
    rating: 4.4,
    instructions: [
      "Sit on the floor, knees bent, heels touching the ground.",
      "Lean back slightly while keeping a long neutral spine.",
      "Interlace hands or hold a med ball at chest height.",
      "Rotate torso side to side, tapping the floor each rep.",
    ],
  },
  {
    id: "7",
    name: "Bent-Over Row",
    description:
      "Builds a thick, detailed mid-back and improves pulling power off the floor.",
    image:
      "https://images.unsplash.com/photo-1583500178690-f7fd59a3b655?w=800&q=80",
    badges: ["Back", "Arms"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    sets: 4,
    reps: "8-10",
    duration: 24,
    calories: 190,
    rating: 4.7,
    instructions: [
      "Hinge at hips until torso is roughly parallel to the floor.",
      "Knees soft, neutral spine, bar hanging under shoulders.",
      "Row the bar to lower chest, squeeze shoulder blades.",
      "Lower the bar under full control, reset each rep.",
    ],
  },
  {
    id: "8",
    name: "Lunges",
    description:
      "Unilateral leg builder that balances strength and improves athletic movement.",
    image:
      "https://images.unsplash.com/photo-1571019613706-632453710a9a?w=800&q=80",
    badges: ["Legs", "Glutes"],
    equipment: "Dumbbells",
    difficulty: "Beginner",
    sets: 3,
    reps: "12/leg",
    duration: 18,
    calories: 140,
    rating: 4.5,
    instructions: [
      "Stand tall, holding dumbbells at your sides if desired.",
      "Step forward with one leg into a deep lunge position.",
      "Lower until both knees form 90° angles, back knee hovering.",
      "Push through the front heel to return to standing.",
    ],
  },
  {
    id: "9",
    name: "Dips",
    description:
      "Bodyweight staple for horseshoe triceps and a full, developed chest.",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    badges: ["Chest", "Arms"],
    equipment: "Parallel Bars",
    difficulty: "Intermediate",
    sets: 4,
    reps: "10-15",
    duration: 18,
    calories: 130,
    rating: 4.6,
    instructions: [
      "Support yourself on parallel bars with arms fully extended.",
      "Lean forward slightly to bias the chest or upright for triceps.",
      "Lower until shoulders are below elbows, feel the stretch.",
      "Press back up powerfully to lockout without elbow snap.",
    ],
  },
  {
    id: "10",
    name: "Plank",
    description:
      "Isometric hold that builds a rock-solid core and bulletproof lower back.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    badges: ["Core"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    sets: 3,
    reps: "60s",
    duration: 8,
    calories: 50,
    rating: 4.3,
    instructions: [
      "Start on elbows and toes, body in one straight line.",
      "Feet hip-width, elbows directly under shoulders.",
      "Squeeze glutes and brace core as if about to be punched.",
      "Breathe steadily and hold without sagging or hiking hips.",
    ],
  },
  {
    id: "11",
    name: "Leg Press",
    description:
      "Heavy, controlled quad builder — lower back friendly and highly variable.",
    image:
      "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&q=80",
    badges: ["Legs"],
    equipment: "Leg Press Machine",
    difficulty: "Beginner",
    sets: 4,
    reps: "12-15",
    duration: 20,
    calories: 160,
    rating: 4.5,
    instructions: [
      "Sit with back firmly padded, feet shoulder-width on the plate.",
      "Release the safety catches, unlock knees but don't hyperextend.",
      "Lower the platform until knees are at 90° or slightly deeper.",
      "Press through your heels, squeeze quads at the top.",
    ],
  },
  {
    id: "12",
    name: "Barbell Curl",
    description:
      "Isolation lift for sleeve-busting biceps peak thickness and brachialis.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
    badges: ["Arms"],
    equipment: "Barbell",
    difficulty: "Beginner",
    sets: 3,
    reps: "10-12",
    duration: 15,
    calories: 80,
    rating: 4.4,
    instructions: [
      "Stand tall, bar hanging at arm's length, grip shoulder-width.",
      "Elbows pinned to your sides, upper arms stationary.",
      "Curl the bar up toward shoulders, squeeze biceps hard at the top.",
      "Lower slowly, resisting the weight back to full extension.",
    ],
  },
];

export default fallbackWorkouts;
