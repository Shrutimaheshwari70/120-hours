"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { mockApi } from "../services/api"
import StatCard from "../components/Dashboard/StatCard"
import ActivityChart from "../components/Dashboard/ActivityChart"
import RecentActivity from "../components/Dashboard/RecentActivity"
import "./Dashboard.css"

const Dashboard = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await mockApi.getCourses()
        setCourses(coursesResponse.data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const stats = [
    {
      id: 1,
      title: "Total Score",
      value: user?.totalScore || 0,
      icon: "fas fa-trophy",
      color: "#4CAF50",
      trend: "+12%",
    },
    {
      id: 2,
      title: "Questions Attempted",
      value: user?.questionsAttempted || 0,
      icon: "fas fa-question-circle",
      color: "#2196F3",
      trend: "+5",
    },
    {
      id: 3,
      title: "Videos Watched",
      value: "12",
      icon: "fas fa-video",
      color: "#FF9800",
      trend: "+3",
    },
    {
      id: 4,
      title: "Tutorials Completed",
      value: "8",
      icon: "fas fa-book",
      color: "#9C27B0",
      trend: "+2",
    },
    {
      id: 5,
      title: "Quizzes Completed",
      value: "15",
      icon: "fas fa-check-circle",
      color: "#00BCD4",
      trend: "+4",
    },
    {
      id: 6,
      title: "Attendance Rate",
      value: "92%",
      icon: "fas fa-calendar-check",
      color: "#8BC34A",
      trend: "+2%",
    },
    {
      id: 7,
      title: "Current Streak",
      value: "7 days",
      icon: "fas fa-fire",
      color: "#FF5722",
      trend: "+1",
    },
    {
      id: 8,
      title: "Study Time",
      value: "24h",
      icon: "fas fa-clock",
      color: "#607D8B",
      trend: "+2.5h",
    },
  ]

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || "Student"}!</h1>
        <p>Here's your learning progress overview</p>
      </div>

      {user?.profileCompletion < 100 && (
        <div className="profile-warning-banner">
          <i className="fas fa-exclamation-triangle"></i>
          <div className="warning-content">
            <h3>Complete Your Profile</h3>
            <p>Your profile is {user?.profileCompletion}% complete. Complete it to unlock all features.</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${user?.profileCompletion}%` }}></div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => (window.location.href = "/profile")}>
            Complete Profile
          </button>
        </div>
      )}

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h2>Learning Progress</h2>
          <ActivityChart />
        </div>

        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <RecentActivity />
        </div>
      </div>

      <div className="course-progress">
        <h2>Course Progress</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <h3>{course.title}</h3>
                <span className={`category-badge ${course.category}`}>{course.category}</span>
              </div>
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${course.progress}%` }}></div>
                </div>
                <span className="progress-text">{course.progress}% Complete</span>
              </div>
              <button className="btn-secondary">Continue Learning</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
