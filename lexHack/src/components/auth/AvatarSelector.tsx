import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

// Define available avatars with real image paths
const AVATARS = [
  { id: "default-1", src: "/avatars/scholar-1.png" },
  { id: "default-2", src: "/avatars/scholar-2.png" },
  { id: "default-3", src: "/avatars/judge-1.png" },
  { id: "default-4", src: "/avatars/judge-2.png" },
  { id: "default-5", src: "/avatars/lawyer-1.png" },
  { id: "default-6", src: "/avatars/lawyer-2.png" },
];

interface AvatarSelectorProps {
  selectedAvatar: string;
  onSelect: (avatarId: string) => void;
}

export default function AvatarSelector({ selectedAvatar, onSelect }: AvatarSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-2">
      {AVATARS.map((avatar) => (
        <motion.div
          key={avatar.id}
          className="relative flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(avatar.id)}
        >
          <Avatar 
            className={cn(
              "h-16 w-16 border-2", 
              selectedAvatar === avatar.id 
                ? "border-gold ring-2 ring-gold" 
                : "border-transparent hover:border-gold/50"
            )}
          >
            <AvatarImage src={avatar.src} alt="Avatar" />
            <AvatarFallback>{avatar.id.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          {selectedAvatar === avatar.id && (
            <div className="absolute -bottom-1 -right-1 bg-gold text-gold-foreground rounded-full p-1">
              <Check className="h-3 w-3" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
