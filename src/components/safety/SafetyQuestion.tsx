
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SafetyQuestionProps {
  onComplete: () => void;
}

const safetyQuestions = [
  {
    question: "What would you do if you felt unsafe while walking at night?",
    options: [
      "Stay in well-lit areas and call a friend",
      "Take a shortcut through a dark alley",
      "Ignore the feeling and continue as normal",
      "Share your location with a trusted contact"
    ],
    correctIndex: 3
  },
  {
    question: "If you're being followed, what's the best action?",
    options: [
      "Run as fast as you can into an isolated area",
      "Confront the person directly",
      "Enter a public place with other people",
      "Keep walking and ignore it"
    ],
    correctIndex: 2
  },
  {
    question: "What information should you share with strangers online?",
    options: [
      "Your full name and address",
      "Your general location but not specific address",
      "Minimal personal information",
      "Whatever they ask for to be polite"
    ],
    correctIndex: 2
  }
];

const SafetyQuestion: React.FC<SafetyQuestionProps> = ({ onComplete }) => {
  // Randomly select a question
  const [questionIndex] = useState(() => Math.floor(Math.random() * safetyQuestions.length));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const currentQuestion = safetyQuestions[questionIndex];
  
  const handleSubmit = () => {
    if (selectedOption === null) {
      toast({
        title: "Selection required",
        description: "Please select an answer before submitting",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitted(true);
    
    if (selectedOption === currentQuestion.correctIndex) {
      toast({
        title: "Correct!",
        description: "Good job understanding safety protocols"
      });
      
      // Delay to allow user to see feedback
      setTimeout(onComplete, 1500);
    } else {
      toast({
        title: "That's not the safest option",
        description: "Remember to prioritize your safety at all times",
        variant: "destructive"
      });
      
      // Reset after showing feedback
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedOption(null);
      }, 2000);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <Card className="glass-card shadow-lg border-she-pink/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-she-purple">Safety Check</CardTitle>
          <CardDescription>
            Before proceeding, please answer this safety question
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="font-medium text-center">{currentQuestion.question}</p>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`
                  p-3 rounded-md border cursor-pointer transition-all
                  ${selectedOption === index ? 'border-she-purple bg-she-pink/20' : 'border-gray-200 hover:border-she-pink'}
                  ${isSubmitted && index === currentQuestion.correctIndex ? 'bg-green-100 border-green-500' : ''}
                  ${isSubmitted && selectedOption === index && index !== currentQuestion.correctIndex ? 'bg-red-100 border-red-500' : ''}
                `}
                onClick={() => !isSubmitted && setSelectedOption(index)}
              >
                {option}
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitted || selectedOption === null}
            className="w-full bg-she-purple hover:bg-she-purple/90"
          >
            {isSubmitted ? "Processing..." : "Submit Answer"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SafetyQuestion;
