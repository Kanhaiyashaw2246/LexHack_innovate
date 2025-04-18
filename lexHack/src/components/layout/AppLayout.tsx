
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";
import FloatingEmojis from "@/components/FloatingEmojis";
import { Book, User, Award, Scroll, LogOut, BarChart3, Home } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { currentUser, logout } = useAuth();
  const { xpProgress } = useApp();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      {/* Floating Emoji Background */}
      <FloatingEmojis />

      {/* Header */}
      <header className="glassmorphism sticky top-0 z-10 p-4 border-b border-border/40">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gold mr-2">⚖️</span>
              <h1 className="text-2xl font-bold tracking-wider">
                <span className="text-gold">Lexi</span>
                <span className="text-foreground">Max</span>
              </h1>
            </Link>
            <p className="hidden md:block ml-4 text-sm text-muted-foreground italic">
              Learn Legal Maxims, One Latin Word at a Time
            </p>
          </div>

          {currentUser ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">{currentUser.username}</p>
                <p className="text-xs text-muted-foreground">Level {currentUser.level}</p>
              </div>
              <div className="relative h-8 w-20 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-primary transition-all duration-1000 ease-out"
                  style={{ width: `${xpProgress.percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {xpProgress.current} / {xpProgress.required} XP
                </div>
              </div>
              <div className="h-10 w-10 rounded-full overflow-hidden border border-gold/50">
                <img 
                  src={currentUser.avatar || "/avatars/avatar1.png"} 
                  alt={currentUser.username} 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      {currentUser && (
        <motion.nav 
          className="md:hidden fixed bottom-0 left-0 right-0 glassmorphism border-t border-border/40 py-2 z-10"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto">
            <ul className="flex items-center justify-around">
              <li>
                <Link 
                  to="/" 
                  className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <Home size={20} />
                  <span className="text-xs mt-1">Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/lessons" 
                  className={`flex flex-col items-center p-2 ${location.pathname.includes('/lessons') ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <Book size={20} />
                  <span className="text-xs mt-1">Lessons</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className={`flex flex-col items-center p-2 ${location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <User size={20} />
                  <span className="text-xs mt-1">Profile</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/leaderboard" 
                  className={`flex flex-col items-center p-2 ${location.pathname === '/leaderboard' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <BarChart3 size={20} />
                  <span className="text-xs mt-1">Ranks</span>
                </Link>
              </li>
            </ul>
          </div>
        </motion.nav>
      )}

      {/* Sidebar Navigation (Desktop) */}
      {currentUser && (
        <motion.aside 
          className="hidden md:block fixed left-0 top-0 bottom-0 w-64 glassmorphism border-r border-border/40 pt-24 pb-8 z-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-gold/50 mb-4">
                <img 
                  src={currentUser.avatar || "/avatars/avatar1.png"} 
                  alt={currentUser.username} 
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-lg font-bold">{currentUser.username}</h2>
              <p className="text-sm text-muted-foreground mb-2">Level {currentUser.level}</p>
              
              <div className="w-full relative h-3 bg-muted rounded-full overflow-hidden mb-1">
                <div 
                  className="absolute h-full bg-primary transition-all duration-1000 ease-out"
                  style={{ width: `${xpProgress.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {xpProgress.current} / {xpProgress.required} XP
              </p>
            </div>
          </div>

          <nav>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center px-4 py-2 ${location.pathname === '/' ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-secondary/50'} transition-colors rounded-r-lg`}
                >
                  <Home size={18} className="mr-3" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/lessons" 
                  className={`flex items-center px-4 py-2 ${location.pathname.includes('/lessons') ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-secondary/50'} transition-colors rounded-r-lg`}
                >
                  <Book size={18} className="mr-3" />
                  <span>Lessons</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className={`flex items-center px-4 py-2 ${location.pathname === '/profile' ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-secondary/50'} transition-colors rounded-r-lg`}
                >
                  <User size={18} className="mr-3" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/badges" 
                  className={`flex items-center px-4 py-2 ${location.pathname === '/badges' ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-secondary/50'} transition-colors rounded-r-lg`}
                >
                  <Award size={18} className="mr-3" />
                  <span>Badges</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/leaderboard" 
                  className={`flex items-center px-4 py-2 ${location.pathname === '/leaderboard' ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-secondary/50'} transition-colors rounded-r-lg`}
                >
                  <BarChart3 size={18} className="mr-3" />
                  <span>Leaderboard</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/ask" 
                  className={`flex items-center px-4 py-2 ${location.pathname === '/ask' ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-secondary/50'} transition-colors rounded-r-lg`}
                >
                  <Scroll size={18} className="mr-3" />
                  <span>Ask Gemini</span>
                </Link>
              </li>
            </ul>

            <div className="px-4 mt-8">
              <button 
                onClick={logout}
                className="flex items-center px-4 py-2 w-full text-destructive hover:bg-destructive/10 transition-colors rounded-lg"
              >
                <LogOut size={18} className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </motion.aside>
      )}
    </div>
  );
}
