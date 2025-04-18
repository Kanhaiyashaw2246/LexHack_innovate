
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Law-themed emojis
const emojis = ["⚖️", "📜", "📚", "👨‍⚖️", "🏛️", "💼"];

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  direction: "normal" | "reverse";
  rotation: number;
}

export default function FloatingEmojis() {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    // Create floating emojis based on screen size
    const emojiCount = Math.min(15, Math.max(8, Math.floor(window.innerWidth / 150)));
    const newEmojis: FloatingEmoji[] = [];

    for (let i = 0; i < emojiCount; i++) {
      newEmojis.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100, // random position across screen width (%)
        y: Math.random() * 100, // random position across screen height (%)
        size: 20 + Math.random() * 30, // size between 20-50px
        duration: 6 + Math.random() * 10, // animation duration between 6-16s
        delay: Math.random() * -20, // random start delay
        direction: Math.random() > 0.5 ? "normal" : "reverse",
        rotation: Math.random() * 360, // random rotation
      });
    }

    setFloatingEmojis(newEmojis);
  }, []);

  // Resize handler to adjust emoji count on window resize
  useEffect(() => {
    const handleResize = () => {
      const emojiCount = Math.min(15, Math.max(8, Math.floor(window.innerWidth / 150)));
      
      setFloatingEmojis(prev => {
        // If we need more emojis
        if (emojiCount > prev.length) {
          const newEmojis = [...prev];
          for (let i = prev.length; i < emojiCount; i++) {
            newEmojis.push({
              id: i,
              emoji: emojis[Math.floor(Math.random() * emojis.length)],
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: 20 + Math.random() * 30,
              duration: 6 + Math.random() * 10,
              delay: Math.random() * -20,
              direction: Math.random() > 0.5 ? "normal" : "reverse",
              rotation: Math.random() * 360,
            });
          }
          return newEmojis;
        }
        // If we need fewer emojis
        if (emojiCount < prev.length) {
          return prev.slice(0, emojiCount);
        }
        return prev;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {floatingEmojis.map((item) => (
        <motion.div
          key={item.id}
          className="floating-emoji"
          initial={{
            x: `${item.x}vw`,
            y: `${item.y}vh`,
            rotate: item.rotation,
          }}
          animate={{
            y: item.direction === "normal" ? [`${item.y}vh`, `${item.y - 20}vh`, `${item.y}vh`] : [`${item.y}vh`, `${item.y + 20}vh`, `${item.y}vh`],
            rotate: item.rotation + 360,
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: item.duration,
              ease: "easeInOut",
              delay: item.delay,
            },
            rotate: {
              repeat: Infinity,
              duration: item.duration * 3,
              ease: "linear",
              delay: item.delay,
            },
          }}
          style={{
            fontSize: `${item.size}px`,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
