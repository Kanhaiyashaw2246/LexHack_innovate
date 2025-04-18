
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WordBreakdown as WordBreakdownType } from "@/types";

interface WordBreakdownProps {
  words: WordBreakdownType[];
  onComplete?: () => void;
}

export default function WordBreakdown({ words, onComplete }: WordBreakdownProps) {
  const [revealedWords, setRevealedWords] = useState<Record<string, boolean>>({});
  const [allRevealed, setAllRevealed] = useState(false);

  const handleWordClick = (latinWord: string) => {
    const newRevealedWords = { ...revealedWords, [latinWord]: true };
    setRevealedWords(newRevealedWords);
    
    // Check if all words have been revealed
    if (Object.keys(newRevealedWords).length === words.length && !allRevealed) {
      setAllRevealed(true);
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
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
        <h2 className="text-xl font-bold text-center mb-6 text-gold">
          Word Breakdown
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Tap each Latin word to reveal its meaning
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {words.map((word, index) => (
            <motion.div
              key={`${word.latin}-${index}`}
              className={`p-4 rounded-lg ${
                revealedWords[word.latin]
                  ? "bg-primary/20 border border-primary/30"
                  : "bg-secondary/30 border border-secondary/20"
              } cursor-pointer transition-colors`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWordClick(word.latin)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gold">{word.latin}</h3>
                  <AnimatePresence>
                    {revealedWords[word.latin] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-foreground mt-2">{word.english}</p>
                        {word.partOfSpeech && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            {word.partOfSpeech}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {!revealedWords[word.latin] && (
                  <span className="text-xs bg-secondary/50 px-2 py-1 rounded">
                    Tap to reveal
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {allRevealed && (
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleComplete}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg claymorphism"
              >
                Continue
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
