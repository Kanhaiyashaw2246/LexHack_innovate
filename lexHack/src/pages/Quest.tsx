import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Bot, User, Trophy, Coins, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BookOpen } from "lucide-react";

type ConversationMessage = {
  role: "user" | "assistant" | "quiz";
  content: string;
};

type Question = {
  type: "mcq" | "translation";
  questionText: string;
  options?: string[];
  correctAnswer: string;
};

export default function LexiQuest() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([
    {
      role: "assistant",
      content: "Welcome to LexiQuest! Master Latin legal maxims with an exciting quiz or ask a question to dive into legal wisdom!"
    }
  ]);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [rewards, setRewards] = useState(0);

  const conversationRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the conversation
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation]);

  // Floating emojis animation
  useEffect(() => {
    const emojis = ["⚖️", "📜", "🔨", "📚", "🖋️"];
    const container = document.createElement("div");
    container.className = "fixed inset-0 pointer-events-none z-0";
    document.body.appendChild(container);

    const createEmoji = () => {
      const emoji = document.createElement("span");
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.className = "absolute text-2xl opacity-20";
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.top = `${Math.random() * 100}vh`;
      container.appendChild(emoji);

      const duration = 5000 + Math.random() * 5000;
      emoji.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 0.2 },
          { transform: "translateY(-20vh) rotate(180deg)", opacity: 0.1 }
        ],
        { duration, iterations: Infinity }
      );
    };

    for (let i = 0; i < 10; i++) createEmoji();
    return () => container.remove();
  }, []);

  const API_KEY = 'AIzaSyAHqaUiP8VnpEatoX2IpWvGJ014h9mUw2o';

  const startQuiz = async () => {
    setQuizMode(true);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setUserAnswers([]);
    setRewards(0);
    setConversation([{ role: "assistant", content: "Starting Maxim Quiz..." }]);
    await generateQuestion(0);
  };

  const generateQuestion = async (index: number) => {
    setIsLoading(true);
    try {
      let apiPrompt: string;
      if (index < 8) {
        apiPrompt = "Generate a multiple-choice question about a Latin legal maxim with a legal scenario. Provide the question, four options (a, b, c, d), and indicate the correct answer. Format as: Question: [question] Options: a) [option1] b) [option2] c) [option3] d) [option4] Correct Answer: [letter]";
      } else {
        apiPrompt = "Provide an English sentence that corresponds to a Latin legal maxim. Specify the correct maxim. Format as: Sentence: [sentence] Maxim: [maxim]";
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: apiPrompt }] }] })
        }
      );

      if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
      const data = await response.json();
      const questionText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!questionText) throw new Error('No question generated');

      let question: Question;
      if (index < 8) {
        const questionMatch = questionText.match(/Question: (.+?)\n/);
        const optionsMatch = questionText.match(/Options:\n(a\) .+?)\n(b\) .+?)\n(c\) .+?)\n(d\) .+?)\n/);
        const correctAnswerMatch = questionText.match(/Correct Answer: ([a-d])/);
        if (!questionMatch || !optionsMatch || !correctAnswerMatch) {
          // Fallback MCQ
          question = {
            type: 'mcq',
            questionText: 'What does *actus reus* refer to?',
            options: ['a) Guilty act', 'b) Guilty mind', 'c) Both', 'd) Neither'],
            correctAnswer: 'a'
          };
        } else {
          question = {
            type: 'mcq',
            questionText: questionMatch[1],
            options: [optionsMatch[1], optionsMatch[2], optionsMatch[3], optionsMatch[4]],
            correctAnswer: correctAnswerMatch[1]
          };
        }
      } else {
        const sentenceMatch = questionText.match(/Sentence: (.+?)\n/);
        const maximMatch = questionText.match(/Maxim: (.+)/);
        if (!sentenceMatch || !maximMatch) {
          // Fallback translation
          question = {
            type: 'translation',
            questionText: 'No one should be a judge in his own case.',
            correctAnswer: 'Nemo iudex in causa sua'
          };
        } else {
          question = {
            type: 'translation',
            questionText: sentenceMatch[1],
            correctAnswer: maximMatch[1]
          };
        }
      }

      setQuestions(prev => [...prev, question]);
      setConversation(prev => [...prev, { role: "quiz", content: `Question ${index + 1}: ${question.questionText}` }]);
    } catch (error) {
      console.error('Error generating question:', error);
      toast({ title: "Error", description: "Failed to generate question. Using fallback.", variant: "destructive" });
      // Fallback question
      const question: Question = index < 8
        ? {
            type: 'mcq',
            questionText: 'What does *mens rea* refer to?',
            options: ['a) Guilty act', 'b) Guilty mind', 'c) Both', 'd) Neither'],
            correctAnswer: 'b'
          }
        : {
            type: 'translation',
            questionText: 'The law does not care for trifles.',
            correctAnswer: 'De minimis non curat lex'
          };
      setQuestions(prev => [...prev, question]);
      setConversation(prev => [...prev, { role: "quiz", content: `Question ${index + 1}: ${question.questionText}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers(prev => [...prev, answer]);
    setConversation(prev => [...prev, { role: "user", content: answer }]);

    const isCorrect = currentQuestion.type === 'mcq'
      ? answer[0] === currentQuestion.correctAnswer
      : answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();

    if (isCorrect) {
      setRewards(prev => prev + 10);
      setConversation(prev => [...prev, {
        role: "assistant",
        content: `Correct! Well done! />`
      }]);
    } else {
      setConversation(prev => [...prev, {
        role: "assistant",
        content: `Incorrect. The correct answer was: ${currentQuestion.correctAnswer}`
      }]);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < 10) {
      setCurrentQuestionIndex(nextIndex);
      await generateQuestion(nextIndex);
    } else {
      await finishQuiz();
    }
  };

  const handleTranslationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await handleAnswer(prompt);
    setPrompt("");
  };

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { role: "user" as const, content: prompt };
    setConversation(prev => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      setConversation(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      toast({ title: "Error", description: "Failed to get response. Please try again.", variant: "destructive" });
      setConversation(prev => [...prev, { role: "assistant", content: "Error fetching response." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const finishQuiz = async () => {
    setIsLoading(true);
    try {
      const feedbackPrompt = `Here is the student's quiz performance:\n${questions
        .map((q, i) => `Question ${i + 1}: ${q.questionText}\nStudent's answer: ${userAnswers[i]}\nCorrect answer: ${q.correctAnswer}\n`)
        .join('\n')}Provide detailed feedback on their performance in plain text, highlighting weak areas and suggesting specific improvements (e.g., focus on specific maxims, translation skills, or scenario analysis).`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: feedbackPrompt }] }] })
        }
      );

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      const feedback = data.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback generated.";
      setConversation(prev => [
        ...prev,
        { role: "assistant", content: `Quiz completed! You scored ${rewards} points.\n\nFeedback:\n${feedback}` }
      ]);
      setQuizMode(false);
      toast({ title: "Quiz Completed", description: `You earned ${rewards} points! Check your feedback below.` });
    } catch (error) {
      console.error('Error generating feedback:', error);
      toast({ title: "Error", description: "Failed to generate feedback.", variant: "destructive" });
      setConversation(prev => [...prev, { role: "assistant", content: `Quiz completed! You scored ${rewards} points. Feedback unavailable due to an error.` }]);
      setQuizMode(false);
    } finally {
      setIsLoading(false);
    }
  };

  const quitQuiz = () => {
    setQuizMode(false);
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setRewards(0);
    setConversation(prev => [...prev, { role: "assistant", content: "Quiz ended. Start a new quiz or ask a question to continue learning!" }]);
  };

  const getTitle = () => {
    if (rewards >= 100) return "Partner";
    if (rewards >= 50) return "Senior Associate";
    return "Junior Lawyer";
  };

  const MessageBubble = ({ role, content }: ConversationMessage) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${role === "user" ? "flex-row-reverse" : ""}`}
    >
      <div className="flex-shrink-0">
        {role === "assistant" && (
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center claymorphic">
            <Bot className="w-6 h-6 text-white" />
          </div>
        )}
        {role === "user" && (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center claymorphic">
            <User className="w-6 h-6 text-white" />
          </div>
        )}
        {role === "quiz" && (
          <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center claymorphic">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      <Card
        className={`max-w-[80%] ${
          role === "quiz" ? "bg-purple-900/80" : role === "assistant" ? "bg-gray-800/80" : "bg-gray-700/80"
        } claymorphic text-white`}
        style={{ borderRadius: "20px" }}
      >
        <CardContent className="p-4">
          <p className={role === "assistant" || role === "quiz" ? "text-base font-medium leading-relaxed" : "text-sm"}>
            {content}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <AppLayout>
      <style>{`
        body { cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><text x='0' y='20' font-size='20'>⚖️</text></svg>"), auto; }
        .claymorphic {
          box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          background: linear-gradient(145deg, #2a1a3a, #1a1a1a);
        }
        .premium-bg {
          background: linear-gradient(to bottom right, #1a1a1a, #2a1a3a);
        }
        button.claymorphic:hover {
          transform: translateY(-2px);
          box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.4), -12px -12px 24px rgba(255, 255, 255, 0.15);
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-4 py-8 relative premium-bg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[calc(100vh-12rem)] flex flex-col"
        >
          <h1 className="text-3xl font-bold mb-2 flex items-center text-white">
            LexiQuest <Trophy className="ml-2 h-6 w-6 text-purple-400" />
          </h1>
          <p className="text-gray-300 mb-4">
            Master Latin legal maxims through an exciting quiz or insightful queries in a legal adventure!
          </p>

          {/* Quiz Controls */}
          <div className="flex gap-2 mb-4">
            <Button
              onClick={startQuiz}
              disabled={quizMode || isLoading}
              className="claymorphic bg-purple-600 hover:bg-purple-700 text-white"
              style={{ borderRadius: "20px" }}
            >
              Start Maxim Quiz
            </Button>
            {quizMode && (
              <Button
                onClick={quitQuiz}
                className="claymorphic bg-gray-600 hover:bg-gray-700 text-white"
                disabled={isLoading}
                style={{ borderRadius: "20px" }}
              >
                Quit Quiz
              </Button>
            )}
          </div>

          {/* Quiz Progress */}
          {quizMode && (
            <Card className="mb-4 claymorphic bg-gradient-to-br from-purple-900/50 to-gray-800/50 text-white" style={{ borderRadius: "20px" }}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Maxim Quiz: {getTitle()}</p>
                  <div className="flex items-center gap-4">
                    <p>Question {currentQuestionIndex + 1} of 10</p>
                    <p className="flex items-center">
                      <Coins className="h-4 w-4 mr-1 text-purple-400" /> {rewards}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Conversation Area */}
          <div
            ref={conversationRef}
            className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-900/50 claymorphic text-white"
            style={{ borderRadius: "20px" }}
          >
            <AnimatePresence>
              {conversation.map((msg, index) => (
                <MessageBubble key={index} role={msg.role} content={msg.content} />
              ))}
            </AnimatePresence>
            {quizMode && currentQuestionIndex < 10 && questions[currentQuestionIndex] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                {questions[currentQuestionIndex].type === "mcq" ? (
                  <div className="space-y-2">
                    {questions[currentQuestionIndex].options!.map((option, idx) => (
                      <Button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        disabled={isLoading}
                        className="w-full claymorphic bg-purple-700 hover:bg-purple-800 text-white"
                        style={{ borderRadius: "20px" }}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleTranslationSubmit} className="flex gap-2">
                    <Input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Type the Latin maxim..."
                      disabled={isLoading}
                      className="flex-1 claymorphic bg-gray-800 text-white placeholder-gray-400 border-none"
                      style={{ borderRadius: "20px" }}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !prompt.trim()}
                      className="claymorphic bg-purple-600 hover:bg-purple-700 text-white"
                      style={{ borderRadius: "20px" }}
                    >
                      <SendHorizontal className="h-5 w-5" />
                      <span className="sr-only">Submit answer</span>
                    </Button>
                  </form>
                )}
              </motion.div>
            )}
            {isLoading && (
              <div className="flex justify-center">
                <span className="text-gray-400">AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Input Form for Non-Quiz Mode */}
          {!quizMode && (
            <form onSubmit={handleAskSubmit} className="flex gap-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask about any Latin legal maxim..."
                disabled={isLoading}
                className="flex-1 claymorphic bg-gray-800 text-white placeholder-gray-400 border-none"
                style={{ borderRadius: "20px" }}
              />
              <Button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="claymorphic bg-purple-600 hover:bg-purple-700 text-white"
                style={{ borderRadius: "20px" }}
              >
                <SendHorizontal className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </AppLayout>
  );
}