
import { useApp } from "@/contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export default function XpToast() {
  const { xpToast } = useApp();
  
  if (!xpToast.show) return null;
  
  return (
    <AnimatePresence>
      {xpToast.show && (
        <motion.div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${xpToast.position.x}%`,
            top: `${xpToast.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1.2, y: 0 }}
          exit={{ opacity: 0, scale: 1, y: -30 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 250,
            damping: 15
          }}
        >
          <div className="px-6 py-3 bg-gold text-gold-foreground font-bold text-2xl rounded-full shadow-[0_0_20px_rgba(255,215,0,0.8)] flex items-center">
            <span className="mr-2">+</span>
            <span>{xpToast.amount}</span>
            <span className="ml-2">XP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
