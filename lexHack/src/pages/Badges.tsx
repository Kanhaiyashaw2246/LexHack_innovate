
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Lock } from "lucide-react";
import { mockBadges } from "@/lib/mockData";
import { Badge } from "@/types";

export default function Badges() {
  const { currentUser } = useAuth();

  const renderBadge = (badge: Badge) => {
    const isEarned = currentUser?.badges.some(b => b.id === badge.id);
    
    return (
      <motion.div
        key={badge.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`glassmorphism relative ${!isEarned ? 'opacity-50' : ''}`}>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                isEarned ? 'bg-gold/20' : 'bg-gray-200'
              }`}>
                {isEarned ? (
                  <Award className="w-10 h-10 text-gold" />
                ) : (
                  <Lock className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="font-bold text-lg">{badge.name}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
              {isEarned && (
                <p className="text-xs text-green-600">
                  Earned {new Date(badge.dateEarned).toLocaleDateString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Badges</h1>
          <p className="text-muted-foreground mb-8">
            Earn badges by completing various achievements in your learning journey
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBadges.map(renderBadge)}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
