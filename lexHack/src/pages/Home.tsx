
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowRight, Award, Globe, BookOpen, Scale } from "lucide-react";
import FloatingEmojis from "@/components/FloatingEmojis";
import Introduction from "@/components/Introduction";

export default function Home() {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      title: "Interactive Learning",
      description: "Study Latin legal maxims through engaging, interactive modules designed for effective retention."
    },
    {
      icon: <Scale className="w-10 h-10 text-primary" />,
      title: "Legal Context",
      description: "Understand how maxims apply in real-world legal scenarios and their historical significance."
    },
    {
      icon: <Award className="w-10 h-10 text-primary" />,
      title: "Gamified Experience",
      description: "Earn XP, unlock levels, and collect badges while mastering essential legal principles."
    },
    {
      icon: <Globe className="w-10 h-10 text-primary" />,
      title: "Global Leaderboard",
      description: "Compete with peers worldwide and track your progress on the leaderboard."
    }
  ];

  return (
    <AppLayout>
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <motion.section 
          className="w-full py-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-gold">Learn Legal Maxims,</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">One Latin Word at a Time</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mt-6 mb-8"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Master the timeless Latin legal principles through our interactive, gamified learning platform.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link 
                to={currentUser ? "/lessons" : "/signup"} 
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg claymorphism text-lg font-medium flex items-center"
              >
                {currentUser ? "Start Learning" : "Sign Up Free"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              {!currentUser && (
                <Link 
                  to="/login" 
                  className="px-8 py-3 border border-primary/50 text-primary rounded-lg hover:bg-primary/10 transition-colors text-lg font-medium"
                >
                  Log In
                </Link>
              )}
            </motion.div>
          </div>
        </motion.section>
        
        {/* Features Section */}
        <section className="w-full py-12 bg-secondary/10 rounded-xl my-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-gold">Why</span> LexiMax?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glassmorphism p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Introduction Section */}
        <Introduction />

        {/* Call to Action */}
        <section className="w-full py-16">
          <motion.div 
            className="max-w-4xl mx-auto text-center px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Latin Legal Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join now and join thousands of students, lawyers, and legal enthusiasts around the world.
            </p>
            <Link 
              to={currentUser ? "/lessons" : "/signup"} 
              className="px-8 py-3 bg-gold text-gold-foreground rounded-lg claymorphism text-lg font-medium inline-flex items-center"
            >
              {currentUser ? "Browse Lessons" : "Get Started Now"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </section>
      </div>
    </AppLayout>
  );
}
