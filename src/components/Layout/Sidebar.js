"use client"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import "./Sidebar.css"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth()
  const location = useLocation()

  const menuItems = [
    { path: "/", icon: "fas fa-home", label: "Dashboard" },
    { path: "/profile", icon: "fas fa-user", label: "Profile" },
    { path: "/videos", icon: "fas fa-video", label: "Video Lectures" },
    { path: "/tutorials", icon: "fas fa-book", label: "Tutorials" },
    { path: "/quizzes", icon: "fas fa-question-circle", label: "Quizzes" },
    { path: "/attendance", icon: "fas fa-calendar-check", label: "Attendance" },
    { path: "/announcements", icon: "fas fa-bullhorn", label: "Announcements" },
  ]

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-graduation-cap"></i>
          <h2>EduLearn</h2>
        </div>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="sidebar-content">
        <div className="user-info">
          <div className="avatar">{user?.name?.charAt(0).toUpperCase() || "U"}</div>
          <div className="user-details">
            <h3>{user?.name || "User"}</h3>
            <p>{user?.email || "user@example.com"}</p>

            {user?.profileCompletion < 100 && (
              <div className="profile-completion-warning">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{user?.profileCompletion}% Complete</span>
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
              end={item.path === "/"}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
              {item.path === "/profile" && user?.profileCompletion < 100 && (
                <i className="fas fa-exclamation-circle warning-icon"></i>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <p>© 2023 EduLearn</p>
      </div>
    </div>
  )
}

export default Sidebar
