import { useState } from "react";
import { motion } from "framer-motion";
import { LegalMaxim } from "@/types";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface MaximCardProps {
  maxim: LegalMaxim;
  completed?: boolean;
}

export default function MaximCard({ maxim, completed = false }: MaximCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { currentUser } = useAuth();
  
  // Category badge color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Criminal Law":
        return "bg-red-900/60 text-white";
      case "Contract Law":
        return "bg-blue-900/60 text-white";
      case "Constitutional Law":
        return "bg-green-900/60 text-white";
      case "Tort Law":
        return "bg-orange-900/60 text-white";
      case "Property Law":
        return "bg-yellow-900/60 text-white";
      case "Evidence":
        return "bg-purple-900/60 text-white";
      case "Procedure":
        return "bg-indigo-900/60 text-white";
      default:
        return "bg-slate-800/60 text-white";
    }
  };

  // Difficulty badge
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-emerald-900/60 text-white";
      case "intermediate":
        return "bg-amber-900/60 text-white";
      case "advanced":
        return "bg-red-900/60 text-white";
      default:
        return "bg-slate-800/60 text-white";
    }
  };

  return (
    <motion.div
      className={`relative claymorphism overflow-hidden transition-all ${completed ? 'border-gold/30' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Completed stamp */}
      {completed && (
        <div className="absolute top-2 right-2 rounded-full bg-gold/80 text-gold-foreground text-xs px-2 py-1 font-bold z-10">
          COMPLETED
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(maxim.category)}`}>
            {maxim.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(maxim.difficulty)}`}>
            {maxim.difficulty.charAt(0).toUpperCase() + maxim.difficulty.slice(1)}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gold/70 text-gold-foreground">
            +{maxim.xpReward} XP
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gold mb-2">{maxim.latin}</h3>
        <p className="text-foreground/80 italic mb-4">"{maxim.english}"</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground/70 mb-1">Description:</h4>
          <p className="text-sm text-foreground/60">
            {maxim.description.length > 120 
              ? `${maxim.description.substring(0, 120)}...` 
              : maxim.description}
          </p>
        </div>
        
        <Link 
          to={`/lessons/${maxim.id}`}
          className="inline-flex items-center justify-center bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-md mt-2 transition-colors"
        >
          <span>{completed ? "Review" : "Start Learning"}</span>
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
      
      {/* Gold glow for completed maxims */}
      {completed && (
        <div className="absolute inset-0 border-2 border-gold/30 rounded-xl pointer-events-none" />
      )}
      
      {/* Animated border for hover effect */}
      {isHovered && (
        <motion.div 
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${completed ? 'rgba(255,215,0,0.1)' : 'rgba(139,92,246,0.1)'} 50%, rgba(0,0,0,0) 100%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear',
          }}
        />
      )}
    </motion.div>
  );
}
