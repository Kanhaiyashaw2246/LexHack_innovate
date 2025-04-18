
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LegalMaxim, LearningModule } from "@/types";
import { BookOpen, CheckCircle, LockIcon, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import MaximCard from "@/components/learning/MaximCard";

export default function Lessons() {
  const { currentUser } = useAuth();
  const { maxims, modules, xpProgress, earnXp, showXpToast } = useApp();
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Award XP for first visit to lessons if new user
      if (currentUser && currentUser.xp === 0) {
        earnXp(5);
        showXpToast(5);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentUser, earnXp, showXpToast]);

  // Helper function to determine if a maxim is completed
  const isMaximCompleted = (maximId: string) => {
    return currentUser?.completedMaxims.includes(maximId) || false;
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Latin Legal Maxims</h1>
            <p className="text-muted-foreground">Master these timeless principles through interactive lessons</p>
          </div>
          
          {currentUser && (
            <div className="mt-4 md:mt-0 glassmorphism p-4 rounded-lg w-full md:w-auto">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-gold" />
                <span className="font-semibold">Level {currentUser.level}: {xpProgress.current} / {xpProgress.required} XP</span>
              </div>
              <Progress value={xpProgress.percentage} className="h-2 w-full md:w-48" />
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="glassmorphism animate-pulse">
                <CardHeader className="h-24"></CardHeader>
                <CardContent className="h-32"></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maxims.map((maxim) => (
              <MaximCard 
                key={maxim.id} 
                maxim={maxim} 
                completed={isMaximCompleted(maxim.id)} 
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
