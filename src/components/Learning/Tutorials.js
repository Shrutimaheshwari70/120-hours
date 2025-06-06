"use client"

import { useState, useEffect } from "react"
import "./Tutorials.css"

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([])
  const [selectedTutorial, setSelectedTutorial] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")

  useEffect(() => {
    // Simulate API call to fetch tutorials
    const fetchTutorials = () => {
      const tutorialData = [
        {
          id: 1,
          title: "HTML Fundamentals",
          description: "Learn the building blocks of web development",
          category: "html",
          difficulty: "Beginner",
          duration: "2 hours",
          lessons: 8,
          completed: false,
          content: `
            <h2>HTML Fundamentals</h2>
            <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p>
            <h3>Basic Structure</h3>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
          `,
        },
        {
          id: 2,
          title: "CSS Grid Layout",
          description: "Master modern CSS Grid layout system",
          category: "css",
          difficulty: "Intermediate",
          duration: "3 hours",
          lessons: 12,
          completed: true,
          content: `
            <h2>CSS Grid Layout</h2>
            <p>CSS Grid Layout is a two-dimensional layout system for the web.</p>
            <h3>Basic Grid</h3>
            <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}</code></pre>
          `,
        },
        {
          id: 3,
          title: "JavaScript ES6+ Features",
          description: "Explore modern JavaScript features",
          category: "javascript",
          difficulty: "Intermediate",
          duration: "4 hours",
          lessons: 15,
          completed: false,
          content: `
            <h2>JavaScript ES6+ Features</h2>
            <p>ES6 introduced many new features to JavaScript.</p>
            <h3>Arrow Functions</h3>
            <pre><code>// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;</code></pre>
          `,
        },
      ]
      setTutorials(tutorialData)
    }

    fetchTutorials()
  }, [])

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "all" || tutorial.category === category
    return matchesSearch && matchesCategory
  })

  const handleTutorialSelect = (tutorial) => {
    setSelectedTutorial(tutorial)
  }

  const markAsCompleted = (tutorialId) => {
    setTutorials((prev) =>
      prev.map((tutorial) => (tutorial.id === tutorialId ? { ...tutorial, completed: true } : tutorial)),
    )
  }

  return (
    <div className="tutorials">
      <div className="tutorials-header">
        <h1>Interactive Tutorials</h1>
        <div className="tutorials-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-filter">
            <option value="all">All Categories</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
      </div>

      <div className="tutorials-content">
        {selectedTutorial ? (
          <TutorialViewer
            tutorial={selectedTutorial}
            onBack={() => setSelectedTutorial(null)}
            onComplete={() => markAsCompleted(selectedTutorial.id)}
          />
        ) : (
          <div className="tutorial-grid">
            {filteredTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} onSelect={() => handleTutorialSelect(tutorial)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const TutorialCard = ({ tutorial, onSelect }) => {
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
    <div className="tutorial-card" onClick={onSelect}>
      <div className="tutorial-header">
        <h3>{tutorial.title}</h3>
        {tutorial.completed && <span className="completed-badge">✓ Completed</span>}
      </div>

      <p className="tutorial-description">{tutorial.description}</p>

      <div className="tutorial-meta">
        <div className="meta-item">
          <span className="meta-label">Category:</span>
          <span className="meta-value">{tutorial.category.toUpperCase()}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Duration:</span>
          <span className="meta-value">{tutorial.duration}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Lessons:</span>
          <span className="meta-value">{tutorial.lessons}</span>
        </div>
      </div>

      <div className="tutorial-footer">
        <span className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(tutorial.difficulty) }}>
          {tutorial.difficulty}
        </span>
        <button className="start-tutorial-btn">{tutorial.completed ? "Review" : "Start Tutorial"}</button>
      </div>
    </div>
  )
}

const TutorialViewer = ({ tutorial, onBack, onComplete }) => {
  return (
    <div className="tutorial-viewer">
      <div className="tutorial-viewer-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Tutorials
        </button>
        <h2>{tutorial.title}</h2>
        <button className="complete-btn" onClick={onComplete}>
          Mark as Complete
        </button>
      </div>

      <div className="tutorial-content">
        <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
      </div>
    </div>
  )
}

export default Tutorials
