"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import "./MainLayout.css"

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={`main-layout ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
