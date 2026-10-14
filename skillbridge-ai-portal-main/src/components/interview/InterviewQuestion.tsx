import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  question: string;
  answer: string;
  number: number;
  onAnswer: (answer: string) => void;
};

export default function InterviewQuestion({
  question,
  number,
  onAnswer,
}: Props) {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      alert("Please enter your answer.");
      return;
    }

    onAnswer(userAnswer);
  };

  return (
    <Card className="p-5">
      <h3 className="font-semibold">
        Question {number}
      </h3>

      <p className="mt-2">{question}</p>

      <Textarea
        className="mt-4"
        placeholder="Type your answer here..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />

      <Button
        className="mt-4"
        onClick={handleSubmit}
      >
        Submit Answer
      </Button>
    </Card>
  );
}