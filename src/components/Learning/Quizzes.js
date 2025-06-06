"use client"

import { useState, useEffect } from "react"
import QuizPlayer from "./QuizPlayer"
import "./Quizzes.css"

const Quizzes = ({ user }) => {
  const [quizzes, setQuizzes] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [userStats, setUserStats] = useState({})

  useEffect(() => {
    // Simulate API call to fetch quizzes
    const fetchQuizzes = () => {
      const quizData = [
        {
          id: 1,
          title: "HTML Basics Quiz",
          description: "Test your knowledge of HTML fundamentals",
          questions: 10,
          timeLimit: 15,
          difficulty: "Beginner",
          category: "HTML",
          attempts: 0,
          bestScore: 0,
        },
        {
          id: 2,
          title: "CSS Styling Challenge",
          description: "Advanced CSS concepts and techniques",
          questions: 15,
          timeLimit: 20,
          difficulty: "Intermediate",
          category: "CSS",
          attempts: 2,
          bestScore: 85,
        },
        {
          id: 3,
          title: "JavaScript Fundamentals",
          description: "Core JavaScript programming concepts",
          questions: 20,
          timeLimit: 25,
          difficulty: "Intermediate",
          category: "JavaScript",
          attempts: 1,
          bestScore: 92,
        },
      ]
      setQuizzes(quizData)
    }

    fetchQuizzes()
  }, [])

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz)
  }

  const handleQuizComplete = (quizId, score) => {
    setQuizzes((prev) =>
      prev.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              attempts: quiz.attempts + 1,
              bestScore: Math.max(quiz.bestScore, score),
            }
          : quiz,
      ),
    )
    setSelectedQuiz(null)
  }

  return (
    <div className="quizzes">
      <div className="quizzes-header">
        <h1>Quizzes & Assessments</h1>
        <div className="quiz-stats">
          <div className="stat-card">
            <span className="stat-value">{quizzes.reduce((sum, quiz) => sum + quiz.attempts, 0)}</span>
            <span className="stat-label">Total Attempts</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {Math.round(quizzes.reduce((sum, quiz) => sum + quiz.bestScore, 0) / quizzes.length) || 0}%
            </span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
      </div>

      <div className="quizzes-content">
        {selectedQuiz ? (
          <QuizPlayer quiz={selectedQuiz} onComplete={handleQuizComplete} onBack={() => setSelectedQuiz(null)} />
        ) : (
          <div className="quiz-grid">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onSelect={() => handleQuizSelect(quiz)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const QuizCard = ({ quiz, onSelect }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "#4CAF50"
      case "Intermediate":
        return "#FF9800"
      case "Advanced":
        return "#F44336"
      default:
        return "#2196F3"
    }
  }

  return (
    <div className="quiz-card" onClick={onSelect}>
      <div className="quiz-header">
        <h3>{quiz.title}</h3>
        <span className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(quiz.difficulty) }}>
          {quiz.difficulty}
        </span>
      </div>

      <p className="quiz-description">{quiz.description}</p>

      <div className="quiz-meta">
        <div className="meta-item">
          <span className="meta-label">Questions:</span>
          <span className="meta-value">{quiz.questions}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Time:</span>
          <span className="meta-value">{quiz.timeLimit} min</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Category:</span>
          <span className="meta-value">{quiz.category}</span>
        </div>
      </div>

      <div className="quiz-stats">
        <div className="stat">
          <span className="stat-label">Attempts:</span>
          <span className="stat-value">{quiz.attempts}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Best Score:</span>
          <span className="stat-value">{quiz.bestScore}%</span>
        </div>
      </div>

      <button className="start-quiz-btn">{quiz.attempts > 0 ? "Retake Quiz" : "Start Quiz"}</button>
    </div>
  )
}

export default Quizzes
