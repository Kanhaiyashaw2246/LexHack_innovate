
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

interface Pair {
  latin: string;
  english: string;
}

interface DragAndDropProps {
  question: string;
  pairs: Pair[];
  onComplete?: () => void;
}

export default function DragAndDrop({ question, pairs, onComplete }: DragAndDropProps) {
  const { showXpToast } = useApp();
  const [latinTerms, setLatinTerms] = useState(() => [...pairs.map(p => p.latin)].sort(() => Math.random() - 0.5));
  const [englishTerms, setEnglishTerms] = useState(() => [...pairs.map(p => p.english)].sort(() => Math.random() - 0.5));
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [draggedItem, setDraggedItem] = useState<{ term: string; type: "latin" | "english" } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const dragItemRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (term: string, type: "latin" | "english") => {
    setDraggedItem({ term, type });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (targetTerm: string, targetType: "latin" | "english") => {
    if (!draggedItem || draggedItem.type === targetType) return;

    // Find correct pair
    const correctPair = pairs.find(
      draggedItem.type === "latin"
        ? p => p.latin === draggedItem.term && p.english === targetTerm
        : p => p.english === draggedItem.term && p.latin === targetTerm
    );

    if (correctPair) {
      // Handle matched pair
      const updatedMatchedPairs = { ...matchedPairs };
      if (draggedItem.type === "latin") {
        updatedMatchedPairs[draggedItem.term] = targetTerm;
      } else {
        updatedMatchedPairs[targetTerm] = draggedItem.term;
      }
      setMatchedPairs(updatedMatchedPairs);

      // Show XP toast for correct match
      showXpToast(5);

      // Check if all pairs are matched
      if (Object.keys(updatedMatchedPairs).length === pairs.length) {
        setIsCompleted(true);
        if (onComplete) {
          onComplete();
        }
      }
    }
  };

  const isMatched = (term: string, type: "latin" | "english") => {
    if (type === "latin") {
      return term in matchedPairs;
    } else {
      return Object.values(matchedPairs).includes(term);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <motion.div
        className="glassmorphism p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold text-center mb-2 text-gold">
          Matching Exercise
        </h2>
        <p className="text-center text-md mb-6">{question}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Latin terms column */}
          <div>
            <h3 className="text-center text-lg font-bold mb-4 text-primary">
              Latin Terms
            </h3>
            <div className="space-y-3">
              {latinTerms.map((term) => (
                <motion.div
                  key={term}
                  className={`p-3 rounded-lg ${
                    isMatched(term, "latin")
                      ? "bg-primary/20 border border-primary/40"
                      : "bg-secondary/50 border border-secondary/30 cursor-grab"
                  } transition-colors`}
                  whileHover={!isMatched(term, "latin") ? { scale: 1.02 } : {}}
                  whileTap={!isMatched(term, "latin") ? { scale: 0.98 } : {}}
                  draggable={!isMatched(term, "latin")}
                  onDragStart={() => handleDragStart(term, "latin")}
                  onDragEnd={handleDragEnd}
                  ref={draggedItem?.term === term ? dragItemRef : null}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-serif">{term}</span>
                    {isMatched(term, "latin") && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-emerald-500 text-lg"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* English translations column */}
          <div>
            <h3 className="text-center text-lg font-bold mb-4 text-accent">
              English Translations
            </h3>
            <div className="space-y-3">
              {englishTerms.map((term) => (
                <motion.div
                  key={term}
                  className={`p-3 rounded-lg ${
                    isMatched(term, "english")
                      ? "bg-accent/20 border border-accent/40"
                      : "bg-secondary/50 border border-secondary/30 cursor-grab"
                  } transition-colors`}
                  whileHover={!isMatched(term, "english") ? { scale: 1.02 } : {}}
                  whileTap={!isMatched(term, "english") ? { scale: 0.98 } : {}}
                  draggable={!isMatched(term, "english")}
                  onDragStart={() => handleDragStart(term, "english")}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (draggedItem && draggedItem.type !== "english") {
                      e.currentTarget.classList.add("bg-accent/10");
                    }
                  }}
                  onDragLeave={(e) => {
                    if (draggedItem && draggedItem.type !== "english") {
                      e.currentTarget.classList.remove("bg-accent/10");
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("bg-accent/10");
                    handleDrop(term, "english");
                  }}
                  ref={draggedItem?.term === term ? dragItemRef : null}
                >
                  <div className="flex justify-between items-center">
                    <span>{term}</span>
                    {isMatched(term, "english") && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-emerald-500 text-lg"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {Object.keys(matchedPairs).length} of {pairs.length} matched
          </p>
          <div className="w-full h-2 bg-secondary/40 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{
                width: `${(Object.keys(matchedPairs).length / pairs.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {isCompleted && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-bold text-gold mb-4">
              Great job! You've matched all the pairs correctly!
            </p>
            <button
              onClick={onComplete}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg claymorphism"
            >
              Continue
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
