import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

// Auth Components
import Login from "./components/Auth/Login"
import ProtectedRoute from "./components/Auth/ProtectedRoute"

// Layout Components
import MainLayout from "./components/Layout/MainLayout"

// Pages
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import VideoLectures from "./pages/VideoLectures"
import Tutorials from "./pages/Tutorials"
import Quizzes from "./pages/Quizzes"
import Attendance from "./pages/Attendance"
import Announcements from "./pages/Announcements"

// Context
import { AuthProvider } from "./context/AuthContext"
import { LoadingProvider } from "./context/LoadingContext"

function App() {
  return (
    <Router>
      <AuthProvider>
        <LoadingProvider>
          <div className="app">
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="videos" element={<VideoLectures />} />
                <Route path="tutorials" element={<Tutorials />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="announcements" element={<Announcements />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </LoadingProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
