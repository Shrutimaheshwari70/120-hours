"use client"

import { useState, useEffect } from "react"
import "./QuizPlayer.css"

const QuizPlayer = ({ quiz, onComplete, onBack }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Generate sample questions
    const sampleQuestions = generateSampleQuestions(quiz)
    setQuestions(sampleQuestions)
  }, [quiz])

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isSubmitted])

  const generateSampleQuestions = (quiz) => {
    const questions = []
    for (let i = 0; i < quiz.questions; i++) {
      questions.push({
        id: i + 1,
        question: `Sample ${quiz.category} question ${i + 1}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: Math.floor(Math.random() * 4),
      })
    }
    return questions
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleSubmit = () => {
    let correctAnswers = 0
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / questions.length) * 100)
    setScore(finalScore)
    setIsSubmitted(true)
    onComplete(quiz.id, finalScore)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  if (isSubmitted) {
    return (
      <div className="quiz-results">
        <div className="results-header">
          <h2>Quiz Completed!</h2>
          <div className="score-display">
            <span className="score-value">{score}%</span>
            <span className="score-label">Your Score</span>
          </div>
        </div>

        <div className="results-summary">
          <div className="summary-item">
            <span className="summary-label">Correct Answers:</span>
            <span className="summary-value">
              {Math.round((score * questions.length) / 100)} / {questions.length}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Time Taken:</span>
            <span className="summary-value">{formatTime(quiz.timeLimit * 60 - timeLeft)}</span>
          </div>
        </div>

        <div className="results-actions">
          <button className="btn-secondary" onClick={onBack}>
            Back to Quizzes
          </button>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return <div className="loading">Loading quiz...</div>
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="quiz-player">
      <div className="quiz-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Quizzes
        </button>
        <div className="quiz-info">
          <h2>{quiz.title}</h2>
          <div className="quiz-meta">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="time-left">⏰ {formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-container">
        <h3 className="question-text">{currentQ.question}</h3>

        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedAnswers[currentQ.id] === index ? "selected" : ""}`}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button
          className="nav-btn"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length !== questions.length}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            className="nav-btn"
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizPlayer
