
import { User, Badge, LegalMaxim, Level, LearningModule, Activity } from "@/types";

// Mock badges
export const mockBadges: Badge[] = [
  {
    id: "badge1",
    name: "Latin Lover",
    description: "Completed your first Latin maxim",
    imageUrl: "/badges/latin-lover.png",
    dateEarned: new Date(2024, 0, 15).toISOString(),
  },
  {
    id: "badge2",
    name: "Streak Master",
    description: "Maintained a 7-day streak",
    imageUrl: "/badges/streak-master.png",
    dateEarned: new Date(2024, 0, 22).toISOString(),
  },
  {
    id: "badge3",
    name: "Maxim Explorer",
    description: "Completed maxims from 3 different categories",
    imageUrl: "/badges/maxim-explorer.png",
    dateEarned: new Date(2024, 1, 5).toISOString(),
  },
  {
    id: "badge4",
    name: "Legal Eagle",
    description: "Achieved 90% accuracy on 10 quizzes",
    imageUrl: "/badges/legal-eagle.png",
    dateEarned: new Date(2024, 1, 10).toISOString(),
  },
  {
    id: "badge5",
    name: "Juris Doctor",
    description: "Reached Level 5",
    imageUrl: "/badges/juris-doctor.png",
    dateEarned: "",
  },
];

// Mock users
export const mockUsers: User[] = [
  {
    id: "user1",
    username: "JurisPrudence",
    email: "user1@example.com",
    avatar: "/avatars/avatar1.png",
    xp: 350,
    level: 3,
    streakDays: 12,
    lastLoginDate: new Date().toISOString(),
    joinDate: new Date(2024, 0, 10).toISOString(),
    completedMaxims: ["maxim1", "maxim2", "maxim3"],
    badges: [mockBadges[0], mockBadges[1], mockBadges[2]],
  },
  {
    id: "user2",
    username: "LegalEagle",
    email: "user2@example.com",
    avatar: "/avatars/avatar2.png",
    xp: 520,
    level: 4,
    streakDays: 25,
    lastLoginDate: new Date().toISOString(),
    joinDate: new Date(2023, 11, 15).toISOString(),
    completedMaxims: ["maxim1", "maxim2", "maxim3", "maxim4", "maxim5"],
    badges: [mockBadges[0], mockBadges[1], mockBadges[2], mockBadges[3]],
  },
  {
    id: "user3",
    username: "LatinLearner",
    email: "user3@example.com",
    avatar: "/avatars/avatar3.png",
    xp: 120,
    level: 2,
    streakDays: 5,
    lastLoginDate: new Date().toISOString(),
    joinDate: new Date(2024, 1, 1).toISOString(),
    completedMaxims: ["maxim1"],
    badges: [mockBadges[0]],
  },
  {
    id: "user4",
    username: "MaximMaster",
    email: "user4@example.com",
    avatar: "/avatars/avatar4.png",
    xp: 680,
    level: 5,
    streakDays: 30,
    lastLoginDate: new Date().toISOString(),
    joinDate: new Date(2023, 10, 1).toISOString(),
    completedMaxims: ["maxim1", "maxim2", "maxim3", "maxim4", "maxim5", "maxim6", "maxim7"],
    badges: mockBadges,
  },
  {
    id: "user5",
    username: "CaseBriefs",
    email: "user5@example.com",
    avatar: "/avatars/avatar5.png",
    xp: 210,
    level: 2,
    streakDays: 3,
    lastLoginDate: new Date(2024, 2, 2).toISOString(),
    joinDate: new Date(2024, 0, 5).toISOString(),
    completedMaxims: ["maxim1", "maxim2"],
    badges: [mockBadges[0], mockBadges[3]],
  },
];

