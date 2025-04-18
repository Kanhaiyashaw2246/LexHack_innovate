
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

interface CaseScenarioProps {
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onComplete?: () => void;
}

export default function CaseScenario({
  scenario,
  options,
  correctAnswer,
  explanation,
  onComplete,
}: CaseScenarioProps) {
  const { showXpToast } = useApp();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (!submitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    setSubmitted(true);
    
    if (selectedOption === correctAnswer) {
      showXpToast(25);
    }
  };

  const handleContinue = () => {
    if (onComplete) onComplete();
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
          Case Scenario
        </h2>

        <div className="mb-6 p-4 bg-secondary/30 rounded-lg border border-secondary/20">
          <p className="text-foreground">{scenario}</p>
        </div>

        <div className="space-y-3 mb-6">
          {options.map((option, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg border cursor-pointer ${
                selectedOption === index
                  ? submitted
                    ? index === correctAnswer
                      ? "bg-green-900/30 border-green-500/50"
                      : "bg-red-900/30 border-red-500/50"
                    : "bg-primary/20 border-primary/40"
                  : "bg-secondary/20 border-secondary/10 hover:bg-secondary/30"
              } transition-all`}
              whileHover={!submitted ? { scale: 1.01 } : {}}
              whileTap={!submitted ? { scale: 0.99 } : {}}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 rounded-full w-6 h-6 flex items-center justify-center mr-3 ${
                  selectedOption === index
                    ? submitted 
                      ? index === correctAnswer 
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                </div>
                <p className="text-foreground">{option}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {!submitted ? (
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-6 py-2 rounded-lg claymorphism ${
                selectedOption !== null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <div className={`p-4 rounded-lg mb-4 ${
                selectedOption === correctAnswer
                  ? "bg-green-900/20 border border-green-500/30"
                  : "bg-red-900/20 border border-red-500/30"
              }`}>
                <h3 className={`font-bold mb-2 ${
                  selectedOption === correctAnswer
                    ? "text-green-400"
                    : "text-red-400"
                }`}>
                  {selectedOption === correctAnswer ? "Correct!" : "Incorrect"}
                </h3>
                <p className="text-foreground">{explanation}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleContinue}
                  className="px-6 py-2 rounded-lg claymorphism bg-primary text-primary-foreground"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}
