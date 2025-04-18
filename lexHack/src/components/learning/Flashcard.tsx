
import { useState } from "react";
import { motion } from "framer-motion";

interface FlashcardProps {
  front: string;
  back: string;
  onComplete?: () => void;
}

export default function Flashcard({ front, back, onComplete }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!hasFlippedOnce && !isFlipped) {
      setHasFlippedOnce(true);
    }
  };

  const handleComplete = () => {
    if (onComplete && hasFlippedOnce) {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <motion.div 
        className="relative w-full h-64 perspective-1000"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-full h-full glassmorphism rounded-xl cursor-pointer transition-transform duration-500"
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          style={{ transformStyle: "preserve-3d" }}
          onClick={handleFlip}
        >
          {/* Front */}
          <div 
            className={`absolute w-full h-full p-6 flex flex-col items-center justify-center backface-hidden rounded-xl ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <h2 className="text-2xl font-bold text-center text-gold mb-4">Latin</h2>
            <p className="text-xl text-center font-serif">{front}</p>
            <p className="text-sm mt-4 text-muted-foreground">Tap to flip</p>
          </div>

          {/* Back */}
          <div 
            className={`absolute w-full h-full p-6 flex flex-col items-center justify-center backface-hidden rounded-xl ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <h2 className="text-2xl font-bold text-center text-accent mb-4">English</h2>
            <p className="text-xl text-center">{back}</p>
            <p className="text-sm mt-4 text-muted-foreground">Tap to flip back</p>
          </div>
        </motion.div>
      </motion.div>

      {hasFlippedOnce && (
        <motion.div 
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <button
            onClick={handleComplete}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg claymorphism"
          >
            I've Got It!
          </button>
        </motion.div>
      )}
    </div>
  );
}
