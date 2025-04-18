
import { motion } from "framer-motion";
import { Book, Code, Database, Layout, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Introduction() {
  const sections = [
    {
      title: "Project Overview",
      icon: <Layout className="h-6 w-6 text-gold" />,
      content: "LexiMax is a gamified, Duolingo-style web application designed to teach Latin legal maxims through interactive, bite-sized lessons. Our platform delivers a visually stunning, mobile-first experience with a Gothic aesthetic that makes learning legal principles engaging and memorable."
    },
    {
      title: "Learning Approach",
      icon: <Book className="h-6 w-6 text-gold" />,
      content: "Master Latin legal maxims through flashcards, drag-and-drop exercises, fill-in-the-blank quizzes, and case scenarios. Earn XP, unlock levels, and collect badges while competing on our global leaderboard."
    },
    {
      title: "Technology Stack",
      icon: <Code className="h-6 w-6 text-gold" />,
      content: "Built with React for the frontend, Express.js for the backend, and styled with TailwindCSS. The platform integrates Gemini API to dynamically generate educational content without hardcoded data."
    },
    {
      title: "Data Structure",
      icon: <Database className="h-6 w-6 text-gold" />,
      content: "User profiles store progress data including XP, levels, streaks, and badges. Each Latin maxim includes translation, category, word breakdowns, and associated interactive exercises."
    },
    {
      title: "Gamification System",
      icon: <Award className="h-6 w-6 text-gold" />,
      content: "Progress through 5 levels from Beginner to Juris Master as you earn XP. Maintain daily streaks and earn badges for achievements while competing on the global leaderboard."
    }
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gold">About</span> LexiMax
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Learn Latin legal maxims one word at a time with our gamified learning platform. 
            Master timeless principles that form the foundation of modern legal systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full glassmorphism">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-foreground/80">
                    {section.content}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-xl font-medium">
            Ready to start your journey into Latin legal principles?
          </p>
          <div className="mt-6">
            <a href="/signup" className="px-8 py-3 bg-gold text-gold-foreground rounded-lg claymorphism text-lg font-medium">
              Sign Up Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
