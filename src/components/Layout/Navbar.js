"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import "./Navbar.css"

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleProfileClick = () => {
    navigate("/profile")
    setDropdownOpen(false)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="navbar-right">
        <div className="nav-item">
          <i className="fas fa-bell"></i>
          <span className="badge">3</span>
        </div>

        <div className="nav-item user-profile" onClick={toggleDropdown}>
          <div className="avatar">{user?.name?.charAt(0).toUpperCase() || "U"}</div>
          <span className="username">{user?.name || "User"}</span>
          <i className={`fas fa-chevron-${dropdownOpen ? "up" : "down"}`}></i>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="avatar">{user?.name?.charAt(0).toUpperCase() || "U"}</div>
                <div className="user-info">
                  <span className="name">{user?.name || "User"}</span>
                  <span className="email">{user?.email || "user@example.com"}</span>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button className="dropdown-item" onClick={handleProfileClick}>
                <i className="fas fa-user"></i>
                <span>My Profile</span>
              </button>

              <button className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
