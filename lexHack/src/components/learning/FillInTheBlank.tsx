
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

interface FillInTheBlankProps {
  question: string;
  options: string[];
  correctAnswers: string[];
  onComplete?: () => void;
}

export default function FillInTheBlank({
  question,
  options,
  correctAnswers,
  onComplete,
}: FillInTheBlankProps) {
  const { showXpToast } = useApp();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Split question into parts by blank spaces (represented by ____)
  const questionParts = question.split("____");

  // Handle option selection
  const handleOptionClick = (option: string) => {
    if (submitted) return;

    // If option is already selected, remove it
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } 
    // If we can still add more answers (we need as many as there are correct answers)
    else if (selectedOptions.length < correctAnswers.length) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Handle submission
  const handleSubmit = () => {
    if (selectedOptions.length !== correctAnswers.length) return;

    const allCorrect = correctAnswers.every((answer, index) => 
      selectedOptions[index] === answer
    );
    
    setIsCorrect(allCorrect);
    setSubmitted(true);
    
    if (allCorrect) {
      showXpToast(15);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    }
  };

  // Reset the question
  const handleReset = () => {
    setSelectedOptions([]);
    setSubmitted(false);
    setIsCorrect(false);
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
          Fill in the Blank
        </h2>

        <div className="flex justify-center items-center flex-wrap mb-8 text-lg">
          {questionParts.map((part, index) => (
            <div key={index} className="flex items-center">
              <span>{part}</span>
              {index < questionParts.length - 1 && (
                <div className="mx-2 h-8 min-w-[80px] px-2 border-b-2 border-primary inline-flex items-center justify-center">
                  {selectedOptions[index] ? (
                    <span
                      className={`font-bold ${
                        submitted
                          ? selectedOptions[index] === correctAnswers[index]
                            ? "text-green-400"
                            : "text-red-400"
                          : "text-primary"
                      }`}
                    >
                      {selectedOptions[index]}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-opacity-50">____</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {options.map((option) => (
            <motion.button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`p-2 rounded-lg ${
                selectedOptions.includes(option)
                  ? submitted
                    ? correctAnswers.includes(option)
                      ? "bg-green-900/40 border border-green-500/50"
                      : "bg-red-900/40 border border-red-500/50"
                    : "bg-primary/20 border border-primary/40"
                  : "bg-secondary/30 border border-secondary/20 hover:bg-secondary/50"
              } transition-colors`}
              whileHover={!submitted ? { scale: 1.03 } : {}}
              whileTap={!submitted ? { scale: 0.97 } : {}}
              disabled={submitted}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOptions.length !== correctAnswers.length}
              className={`px-6 py-2 rounded-lg claymorphism ${
                selectedOptions.length === correctAnswers.length
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Submit Answer
            </button>
          ) : isCorrect ? (
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg mb-3">Correct!</div>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center justify-center"
                >
                  <div className="rounded-full bg-green-500/20 p-4 inline-block">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-red-400 font-bold text-lg mb-3">Try Again</div>
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-lg claymorphism bg-secondary text-secondary-foreground"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
