"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          // Simulate API call to validate token
          const userData = JSON.parse(localStorage.getItem("user"))
          if (userData) {
            setUser(userData)
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would be an API call
      // const response = await api.post('/auth/login', { email, password });

      // For demo purposes, we'll create a mock user
      const userData = {
        id: "123456",
        email: email,
        name: email.split("@")[0],
        profileCompletion: 60,
        totalScore: 850,
        questionsAttempted: 45,
        attendance: {
          present: 18,
          absent: 2,
        },
        role: "student",
      }

      // Store token and user data
      const mockToken = "mock-jwt-token-" + Math.random()
      localStorage.setItem("token", mockToken)
      localStorage.setItem("user", JSON.stringify(userData))

      setUser(userData)
      toast.success("Login successful!")
      navigate("/")
      return true
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed. Please check your credentials.")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
    toast.info("You have been logged out")
  }

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would be an API call
      // const response = await api.put('/users/profile', profileData);

      // Update local user data
      const updatedUser = { ...user, ...profileData }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      toast.success("Profile updated successfully!")
      return true
    } catch (error) {
      console.error("Profile update error:", error)
      toast.error("Failed to update profile")
      return false
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
