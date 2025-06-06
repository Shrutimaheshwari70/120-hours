"use client"

import { useState, useEffect } from "react"
import { mockApi } from "../services/api"
import VideoPlayer from "../components/Learning/VideoPlayer"
import "./VideoLectures.css"

const VideoLectures = () => {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await mockApi.getVideos()
        setVideos(response.data)
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Mock video data with more details
  const videoData = [
    {
      id: 1,
      title: "HTML Document Structure",
      description: "Learn the basic structure of HTML documents and how to create semantic markup.",
      duration: "10:30",
      category: "html",
      thumbnail: "/placeholder.svg?height=200&width=300",
      videoUrl: "https://example.com/videos/html-structure.mp4",
      watched: true,
      instructor: "John Smith",
      views: 1245,
      rating: 4.8,
    },
    {
      id: 2,
      title: "CSS Flexbox Layout",
      description: "Master the CSS Flexbox layout system for responsive web design.",
      duration: "15:45",
      category: "css",
      thumbnail: "/placeholder.svg?height=200&width=300",
      videoUrl: "https://example.com/videos/css-flexbox.mp4",
      watched: false,
      instructor: "Sarah Johnson",
      views: 982,
      rating: 4.7,
    },
    {
      id: 3,
      title: "JavaScript Functions",
      description: "Understand JavaScript functions, parameters, and return values.",
      duration: "12:20",
      category: "javascript",
      thumbnail: "/placeholder.svg?height=200&width=300",
      videoUrl: "https://example.com/videos/js-functions.mp4",
      watched: false,
      instructor: "Michael Brown",
      views: 1567,
      rating: 4.9,
    },
    {
      id: 4,
      title: "React Hooks",
      description: "Learn how to use React Hooks for state management and side effects.",
      duration: "20:15",
      category: "react",
      thumbnail: "/placeholder.svg?height=200&width=300",
      videoUrl: "https://example.com/videos/react-hooks.mp4",
      watched: false,
      instructor: "Emily Davis",
      views: 2103,
      rating: 4.6,
    },
    {
      id: 5,
      title: "CSS Grid Layout",
      description: "Master CSS Grid for complex two-dimensional layouts.",
      duration: "18:30",
      category: "css",
      thumbnail: "/placeholder.svg?height=200&width=300",
      videoUrl: "https://example.com/videos/css-grid.mp4",
      watched: false,
      instructor: "Sarah Johnson",
      views: 876,
      rating: 4.5,
    },
    {
      id: 6,
      title: "JavaScript ES6 Features",
      description: "Explore modern JavaScript ES6+ features and syntax improvements.",
      duration: "22:10",
      category: "javascript",
      thumbnail: "/placeholder.svg?height=200&width=300",
      videoUrl: "https://example.com/videos/js-es6.mp4",
      watched: false,
      instructor: "Michael Brown",
      views: 1342,
      rating: 4.8,
    },
  ]

  const filteredVideos = videoData.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "all" || video.category === category
    return matchesSearch && matchesCategory
  })

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  const handleVideoComplete = (videoId) => {
    setVideos((prevVideos) => prevVideos.map((video) => (video.id === videoId ? { ...video, watched: true } : video)))
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading videos...</p>
      </div>
    )
  }

  return (
    <div className="video-lectures">
      {selectedVideo ? (
        <VideoPlayer
          video={selectedVideo}
          onBack={() => setSelectedVideo(null)}
          onComplete={() => handleVideoComplete(selectedVideo.id)}
        />
      ) : (
        <>
          <div className="page-header">
            <h1>Video Lectures</h1>
            <p>Enhance your learning with our comprehensive video library</p>
          </div>

          <div className="filters">
            <div className="search-container">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="category-filter">
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
              </select>
            </div>
          </div>

          <div className="videos-grid">
            {filteredVideos.map((video) => (
              <div key={video.id} className="video-card" onClick={() => handleVideoSelect(video)}>
                <div className="video-thumbnail">
                  <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} />
                  <span className="video-duration">{video.duration}</span>
                  {video.watched && (
                    <span className="watched-badge">
                      <i className="fas fa-check"></i>
                    </span>
                  )}
                  <div className="play-overlay">
                    <i className="fas fa-play"></i>
                  </div>
                </div>

                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>

                  <div className="video-meta">
                    <span className="instructor">
                      <i className="fas fa-user"></i> {video.instructor}
                    </span>
                    <span className="views">
                      <i className="fas fa-eye"></i> {video.views}
                    </span>
                    <span className="rating">
                      <i className="fas fa-star"></i> {video.rating}
                    </span>
                  </div>

                  <div className="video-category">
                    <span className={`category-badge ${video.category}`}>{video.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default VideoLectures
