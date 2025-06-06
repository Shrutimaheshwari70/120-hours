"use client"

import { useState, useEffect } from "react"
import "./Announcements.css"

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // Simulate API call to fetch announcements
    const fetchAnnouncements = () => {
      const announcementData = [
        {
          id: 1,
          title: "New Course: Advanced React Patterns",
          content:
            "We are excited to announce a new advanced React course covering hooks, context, and performance optimization.",
          type: "course",
          priority: "high",
          date: new Date("2024-01-15"),
          author: "Admin",
          read: false,
        },
        {
          id: 2,
          title: "System Maintenance Scheduled",
          content: "The platform will undergo maintenance on January 20th from 2:00 AM to 4:00 AM EST.",
          type: "maintenance",
          priority: "medium",
          date: new Date("2024-01-12"),
          author: "Tech Team",
          read: true,
        },
        {
          id: 3,
          title: "Quiz Competition Winners",
          content:
            "Congratulations to all participants in the JavaScript quiz competition. Winners will be announced soon!",
          type: "event",
          priority: "low",
          date: new Date("2024-01-10"),
          author: "Education Team",
          read: false,
        },
        {
          id: 4,
          title: "New Feature: Progress Tracking",
          content: "We have added a new progress tracking feature to help you monitor your learning journey.",
          type: "feature",
          priority: "medium",
          date: new Date("2024-01-08"),
          author: "Product Team",
          read: true,
        },
      ]
      setAnnouncements(announcementData)
    }

    fetchAnnouncements()
  }, [])

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (filter === "all") return true
    if (filter === "unread") return !announcement.read
    return announcement.type === filter
  })

  const markAsRead = (id) => {
    setAnnouncements((prev) =>
      prev.map((announcement) => (announcement.id === id ? { ...announcement, read: true } : announcement)),
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#F44336"
      case "medium":
        return "#FF9800"
      case "low":
        return "#4CAF50"
      default:
        return "#2196F3"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "course":
        return "📚"
      case "maintenance":
        return "🔧"
      case "event":
        return "🎉"
      case "feature":
        return "✨"
      default:
        return "📢"
    }
  }

  return (
    <div className="announcements">
      <div className="announcements-header">
        <h1>Announcements</h1>
        <div className="announcements-filters">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
            All
          </button>
          <button className={filter === "unread" ? "active" : ""} onClick={() => setFilter("unread")}>
            Unread
          </button>
          <button className={filter === "course" ? "active" : ""} onClick={() => setFilter("course")}>
            Courses
          </button>
          <button className={filter === "event" ? "active" : ""} onClick={() => setFilter("event")}>
            Events
          </button>
          <button className={filter === "maintenance" ? "active" : ""} onClick={() => setFilter("maintenance")}>
            Maintenance
          </button>
        </div>
      </div>

      <div className="announcements-list">
        {filteredAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onMarkAsRead={markAsRead}
            getPriorityColor={getPriorityColor}
            getTypeIcon={getTypeIcon}
          />
        ))}
      </div>
    </div>
  )
}

const AnnouncementCard = ({ announcement, onMarkAsRead, getPriorityColor, getTypeIcon }) => {
  const handleClick = () => {
    if (!announcement.read) {
      onMarkAsRead(announcement.id)
    }
  }

  return (
    <div className={`announcement-card ${announcement.read ? "read" : "unread"}`} onClick={handleClick}>
      <div className="announcement-header">
        <div className="announcement-meta">
          <span className="type-icon">{getTypeIcon(announcement.type)}</span>
          <span className="priority-indicator" style={{ backgroundColor: getPriorityColor(announcement.priority) }} />
          <span className="announcement-type">{announcement.type.toUpperCase()}</span>
        </div>
        <div className="announcement-date">{announcement.date.toLocaleDateString()}</div>
      </div>

      <div className="announcement-content">
        <h3>{announcement.title}</h3>
        <p>{announcement.content}</p>
      </div>

      <div className="announcement-footer">
        <span className="announcement-author">By {announcement.author}</span>
        {!announcement.read && <span className="unread-indicator">New</span>}
      </div>
    </div>
  )
}

export default Announcements
