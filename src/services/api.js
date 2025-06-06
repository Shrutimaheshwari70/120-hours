import axios from "axios"

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api.eduplatform.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// For demo purposes, we'll create mock API functions
const mockApi = {
  // Auth endpoints
  login: (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { token: "mock-token", user: { id: 1, email: credentials.email } } })
      }, 1000)
    })
  },

  // User endpoints
  getUserProfile: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: JSON.parse(localStorage.getItem("user")) })
      }, 800)
    })
  },

  updateUserProfile: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data })
      }, 1000)
    })
  },

  // Course endpoints
  getCourses: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 1, title: "HTML Fundamentals", category: "html", progress: 75 },
            { id: 2, title: "CSS Mastery", category: "css", progress: 50 },
            { id: 3, title: "JavaScript Basics", category: "javascript", progress: 30 },
            { id: 4, title: "React Essentials", category: "react", progress: 10 },
          ],
        })
      }, 800)
    })
  },

  // Video endpoints
  getVideos: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 1, title: "HTML Document Structure", duration: "10:30", category: "html", watched: true },
            { id: 2, title: "CSS Flexbox Layout", duration: "15:45", category: "css", watched: false },
            { id: 3, title: "JavaScript Functions", duration: "12:20", category: "javascript", watched: false },
            { id: 4, title: "React Hooks", duration: "20:15", category: "react", watched: false },
          ],
        })
      }, 800)
    })
  },

  // Quiz endpoints
  getQuizzes: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 1, title: "HTML Basics Quiz", questions: 10, completed: true, score: 85 },
            { id: 2, title: "CSS Selectors Quiz", questions: 15, completed: false, score: 0 },
            { id: 3, title: "JavaScript Fundamentals", questions: 20, completed: false, score: 0 },
          ],
        })
      }, 800)
    })
  },

  // Attendance endpoints
  getAttendance: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            present: 18,
            absent: 2,
            dates: [
              { date: "2023-06-01", status: "present" },
              { date: "2023-06-02", status: "present" },
              { date: "2023-06-03", status: "absent" },
              { date: "2023-06-04", status: "present" },
            ],
          },
        })
      }, 800)
    })
  },

  // Announcements endpoints
  getAnnouncements: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              title: "New Course Available",
              content: "Check out our new React Native course!",
              date: "2023-06-01",
              read: false,
            },
            {
              id: 2,
              title: "System Maintenance",
              content: "The platform will be down for maintenance on June 15th.",
              date: "2023-06-02",
              read: true,
            },
            {
              id: 3,
              title: "Quiz Competition",
              content: "Join our monthly quiz competition and win prizes!",
              date: "2023-06-03",
              read: false,
            },
          ],
        })
      }, 800)
    })
  },
}

// Export both real and mock API
export { mockApi }
export default api
