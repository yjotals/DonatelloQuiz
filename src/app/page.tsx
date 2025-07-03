'use client'

import { useState } from 'react'
import { questions } from '@/lib/questions'
import QuizCard from '@/components/quiz-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isFinished, setIsFinished] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return
    
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.correctAnswer
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
      } else {
        setIsFinished(true)
      }
    }, 2000)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsFinished(false)
  }

  if (isFinished) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 md:p-12">
        <div className="text-center">
            <h1 className="font-headline text-5xl md:text-6xl font-bold text-accent">Parabéns!</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">Você concluiu o quiz.</p>
        </div>

        <Card className="w-full max-w-md mt-8 text-center shadow-2xl">
          <CardHeader>
            <CardDescription className="pt-2 text-lg">
              Sua pontuação final é:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-6xl font-bold font-headline text-primary">{score} <span className="text-4xl text-muted-foreground">/ {questions.length}</span></p>
            <Button onClick={handleRestart} className="mt-8 w-full" size="lg">
              Jogar Novamente
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">Donatello Quiz</h1>
          <p className="mt-2 text-lg text-muted-foreground">Teste seus conhecimentos sobre o mestre renascentista.</p>
        </header>
        
        <div className="mb-4 flex justify-between items-center text-lg font-semibold">
          <span className="font-headline">Questão {currentQuestionIndex + 1} de {questions.length}</span>
          <span className="font-headline text-primary">Pontuação: {score}</span>
        </div>

        <QuizCard 
          questionData={currentQuestion}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
        />
      </div>
    </main>
  )
}
