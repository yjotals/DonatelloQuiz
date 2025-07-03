'use client'

import { cn } from '@/lib/utils'
import type { Question } from '@/lib/questions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface QuizCardProps {
  questionData: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
}

export default function QuizCard({ questionData, onAnswer, selectedAnswer }: QuizCardProps) {
  const { question, options, correctAnswer } = questionData

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) {
      return 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
    }

    const isCorrect = option === correctAnswer
    const isSelected = option === selectedAnswer

    if (isCorrect) {
      return 'bg-success hover:bg-success/90 text-success-foreground'
    }
    
    if (isSelected && !isCorrect) {
      return 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
    }

    return 'bg-muted text-muted-foreground opacity-70 cursor-not-allowed'
  }

  return (
    <Card className="shadow-lg animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl leading-relaxed font-body">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option)}
              disabled={!!selectedAnswer}
              className={cn(
                'justify-start text-left text-base h-auto py-3 whitespace-normal transition-all duration-300',
                getButtonClass(option)
              )}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
