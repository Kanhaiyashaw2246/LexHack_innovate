
import { LearningModule, Activity } from "@/types";

// Mock learning modules for each maxim
export const mockLearningModules: LearningModule[] = [
  {
    id: "module1",
    maximId: "maxim1",
    activities: [
      {
        id: "activity1-1",
        type: "flashcard",
        content: {
          front: "Actus non facit reum nisi mens sit rea",
          back: "The act does not make a person guilty unless the mind is also guilty"
        },
        xpReward: 15,
        completed: false
      },
      {
        id: "activity1-2",
        type: "wordBreakdown",
        content: {
          words: [
            { latin: "actus", english: "act", partOfSpeech: "noun" },
            { latin: "non", english: "not", partOfSpeech: "adverb" },
            { latin: "facit", english: "makes", partOfSpeech: "verb" },
            { latin: "reum", english: "guilty person", partOfSpeech: "noun" },
            { latin: "nisi", english: "unless", partOfSpeech: "conjunction" },
            { latin: "mens", english: "mind", partOfSpeech: "noun" },
            { latin: "sit", english: "is", partOfSpeech: "verb" },
            { latin: "rea", english: "guilty", partOfSpeech: "adjective" }
          ]
        },
        xpReward: 20,
        completed: false
      },
      {
        id: "activity1-3",
        type: "dragAndDrop",
        content: {
          question: "Match each Latin word with its English translation",
          pairs: [
            { latin: "actus", english: "act" },
            { latin: "non", english: "not" },
            { latin: "reum", english: "guilty person" },
            { latin: "mens", english: "mind" }
          ]
        },
        xpReward: 25,
        completed: false
      },
      {
        id: "activity1-4",
        type: "fillInTheBlank",
        content: {
          question: "The act does not make a person ____ unless the ____ is also guilty.",
          options: ["mind", "act", "guilty", "innocent", "law", "crime"],
          correctAnswers: ["guilty", "mind"]
        },
        xpReward: 15,
        completed: false
      },
      {
        id: "activity1-5",
        type: "caseScenario",
        content: {
          scenario: "John accidentally knocked over a vase in a store while browsing, breaking it. He had no intention of damaging any property. Under criminal law, how would this scenario likely be viewed?",
          options: [
            "John is guilty of criminal damage because he broke the vase.",
            "John is not criminally liable because there was no criminal intent (mens rea).",
            "John must pay for the vase but has committed no crime.",
            "John is guilty of trespassing in the store."
          ],
          correctAnswer: 1,
          explanation: "This case demonstrates 'Actus non facit reum nisi mens sit rea' - without criminal intent (mens rea), the act of breaking the vase (actus reus) does not constitute a crime. John may be civilly liable for the damage but lacks the criminal mind required for criminal liability."
        },
        xpReward: 30,
        completed: false
      }
    ],
    totalXp: 105,
    completed: false
  },
  {
    id: "module2",
    maximId: "maxim2",
    activities: [
      {
        id: "activity2-1",
        type: "flashcard",
        content: {
          front: "Ignorantia legis neminem excusat",
          back: "Ignorance of the law excuses no one"
        },
        xpReward: 15,
        completed: false
      },
      {
        id: "activity2-2",
        type: "wordBreakdown",
        content: {
          words: [
            { latin: "ignorantia", english: "ignorance", partOfSpeech: "noun" },
            { latin: "legis", english: "of the law", partOfSpeech: "noun" },
            { latin: "neminem", english: "no one", partOfSpeech: "pronoun" },
            { latin: "excusat", english: "excuses", partOfSpeech: "verb" }
          ]
        },
        xpReward: 20,
        completed: false
      },
      {
        id: "activity2-3",
        type: "dragAndDrop",
        content: {
          question: "Match each Latin word with its English translation",
          pairs: [
            { latin: "ignorantia", english: "ignorance" },
            { latin: "legis", english: "of the law" },
            { latin: "neminem", english: "no one" },
            { latin: "excusat", english: "excuses" }
          ]
        },
        xpReward: 25,
        completed: false
      },
      {
        id: "activity2-4",
        type: "caseScenario",
        content: {
          scenario: "Sarah moves to a new country and continues her hobby of collecting rare plants. She imports a specific plant that is illegal in her new country because it's invasive. When caught, she claims she didn't know it was illegal since it was legal in her home country.",
          options: [
            "Sarah should be excused because she genuinely didn't know the law of the new country.",
            "Sarah is still liable because ignorance of the law is not a valid defense.",
            "Sarah should only be warned since it's her first offense.",
            "Sarah should be deported back to her home country."
          ],
          correctAnswer: 1,
          explanation: "This demonstrates 'Ignorantia legis neminem excusat' - ignorance of the law excuses no one. Even though Sarah didn't know about the law prohibiting the plant, she is still legally responsible for violating it. This principle ensures that people cannot avoid liability simply by claiming they were unaware of the law."
        },
        xpReward: 30,
        completed: false
      }
    ],
    totalXp: 90,
    completed: false
  },
  {
    id: "module3",
    maximId: "maxim3",
    activities: [
      {
        id: "activity3-1",
        type: "flashcard",
        content: {
          front: "Res ipsa loquitur",
          back: "The thing speaks for itself"
        },
        xpReward: 15,
        completed: false
      },
      {
        id: "activity3-2",
        type: "wordBreakdown",
        content: {
          words: [
            { latin: "res", english: "thing", partOfSpeech: "noun" },
            { latin: "ipsa", english: "itself", partOfSpeech: "pronoun" },
            { latin: "loquitur", english: "speaks", partOfSpeech: "verb" }
          ]
        },
        xpReward: 20,
        completed: false
      },
      {
        id: "activity3-3",
        type: "fillInTheBlank",
        content: {
          question: "In tort law, when negligence is obvious from the circumstances, we say ____ ____ ____.",
          options: ["res", "ipsa", "loquitur", "mens", "rea", "actus"],
          correctAnswers: ["res", "ipsa", "loquitur"]
        },
        xpReward: 15,
        completed: false
      },
      {
        id: "activity3-4",
        type: "caseScenario",
        content: {
          scenario: "A patient undergoes surgery and wakes up to find a surgical instrument was left inside their body. In a subsequent medical malpractice lawsuit, how might this principle apply?",
          options: [
            "The patient must prove exactly how the surgeon was negligent.",
            "The surgeon is automatically guilty of intentional harm.",
            "The situation itself (instrument left behind) is sufficient evidence of negligence.",
            "The hospital, not the surgeon, is automatically liable."
          ],
          correctAnswer: 2,
          explanation: "This is a classic example of 'Res ipsa loquitur' - the thing speaks for itself. A surgical instrument left inside a patient's body after surgery is the type of event that wouldn't ordinarily occur without negligence. The circumstances themselves provide sufficient evidence of negligence, shifting the burden of proof to the defendant to show they weren't negligent."
        },
        xpReward: 30,
        completed: false
      }
    ],
    totalXp: 80,
    completed: false
  }
];

export default mockLearningModules;
