"use client"

import { useState, useEffect } from "react"
import VideoPlayer from "./VideoPlayer"
import "./VideoLectures.css"

const VideoLectures = () => {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")

  useEffect(() => {
    // Simulate API call to fetch videos
    const fetchVideos = () => {
      const videoData = [
        {
          id: 1,
          title: "Introduction to HTML",
          description: "Learn the basics of HTML structure and elements",
          duration: "15:30",
          category: "html",
          thumbnail: "/placeholder.svg?height=200&width=300",
          videoUrl: "https://example.com/video1.mp4",
          watched: false,
        },
        {
          id: 2,
          title: "CSS Flexbox Mastery",
          description: "Master CSS Flexbox layout system",
          duration: "22:45",
          category: "css",
          thumbnail: "/placeholder.svg?height=200&width=300",
          videoUrl: "https://example.com/video2.mp4",
          watched: true,
        },
        {
          id: 3,
          title: "JavaScript ES6 Features",
          description: "Explore modern JavaScript ES6+ features",
          duration: "28:15",
          category: "javascript",
          thumbnail: "/placeholder.svg?height=200&width=300",
          videoUrl: "https://example.com/video3.mp4",
          watched: false,
        },
        {
          id: 4,
          title: "React Hooks Deep Dive",
          description: "Understanding React Hooks in detail",
          duration: "35:20",
          category: "react",
          thumbnail: "/placeholder.svg?height=200&width=300",
          videoUrl: "https://example.com/video4.mp4",
          watched: false,
        },
      ]
      setVideos(videoData)
    }

    fetchVideos()
  }, [])

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "all" || video.category === category
    return matchesSearch && matchesCategory
  })

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  const markAsWatched = (videoId) => {
    setVideos((prev) => prev.map((video) => (video.id === videoId ? { ...video, watched: true } : video)))
  }

  return (
    <div className="video-lectures">
      <div className="lectures-header">
        <h1>Video Lectures</h1>
        <div className="lectures-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-filter">
            <option value="all">All Categories</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
          </select>
        </div>
      </div>

      <div className="lectures-content">
        {selectedVideo ? (
          <VideoPlayer
            video={selectedVideo}
            onBack={() => setSelectedVideo(null)}
            onComplete={() => markAsWatched(selectedVideo.id)}
          />
        ) : (
          <div className="video-grid">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} onSelect={() => handleVideoSelect(video)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const VideoCard = ({ video, onSelect }) => {
  return (
    <div className="video-card" onClick={onSelect}>
      <div className="video-thumbnail">
        <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} />
        <div className="video-duration">{video.duration}</div>
        {video.watched && <div className="watched-badge">✓</div>}
        <div className="play-overlay">
          <div className="play-button">▶</div>
        </div>
      </div>
      <div className="video-info">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <div className="video-meta">
          <span className="category">{video.category.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}

export default VideoLectures
