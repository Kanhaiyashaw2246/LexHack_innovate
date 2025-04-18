
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AskGemini() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{
    role: "assistant" | "user";
    content: string;
  }>>([
    {
      role: "assistant",
      content: "Hello! I'm here to help you understand Latin legal maxims. What would you like to know?"
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message to conversation
    const userMessage = { role: "user" as const, content: prompt };
    setConversation(prev => [...prev, userMessage]);
    
    // Clear input
    setPrompt("");
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual AI integration)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add AI response
      const aiMessage = {
        role: "assistant" as const,
        content: "This is a simulated response. To make this fully functional, you'll need to integrate with an AI service like Gemini API. For now, I'll help explain Latin legal concepts based on our existing knowledge base."
      };
      
      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const MessageBubble = ({ role, content }: { role: "assistant" | "user", content: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${role === "assistant" ? "" : "flex-row-reverse"}`}
    >
      <div className="flex-shrink-0">
        {role === "assistant" ? (
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-secondary" />
          </div>
        )}
      </div>
      <Card className={`max-w-[80%] ${role === "assistant" ? "bg-primary/10" : "bg-secondary/10"}`}>
        <CardContent className="p-3">
          <p className="text-sm">{content}</p>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[calc(100vh-12rem)] flex flex-col"
        >
          <h1 className="text-3xl font-bold mb-2">Ask Gemini</h1>
          <p className="text-muted-foreground mb-6">
            Get help understanding Latin legal maxims and their applications
          </p>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4">
            {conversation.map((msg, index) => (
              <MessageBubble key={index} role={msg.role} content={msg.content} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about any Latin legal maxim..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !prompt.trim()}>
              <SendHorizontal className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </motion.div>
      </div>
    </AppLayout>
  );
}
