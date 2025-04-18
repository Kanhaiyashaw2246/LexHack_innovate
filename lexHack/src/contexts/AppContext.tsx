import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, LegalMaxim, LearningModule, Badge, Activity } from "@/types";
import { mockLegalMaxims, mockBadges, getUserLevel, getXpForNextLevel } from "@/lib/mockData";
import { mockLearningModules } from "@/lib/mockModuleData";
import { useAuth } from "./AuthContext";

interface AppContextType {
  maxims: LegalMaxim[];
  modules: LearningModule[];
  earnXp: (amount: number) => void;
  completeActivity: (moduleId: string, activityId: string) => void;
  completeMaxim: (maximId: string) => void;
  awardBadge: (badge: Badge) => void;
  checkForBadges: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  xpProgress: {
    current: number;
    required: number;
    nextLevel: number;
    percentage: number;
  };
  showXpToast: (amount: number) => void;
  xpToast: { show: boolean; amount: number; position: { x: number; y: number } };
  hideXpToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [maxims, setMaxims] = useState<LegalMaxim[]>(mockLegalMaxims);
  const [modules, setModules] = useState<LearningModule[]>(mockLearningModules);
  const { currentUser, updateUser } = useAuth();
  const [xpToast, setXpToast] = useState<{ 
    show: boolean; 
    amount: number; 
    position: { x: number; y: number } 
  }>({
    show: false,
    amount: 0,
    position: { x: 0, y: 0 }
  });

  const earnXp = (amount: number) => {
    if (!currentUser) return;
    
    const newXp = currentUser.xp + amount;
    const newLevel = getUserLevel(newXp).level;
    
    updateUser({
      ...currentUser,
      xp: newXp,
      level: newLevel
    });
    
    checkForBadges();
  };

  const completeActivity = (moduleId: string, activityId: string) => {
    if (!currentUser) return;

    const moduleIndex = modules.findIndex(m => m.maximId === moduleId);
    if (moduleIndex === -1) return;

    const module = modules[moduleIndex];
    const activityIndex = module.activities.findIndex(a => a.id === activityId);
    if (activityIndex === -1) return;

    const updatedActivities = [...module.activities];
    updatedActivities[activityIndex] = {
      ...updatedActivities[activityIndex],
      completed: true
    };

    const updatedModules = [...modules];
    updatedModules[moduleIndex] = {
      ...module,
      activities: updatedActivities,
      completed: updatedActivities.every(a => a.completed)
    };

    setModules(updatedModules);
    
    earnXp(updatedActivities[activityIndex].xpReward);
    
    showXpToast(updatedActivities[activityIndex].xpReward);
  };

  const completeMaxim = (maximId: string) => {
    if (!currentUser) return;

    if (!currentUser.completedMaxims.includes(maximId)) {
      const updatedCompletedMaxims = [...currentUser.completedMaxims, maximId];
      
      updateUser({
        ...currentUser,
        completedMaxims: updatedCompletedMaxims
      });

      const maxim = maxims.find(m => m.id === maximId);
      if (maxim) {
        earnXp(maxim.xpReward);
      }
    }
  };

  const awardBadge = (badge: Badge) => {
    if (!currentUser) return;

    const hasBadge = currentUser.badges.some(b => b.id === badge.id);
    if (!hasBadge) {
      const updatedBadge = {
        ...badge,
        dateEarned: new Date().toISOString()
      };
      
      updateUser({
        ...currentUser,
        badges: [...currentUser.badges, updatedBadge]
      });
    }
  };

  const checkForBadges = () => {
    if (!currentUser) return;

    if (currentUser.completedMaxims.length > 0) {
      const latinLoverBadge = mockBadges.find(b => b.name === "Latin Lover");
      if (latinLoverBadge && !currentUser.badges.some(b => b.id === latinLoverBadge.id)) {
        awardBadge(latinLoverBadge);
      }
    }
    
    if (currentUser.streakDays >= 7) {
      const streakBadge = mockBadges.find(b => b.name === "Streak Master");
      if (streakBadge && !currentUser.badges.some(b => b.id === streakBadge.id)) {
        awardBadge(streakBadge);
      }
    }

    const completedCategories = new Set();
    currentUser.completedMaxims.forEach(maximId => {
      const maxim = maxims.find(m => m.id === maximId);
      if (maxim) {
        completedCategories.add(maxim.category);
      }
    });
    
    if (completedCategories.size >= 3) {
      const explorerBadge = mockBadges.find(b => b.name === "Maxim Explorer");
      if (explorerBadge && !currentUser.badges.some(b => b.id === explorerBadge.id)) {
        awardBadge(explorerBadge);
      }
    }
    
    if (currentUser.level >= 5) {
      const jurisBadge = mockBadges.find(b => b.name === "Juris Doctor");
      if (jurisBadge && !currentUser.badges.some(b => b.id === jurisBadge.id)) {
        awardBadge(jurisBadge);
      }
    }
  };

  const incrementStreak = () => {
    if (!currentUser) return;
    
    updateUser({
      ...currentUser,
      streakDays: currentUser.streakDays + 1,
      lastLoginDate: new Date().toISOString()
    });
    
    checkForBadges();
  };

  const resetStreak = () => {
    if (!currentUser) return;
    
    updateUser({
      ...currentUser,
      streakDays: 0,
      lastLoginDate: new Date().toISOString()
    });
  };

  const xpProgress = currentUser ? (() => {
    const { current, required, nextLevel } = getXpForNextLevel(currentUser.xp);
    const percentage = required > 0 ? (current / required) * 100 : 100;
    
    return {
      current,
      required,
      nextLevel,
      percentage: Math.min(percentage, 100)
    };
  })() : { current: 0, required: 0, nextLevel: 1, percentage: 0 };

  const showXpToast = (amount: number) => {
    const x = 50 + Math.random() * 20 - 10;
    const y = 40 + Math.random() * 20 - 10;
    
    setXpToast({
      show: true,
      amount,
      position: { x, y }
    });
    
    setTimeout(hideXpToast, 2000);
  };

  const hideXpToast = () => {
    setXpToast(prev => ({ ...prev, show: false }));
  };

  useEffect(() => {
    if (currentUser && currentUser.streakDays === 0) {
      incrementStreak();
    }
  }, [currentUser?.id]);

  return (
    <AppContext.Provider
      value={{
        maxims,
        modules,
        earnXp,
        completeActivity,
        completeMaxim,
        awardBadge,
        checkForBadges,
        incrementStreak,
        resetStreak,
        xpProgress,
        showXpToast,
        xpToast,
        hideXpToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
