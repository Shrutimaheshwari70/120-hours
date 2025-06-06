// "use client"

// import { useState, useEffect } from "react"
// import DashboardCard from "./DashboardCard"
// import ScoreChart from "./ScoreChart"
// import "./Dashboard.css"

// const Dashboard = ({ user }) => {
//   const [stats, setStats] = useState({
//     totalScore: 0,
//     questionsAttempted: 0,
//     videosWatched: 0,
//     tutorialsCompleted: 0,
//     quizzesCompleted: 0,
//     attendanceRate: 0,
//     currentStreak: 0,
//     totalStudyTime: 0,
//   })

//   useEffect(() => {
//     // Simulate API call to fetch user stats
//     const fetchStats = () => {
//       setStats({
//         totalScore: user.totalScore || 850,
//         questionsAttempted: user.questionsAttempted || 45,
//         videosWatched: 12,
//         tutorialsCompleted: 8,
//         quizzesCompleted: 15,
//         attendanceRate: 92,
//         currentStreak: 7,
//         totalStudyTime: 24.5,
//       })
//     }

//     fetchStats()
//   }, [user])

//   const dashboardFeatures = [
//     {
//       title: "Total Score",
//       value: stats.totalScore,
//       icon: "🏆",
//       color: "#4CAF50",
//       trend: "+12%",
//     },
//     {
//       title: "Questions Attempted",
//       value: stats.questionsAttempted,
//       icon: "❓",
//       color: "#2196F3",
//       trend: "+5",
//     },
//     {
//       title: "Videos Watched",
//       value: stats.videosWatched,
//       icon: "📹",
//       color: "#FF9800",
//       trend: "+3",
//     },
//     {
//       title: "Tutorials Completed",
//       value: stats.tutorialsCompleted,
//       icon: "📚",
//       color: "#9C27B0",
//       trend: "+2",
//     },
//     {
//       title: "Quizzes Completed",
//       value: stats.quizzesCompleted,
//       icon: "✅",
//       color: "#00BCD4",
//       trend: "+4",
//     },
//     {
//       title: "Attendance Rate",
//       value: `${stats.attendanceRate}%`,
//       icon: "📊",
//       color: "#8BC34A",
//       trend: "+2%",
//     },
//     {
//       title: "Current Streak",
//       value: `${stats.currentStreak} days`,
//       icon: "🔥",
//       color: "#FF5722",
//       trend: "+1",
//     },
//     {
//       title: "Study Time",
//       value: `${stats.totalStudyTime}h`,
//       icon: "⏰",
//       color: "#607D8B",
//       trend: "+2.5h",
//     },
//   ]

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1>Welcome back, {user.name}!</h1>
//         <p>Here's your learning progress overview</p>
//       </div>

//       <div className="dashboard-grid">
//         {dashboardFeatures.map((feature, index) => (
//           <DashboardCard
//             key={index}
//             title={feature.title}
//             value={feature.value}
//             icon={feature.icon}
//             color={feature.color}
//             trend={feature.trend}
//             delay={index * 0.1}
//           />
//         ))}
//       </div>

//       <div className="dashboard-charts">
//         <div className="chart-container">
//           <h3>Score Progress</h3>
//           <ScoreChart />
//         </div>

//         <div className="recent-activity">
//           <h3>Recent Activity</h3>
//           <div className="activity-list">
//             <div className="activity-item">
//               <span className="activity-icon">📹</span>
//               <div className="activity-content">
//                 <p>Completed "React Hooks" video</p>
//                 <span className="activity-time">2 hours ago</span>
//               </div>
//             </div>
//             <div className="activity-item">
//               <span className="activity-icon">✅</span>
//               <div className="activity-content">
//                 <p>Scored 95% in JavaScript Quiz</p>
//                 <span className="activity-time">1 day ago</span>
//               </div>
//             </div>
//             <div className="activity-item">
//               <span className="activity-icon">📚</span>
//               <div className="activity-content">
//                 <p>Finished CSS Grid Tutorial</p>
//                 <span className="activity-time">2 days ago</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard


"use client"

import { useState, useEffect } from "react"
import DashboardCard from "./DashboardCard"
import ScoreChart from "./ScoreChart"
import "./Dashboard.css"

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalScore: 0,
    questionsAttempted: 0,
    videosWatched: 0,
    tutorialsCompleted: 0,
    quizzesCompleted: 0,
    attendanceRate: 0,
    currentStreak: 0,
    totalStudyTime: 0,
  })

  useEffect(() => {
    if (!user) return // Agar user undefined hai toh kuch mat karo

    // Simulate API call to fetch user stats
    const fetchStats = () => {
      setStats({
        totalScore: user.totalScore || 850,
        questionsAttempted: user.questionsAttempted || 45,
        videosWatched: 12,
        tutorialsCompleted: 8,
        quizzesCompleted: 15,
        attendanceRate: 92,
        currentStreak: 7,
        totalStudyTime: 24.5,
      })
    }

    fetchStats()
  }, [user])

  // Agar user prop hi nahi aaya toh loading message dikhao
  if (!user) {
    return (
      <div className="dashboard">
        <p>Loading user info...</p>
      </div>
    )
    
  }
    return <Dashboard user={user} />;

  const dashboardFeatures = [
    {
      title: "Total Score",
      value: stats.totalScore,
      icon: "🏆",
      color: "#4CAF50",
      trend: "+12%",
    },
    {
      title: "Questions Attempted",
      value: stats.questionsAttempted,
      icon: "❓",
      color: "#2196F3",
      trend: "+5",
    },
    {
      title: "Videos Watched",
      value: stats.videosWatched,
      icon: "📹",
      color: "#FF9800",
      trend: "+3",
    },
    {
      title: "Tutorials Completed",
      value: stats.tutorialsCompleted,
      icon: "📚",
      color: "#9C27B0",
      trend: "+2",
    },
    {
      title: "Quizzes Completed",
      value: stats.quizzesCompleted,
      icon: "✅",
      color: "#00BCD4",
      trend: "+4",
    },
    {
      title: "Attendance Rate",
      value: `${stats.attendanceRate}%`,
      icon: "📊",
      color: "#8BC34A",
      trend: "+2%",
    },
    {
      title: "Current Streak",
      value: `${stats.currentStreak} days`,
      icon: "🔥",
      color: "#FF5722",
      trend: "+1",
    },
    {
      title: "Study Time",
      value: `${stats.totalStudyTime}h`,
      icon: "⏰",
      color: "#607D8B",
      trend: "+2.5h",
    },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's your learning progress overview</p>
      </div>

      <div className="dashboard-grid">
        {dashboardFeatures.map((feature, index) => (
          <DashboardCard
            key={index}
            title={feature.title}
            value={feature.value}
            icon={feature.icon}
            color={feature.color}
            trend={feature.trend}
            delay={index * 0.1}
          />
        ))}
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Score Progress</h3>
          <ScoreChart />
        </div>

        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📹</span>
              <div className="activity-content">
                <p>Completed "React Hooks" video</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <div className="activity-content">
                <p>Scored 95% in JavaScript Quiz</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📚</span>
              <div className="activity-content">
                <p>Finished CSS Grid Tutorial</p>
                <span className="activity-time">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
