
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { UserRound, Calendar, Award, Zap, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export default function Profile() {
  const { currentUser } = useAuth();
  const { xpProgress } = useApp();
  
  if (!currentUser) return null;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`/avatars/${currentUser.avatar}.png`} alt={currentUser.username} />
              <AvatarFallback>
                <UserRound className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{currentUser.username}</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Joined {formatDistanceToNow(new Date(currentUser.joinDate), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glassmorphism">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-gold" />
                  Level {currentUser.level}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{xpProgress.current} XP</span>
                    <span>{xpProgress.required} XP</span>
                  </div>
                  <Progress value={xpProgress.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-gold" />
                  Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{currentUser.streakDays} Days 🔥</p>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-gold" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{currentUser.badges.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Badges Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Badges Earned</h2>
            {currentUser.badges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {currentUser.badges.map((badge) => (
                  <Card key={badge.id} className="glassmorphism">
                    <CardContent className="p-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gold/20 flex items-center justify-center">
                        <Award className="h-8 w-8 text-gold" />
                      </div>
                      <h3 className="font-bold mb-1">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glassmorphism p-8 text-center">
                <p className="text-muted-foreground">
                  Complete lessons and earn badges to display them here!
                </p>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
