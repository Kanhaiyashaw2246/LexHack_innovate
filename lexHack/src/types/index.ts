
// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  xp: number;
  level: number;
  streakDays: number;
  lastLoginDate: string;
  joinDate: string;
  completedMaxims: string[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateEarned: string;
}

// Maxim related types
export interface LegalMaxim {
  id: string;
  latin: string;
  english: string;
  category: MaximCategory;
  description: string;
  example: string;
  wordBreakdown: WordBreakdown[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
}

export interface WordBreakdown {
  latin: string;
  english: string;
  partOfSpeech?: string;
}

export type MaximCategory = 
  | 'Criminal Law'
  | 'Contract Law'
  | 'Constitutional Law'
  | 'Tort Law'
  | 'Property Law'
  | 'Evidence'
  | 'Procedure'
  | 'General Principle';

// Learning module related types
export interface LearningModule {
  id: string;
  maximId: string;
  activities: Activity[];
  totalXp: number;
  completed: boolean;
}

export type ActivityType = 
  | 'flashcard'
  | 'wordBreakdown'
  | 'dragAndDrop'
  | 'fillInTheBlank'
  | 'caseScenario'
  | 'pronunciation';

export interface Activity {
  id: string;
  type: ActivityType;
  content: any;
  xpReward: number;
  completed: boolean;
}

// Level system
export interface Level {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
}

// Auth related types
export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

// Gemini API related types
export interface GeminiRequest {
  maxim: LegalMaxim;
  prompt: string;
}

export interface GeminiResponse {
  content: string;
}