// Mock legal maxims
export const mockLegalMaxims: LegalMaxim[] = [
  {
    id: "maxim1",
    latin: "Actus non facit reum nisi mens sit rea",
    english: "The act does not make a person guilty unless the mind is also guilty",
    category: "Criminal Law",
    description: "This maxim is the foundation of criminal law, establishing that a crime requires both a guilty act (actus reus) and a guilty mind (mens rea).",
    example: "A person who accidentally kills someone while driving carefully would not be guilty of murder due to lack of criminal intent.",
    wordBreakdown: [
      { latin: "actus", english: "act", partOfSpeech: "noun" },
      { latin: "non", english: "not", partOfSpeech: "adverb" },
      { latin: "facit", english: "makes", partOfSpeech: "verb" },
      { latin: "reum", english: "guilty person", partOfSpeech: "noun" },
      { latin: "nisi", english: "unless", partOfSpeech: "conjunction" },
      { latin: "mens", english: "mind", partOfSpeech: "noun" },
      { latin: "sit", english: "is", partOfSpeech: "verb" },
      { latin: "rea", english: "guilty", partOfSpeech: "adjective" },
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "maxim2",
    latin: "Pacta sunt servanda",
    english: "Agreements must be kept",
    category: "Contract Law",
    description: "This fundamental principle of contract law states that agreements and promises must be honored.",
    example: "When two parties sign a valid contract, they are legally bound to fulfill their obligations as stated in the agreement.",
    wordBreakdown: [
      { latin: "pacta", english: "agreements", partOfSpeech: "noun" },
      { latin: "sunt", english: "are", partOfSpeech: "verb" },
      { latin: "servanda", english: "to be observed/kept", partOfSpeech: "gerundive" },
    ],
    difficulty: "beginner",
    xpReward: 40,
  },
  {
    id: "maxim3",
    latin: "Ignorantia legis neminem excusat",
    english: "Ignorance of the law excuses no one",
    category: "General Principle",
    description: "This principle holds that a person who is unaware of a law may not escape liability for violating that law merely because they were unaware of it.",
    example: "A driver cannot avoid a speeding ticket by claiming they didn't know the speed limit on that particular road.",
    wordBreakdown: [
      { latin: "ignorantia", english: "ignorance", partOfSpeech: "noun" },
      { latin: "legis", english: "of the law", partOfSpeech: "noun" },
      { latin: "neminem", english: "no one", partOfSpeech: "pronoun" },
      { latin: "excusat", english: "excuses", partOfSpeech: "verb" },
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "maxim4",
    latin: "Res ipsa loquitur",
    english: "The thing speaks for itself",
    category: "Tort Law",
    description: "A doctrine in tort law when the very nature of an accident implies negligence.",
    example: "If a surgical tool is left inside a patient after surgery, the negligence is obvious without needing to prove specific actions of negligence.",
    wordBreakdown: [
      { latin: "res", english: "thing", partOfSpeech: "noun" },
      { latin: "ipsa", english: "itself", partOfSpeech: "pronoun" },
      { latin: "loquitur", english: "speaks", partOfSpeech: "verb" },
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "maxim5",
    latin: "Ei incumbit probatio qui dicit, non qui negat",
    english: "The burden of proof lies with who declares, not who denies",
    category: "Evidence",
    description: "This principle establishes that the burden of proof rests with the party making an assertion, not with the party denying it.",
    example: "In a criminal trial, the prosecution must prove the defendant's guilt, rather than the defendant having to prove their innocence.",
    wordBreakdown: [
      { latin: "ei", english: "on him", partOfSpeech: "pronoun" },
      { latin: "incumbit", english: "it lies", partOfSpeech: "verb" },
      { latin: "probatio", english: "proof", partOfSpeech: "noun" },
      { latin: "qui", english: "who", partOfSpeech: "pronoun" },
      { latin: "dicit", english: "says/declares", partOfSpeech: "verb" },
      { latin: "non", english: "not", partOfSpeech: "adverb" },
      { latin: "qui", english: "who", partOfSpeech: "pronoun" },
      { latin: "negat", english: "denies", partOfSpeech: "verb" },
    ],
    difficulty: "advanced",
    xpReward: 75,
  },
  {
    id: "maxim6",
    latin: "Nemo judex in causa sua",
    english: "No one should be a judge in their own case",
    category: "Procedure",
    description: "This principle of natural justice states that no person can judge a case in which they have an interest.",
    example: "A judge must recuse themselves from a case if they have a personal relationship with one of the parties involved.",
    wordBreakdown: [
      { latin: "nemo", english: "no one", partOfSpeech: "pronoun" },
      { latin: "judex", english: "judge", partOfSpeech: "noun" },
      { latin: "in", english: "in", partOfSpeech: "preposition" },
      { latin: "causa", english: "case", partOfSpeech: "noun" },
      { latin: "sua", english: "their own", partOfSpeech: "pronoun" },
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "maxim7",
    latin: "Nullum crimen sine lege",
    english: "No crime without law",
    category: "Criminal Law",
    description: "This principle states that one cannot be punished for doing something that is not prohibited by law.",
    example: "A person cannot be convicted for an act that was not criminalized at the time it was committed.",
    wordBreakdown: [
      { latin: "nullum", english: "no", partOfSpeech: "adjective" },
      { latin: "crimen", english: "crime", partOfSpeech: "noun" },
      { latin: "sine", english: "without", partOfSpeech: "preposition" },
      { latin: "lege", english: "law", partOfSpeech: "noun" },
    ],
    difficulty: "intermediate",
    xpReward: 50,
  },
];

// Mock level system
export const mockLevels: Level[] = [
  { level: 1, title: "Beginner", minXp: 0, maxXp: 50 },
  { level: 2, title: "Learner", minXp: 51, maxXp: 150 },
  { level: 3, title: "Maxim Explorer", minXp: 151, maxXp: 300 },
  { level: 4, title: "Legal Latin Pro", minXp: 301, maxXp: 500 },
  { level: 5, title: "Juris Master", minXp: 501, maxXp: Infinity },
];

// Mock learning modules
export const mockActivities: Record<string, Activity[]> = {
  maxim1: [
    {
      id: "act1-maxim1",
      type: "flashcard",
      content: {
        front: "Actus non facit reum nisi mens sit rea",
        back: "The act does not make a person guilty unless the mind is also guilty",
      },
      xpReward: 10,
      completed: false,
    },
    {
      id: "act2-maxim1",
      type: "wordBreakdown",
      content: {
        words: [
          { latin: "actus", english: "act" },
          { latin: "non", english: "not" },
          { latin: "facit", english: "makes" },
          { latin: "reum", english: "guilty person" },
          { latin: "nisi", english: "unless" },
          { latin: "mens", english: "mind" },
          { latin: "sit", english: "is" },
          { latin: "rea", english: "guilty" },
        ],
      },
      xpReward: 15,
      completed: false,
    },
    {
      id: "act3-maxim1",
      type: "dragAndDrop",
      content: {
        question: "Match the Latin words with their English meanings:",
        pairs: [
          { latin: "actus", english: "act" },
          { latin: "mens", english: "mind" },
          { latin: "rea", english: "guilty" },
          { latin: "non", english: "not" },
        ],
      },
      xpReward: 20,
      completed: false,
    },
    {
      id: "act4-maxim1",
      type: "fillInTheBlank",
      content: {
        question: "Complete the maxim: Actus non facit reum nisi ____ sit ____",
        options: ["mens", "rea", "legis", "culpa"],
        correctAnswers: ["mens", "rea"],
      },
      xpReward: 25,
      completed: false,
    },
    {
      id: "act5-maxim1",
      type: "caseScenario",
      content: {
        scenario: "A driver accidentally hits a pedestrian after their brakes fail, despite having their car properly serviced the previous week. They had no knowledge that the brakes would fail. Would they be guilty of intentional harm under the principle of 'Actus non facit reum nisi mens sit rea'?",
        options: [
          "Yes, because they caused harm regardless of intent",
          "No, because they lacked the mens rea (guilty mind) for intentional harm",
          "Yes, because they should have anticipated the brake failure",
          "No, because they weren't driving at the time"
        ],
        correctAnswer: 1,
        explanation: "According to 'Actus non facit reum nisi mens sit rea', both a guilty act and guilty mind are required. While the driver committed the act of hitting the pedestrian, they lacked the intent (mens rea) to cause harm since the brake failure was unexpected and they had properly maintained their vehicle."
      },
      xpReward: 30,
      completed: false,
    },
  ],
  // Add more activities for other maxims as needed
};

// Helper function to get a user's current level based on XP
export function getUserLevel(xp: number): Level {
  for (let i = mockLevels.length - 1; i >= 0; i--) {
    if (xp >= mockLevels[i].minXp) {
      return mockLevels[i];
    }
  }
  return mockLevels[0]; // Default to level 1 if something goes wrong
}

// Helper function to calculate XP needed for next level
export function getXpForNextLevel(currentXp: number): { current: number, required: number, nextLevel: number } {
  const currentLevel = getUserLevel(currentXp);
  const currentLevelIndex = mockLevels.findIndex(level => level.level === currentLevel.level);
  
  // If at max level
  if (currentLevelIndex === mockLevels.length - 1) {
    return {
      current: currentXp - currentLevel.minXp,
      required: 0,
      nextLevel: currentLevel.level
    };
  }
  
  const nextLevel = mockLevels[currentLevelIndex + 1];
  return {
    current: currentXp - currentLevel.minXp,
    required: nextLevel.minXp - currentLevel.minXp,
    nextLevel: nextLevel.level
  };
}

// Generate mock learning modules
export const mockLearningModules: LearningModule[] = mockLegalMaxims.map(maxim => ({
  id: `module-${maxim.id}`,
  maximId: maxim.id,
  activities: mockActivities[maxim.id] || [],
  totalXp: maxim.xpReward,
  completed: false,
}));

// Generate avatar options
export const avatarOptions = [
  { id: 'avatar1', src: '/avatars/avatar1.png', alt: 'Judge Avatar' },
  { id: 'avatar2', src: '/avatars/avatar2.png', alt: 'Attorney Avatar' },
  { id: 'avatar3', src: '/avatars/avatar3.png', alt: 'Law Student Avatar' },
  { id: 'avatar4', src: '/avatars/avatar4.png', alt: 'Professor Avatar' },
  { id: 'avatar5', src: '/avatars/avatar5.png', alt: 'Scholar Avatar' },
  { id: 'avatar6', src: '/avatars/avatar6.png', alt: 'Researcher Avatar' },
];
