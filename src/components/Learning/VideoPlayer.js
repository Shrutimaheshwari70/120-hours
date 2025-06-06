"use client"

import { useState, useRef, useEffect } from "react"
import "./VideoPlayer.css"

const VideoPlayer = ({ video, onBack, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime)
      const updateDuration = () => setDuration(video.duration)

      video.addEventListener("timeupdate", updateTime)
      video.addEventListener("loadedmetadata", updateDuration)
      video.addEventListener("ended", handleVideoEnd)

      return () => {
        video.removeEventListener("timeupdate", updateTime)
        video.removeEventListener("loadedmetadata", updateDuration)
        video.removeEventListener("ended", handleVideoEnd)
      }
    }
  }, [])

  const handleVideoEnd = () => {
    setIsPlaying(false)
    onComplete()
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e) => {
    const video = videoRef.current
    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value
    setVolume(newVolume)
    videoRef.current.volume = newVolume
  }

  return (
    <div className="video-player">
      <div className="video-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Videos
        </button>
        <h2>{video.title}</h2>
      </div>

      <div
        className="video-container"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video ref={videoRef} className="video-element" poster={video.thumbnail} onClick={togglePlay}>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {showControls && (
          <div className="video-controls">
            <div className="progress-container">
              <div ref={progressRef} className="progress-bar" onClick={handleProgressClick}>
                <div className="progress-fill" style={{ width: `${(currentTime / duration) * 100}%` }} />
              </div>
            </div>

            <div className="controls-row">
              <div className="left-controls">
                <button className="control-btn" onClick={togglePlay}>
                  {isPlaying ? "⏸️" : "▶️"}
                </button>
                <span className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="right-controls">
                <div className="volume-control">
                  <span>🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="video-info">
        <p>{video.description}</p>
      </div>
    </div>
  )
}

export default VideoPlayer
