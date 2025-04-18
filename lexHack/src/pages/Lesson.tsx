
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { LegalMaxim, Activity, ActivityType } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Book, BookOpen, ChevronRight, GraduationCap, Star } from "lucide-react";
import Flashcard from "@/components/learning/Flashcard";
import WordBreakdown from "@/components/learning/WordBreakdown";
import DragAndDrop from "@/components/learning/DragAndDrop";
import FillInTheBlank from "@/components/learning/FillInTheBlank";
import CaseScenario from "@/components/learning/CaseScenario";
import { toast } from "@/hooks/use-toast";

export default function Lesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { maxims, modules, completeActivity, completeMaxim, showXpToast } = useApp();
  const { currentUser } = useAuth();
  
  const [currentMaxim, setCurrentMaxim] = useState<LegalMaxim | null>(null);
  const [currentModule, setCurrentModule] = useState<Activity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load maxim and module data
  useEffect(() => {
    if (!id) return;
    
    const maxim = maxims.find(m => m.id === id);
    if (!maxim) {
      toast({
        title: "Maxim not found",
        description: "The requested legal maxim couldn't be found.",
        variant: "destructive"
      });
      navigate("/lessons");
      return;
    }
    
    setCurrentMaxim(maxim);
    
    // Find or create a module for this maxim
    const module = modules.find(m => m.maximId === id);
    if (module) {
      setCurrentModule(module.activities);
      
      // Calculate initial progress
      const completedActivities = module.activities.filter(a => a.completed).length;
      setProgress((completedActivities / module.activities.length) * 100);
      
      // Check if already completed
      if (module.completed) {
        setIsCompleted(true);
      }
    } else {
      console.warn("No module found for this maxim");
    }
  }, [id, maxims, modules, navigate]);

  // Handle activity completion
  const handleActivityComplete = () => {
    if (!currentMaxim || !id || currentActivityIndex >= currentModule.length) return;
    
    // Mark current activity as completed
    const activityId = currentModule[currentActivityIndex].id;
    completeActivity(id, activityId);
    
    // Update progress
    const newProgress = ((currentActivityIndex + 1) / currentModule.length) * 100;
    setProgress(newProgress);
    
    // Move to next activity or complete lesson
    if (currentActivityIndex < currentModule.length - 1) {
      setCurrentActivityIndex(prev => prev + 1);
    } else {
      // Complete the maxim if all activities are done
      completeMaxim(id);
      setIsCompleted(true);
      
      // Show success toast
      toast({
        title: "Maxim Mastered!",
        description: `You've successfully learned "${currentMaxim.latin}"`,
        variant: "default"
      });
      
      // Show big XP reward
      showXpToast(currentMaxim.xpReward);
    }
  };

  // Render the current activity based on its type
  const renderActivity = () => {
    if (!currentModule || currentModule.length === 0 || currentActivityIndex >= currentModule.length) {
      return (
        <div className="text-center p-8">
          <p>No activities available for this maxim.</p>
        </div>
      );
    }

    const activity = currentModule[currentActivityIndex];
    
    switch (activity.type) {
      case "flashcard":
        return (
          <Flashcard 
            front={activity.content.front} 
            back={activity.content.back}
            onComplete={handleActivityComplete}
          />
        );
      
      case "wordBreakdown":
        return (
          <WordBreakdown
            words={activity.content.words}
            onComplete={handleActivityComplete}
          />
        );
      
      case "dragAndDrop":
        return (
          <DragAndDrop
            question={activity.content.question}
            pairs={activity.content.pairs}
            onComplete={handleActivityComplete}
          />
        );
      
      case "fillInTheBlank":
        return (
          <FillInTheBlank
            question={activity.content.question}
            options={activity.content.options}
            correctAnswers={activity.content.correctAnswers}
            onComplete={handleActivityComplete}
          />
        );
      
      case "caseScenario":
        return (
          <CaseScenario
            scenario={activity.content.scenario}
            options={activity.content.options}
            correctAnswer={activity.content.correctAnswer}
            explanation={activity.content.explanation}
            onComplete={handleActivityComplete}
          />
        );
      
      default:
        return (
          <div className="text-center p-8">
            <p>Unknown activity type.</p>
          </div>
        );
    }
  };

  // Render completion screen
  const renderCompletionScreen = () => {
    if (!currentMaxim) return null;
    
    return (
      <motion.div
        className="max-w-2xl mx-auto my-12 glassmorphism p-8 rounded-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <motion.div 
            className="w-24 h-24 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Star className="text-gold w-12 h-12" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gold mb-2">Congratulations!</h2>
          <p className="text-lg mb-4">You've mastered this legal maxim</p>
          <div className="p-4 bg-secondary/30 rounded-lg mb-4">
            <p className="font-serif text-xl text-gold">"{currentMaxim.latin}"</p>
            <p className="italic mt-2">"{currentMaxim.english}"</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/lessons")} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Lessons
          </Button>
          <Button onClick={() => {
            setIsCompleted(false);
            setCurrentActivityIndex(0);
            setProgress(0);
          }} variant="outline" className="flex items-center gap-2">
            <GraduationCap size={16} />
            Practice Again
          </Button>
        </div>
      </motion.div>
    );
  };

  if (!currentMaxim) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="glassmorphism p-8 rounded-xl animate-pulse">
            Loading maxim...
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/lessons")}
              className="mr-2"
            >
              <ArrowLeft size={16} className="mr-1" /> Back
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20">
                {currentMaxim.category}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary/30">
                {currentMaxim.difficulty}
              </span>
            </div>
          </div>
          
          <div className="glassmorphism p-6 rounded-xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gold mb-2">{currentMaxim.english}</h1>
            {/* <p className="text-lg italic mb-4">"{currentMaxim.english}"</p> */}
            <p className="text-sm text-muted-foreground mb-3">{currentMaxim.description}</p>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <BookOpen size={16} className="mr-2 text-primary" />
                  <span className="text-sm">Progress</span>
                </div>
                <span className="text-sm font-medium">
                  {currentActivityIndex + 1} of {currentModule.length} activities
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
        
        {/* Activity or completion screen */}
        {isCompleted ? renderCompletionScreen() : renderActivity()}
      </div>
    </AppLayout>
  );
}
