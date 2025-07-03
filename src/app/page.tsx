
'use client'

import { useState } from 'react'
import type { Question } from '@/lib/types'
import QuizCard from '@/components/quiz-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { generateQuiz } from '@/ai/flows/generate-quiz-flow'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type GameState = 'not_started' | 'loading' | 'playing' | 'finished'

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [gameState, setGameState] = useState<GameState>('not_started')
  const { toast } = useToast()

  const currentQuestion = gameState === 'playing' ? questions[currentQuestionIndex] : null

  const startGame = async () => {
    setGameState('loading')
    try {
      const { questions: newQuestions } = await generateQuiz({ topic: 'Donatello', count: 12 })
      setQuestions(newQuestions)
      setCurrentQuestionIndex(0)
      setScore(0)
      setSelectedAnswer(null)
      setGameState('playing')
    } catch (error) {
      console.error("Failed to generate quiz:", error)
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar o quiz',
        description: 'Não foi possível criar as perguntas. Por favor, tente novamente.',
      })
      setGameState('not_started')
    }
  }

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || !currentQuestion) return
    
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
        setGameState('finished')
      }
    }, 2000)
  }

  const handlePlayAgain = () => {
    startGame()
  }

  const handleGoHome = () => {
    setGameState('not_started')
    setQuestions([])
    setCurrentQuestionIndex(0)
    setScore(0)
  }

  if (gameState === 'not_started' || gameState === 'loading') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 md:p-12">
        <div className="text-center">
            <h1 className="font-headline text-5xl md:text-6xl font-bold text-accent">Donatello Quiz</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">Teste seus conhecimentos sobre o mestre renascentista.</p>
        </div>

        <Card className="w-full max-w-md mt-8 text-center shadow-2xl">
          <CardContent className="p-6">
            <Button onClick={startGame} disabled={gameState === 'loading'} className="w-full" size="lg">
              {gameState === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Gerando Quiz...
                </>
              ) : (
                'Começar o Jogo'
              )}
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (gameState === 'finished') {
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
            <div className="mt-8 flex flex-col gap-4">
              <Button onClick={handlePlayAgain} className="w-full" size="lg">
                Jogar Novamente
              </Button>
              <Button onClick={handleGoHome} variant="outline" className="w-full" size="lg">
                Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }
  
  if (gameState === 'playing' && currentQuestion) {
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

  // Fallback for unexpected states
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-xl">Ocorreu um erro.</h1>
      <Button onClick={handleGoHome} className="mt-4">Voltar ao Início</Button>
    </main>
  );
}
