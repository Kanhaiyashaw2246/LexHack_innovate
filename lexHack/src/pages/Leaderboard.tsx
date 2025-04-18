
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Zap, Medal, UserRound } from "lucide-react";
import { mockUsers } from "@/lib/mockData";

export default function Leaderboard() {
  const { currentUser } = useAuth();
  
  // Sort users by XP in descending order
  const sortedUsers = [...mockUsers].sort((a, b) => b.xp - a.xp);
  
  // Get current user's rank
  const currentUserRank = sortedUsers.findIndex(user => user.id === currentUser?.id) + 1;

  const getTrophyColor = (index: number) => {
    switch(index) {
      case 0: return "text-yellow-400"; // Gold
      case 1: return "text-gray-400"; // Silver
      case 2: return "text-amber-600"; // Bronze
      default: return "text-gray-600";
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
              <p className="text-muted-foreground">
                See how you rank among other Latin legal scholars
              </p>
            </div>
            {currentUser && (
              <Card className="glassmorphism">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Medal className="h-5 w-5 text-primary" />
                    <span>Your Rank: #{currentUserRank}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            {sortedUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`glassmorphism ${user.id === currentUser?.id ? 'border-primary' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8">
                          {index < 3 ? (
                            <Trophy className={`h-6 w-6 ${getTrophyColor(index)}`} />
                          ) : (
                            <span className="text-lg font-semibold text-muted-foreground">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/avatars/${user.avatar}.png`} alt={user.username} />
                          <AvatarFallback><UserRound /></AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user.username}</h3>
                          <p className="text-sm text-muted-foreground">Level {user.level}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-gold" />
                        <span className="font-bold">{user.xp} XP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
