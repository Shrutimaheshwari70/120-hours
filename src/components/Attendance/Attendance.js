"use client"

import { useState, useEffect } from "react"
import "./Attendance.css"

const Attendance = ({ user }) => {
  const [attendanceData, setAttendanceData] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [stats, setStats] = useState({})

  useEffect(() => {
    generateAttendanceData()
  }, [currentMonth, currentYear])

  const generateAttendanceData = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const data = []

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const isFuture = date > new Date()

      if (!isWeekend && !isFuture) {
        data.push({
          date: day,
          status: Math.random() > 0.2 ? "present" : "absent",
          dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        })
      }
    }

    setAttendanceData(data)

    // Calculate stats
    const presentDays = data.filter((d) => d.status === "present").length
    const totalDays = data.length
    const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0

    setStats({
      presentDays,
      absentDays: totalDays - presentDays,
      totalDays,
      attendanceRate,
    })
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  return (
    <div className="attendance">
      <div className="attendance-header">
        <h1>Attendance Tracking</h1>
        <div className="attendance-stats">
          <div className="stat-card present">
            <span className="stat-value">{stats.presentDays}</span>
            <span className="stat-label">Present</span>
          </div>
          <div className="stat-card absent">
            <span className="stat-value">{stats.absentDays}</span>
            <span className="stat-label">Absent</span>
          </div>
          <div className="stat-card rate">
            <span className="stat-value">{stats.attendanceRate}%</span>
            <span className="stat-label">Attendance Rate</span>
          </div>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          <button className="nav-btn" onClick={() => navigateMonth("prev")}>
            ←
          </button>
          <h2>
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button className="nav-btn" onClick={() => navigateMonth("next")}>
            →
          </button>
        </div>

        <div className="calendar-grid">
          <div className="calendar-days">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
          </div>

          <div className="attendance-grid">
            {attendanceData.map((day) => (
              <div key={day.date} className={`attendance-day ${day.status}`}>
                <span className="day-number">{day.date}</span>
                <span className="day-status">{day.status === "present" ? "✓" : "✗"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="attendance-summary">
        <h3>Monthly Summary</h3>
        <div className="summary-chart">
          <div className="chart-bar">
            <div className="bar-section present" style={{ width: `${stats.attendanceRate}%` }}>
              Present ({stats.attendanceRate}%)
            </div>
            <div className="bar-section absent" style={{ width: `${100 - stats.attendanceRate}%` }}>
              Absent ({100 - stats.attendanceRate}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance
