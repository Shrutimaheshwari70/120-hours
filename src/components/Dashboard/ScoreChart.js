"use client"

import { useEffect, useRef } from "react"
import "./ScoreChart.css"

const ScoreChart = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Sample data for the chart
    const data = [
      { week: "Week 1", score: 65 },
      { week: "Week 2", score: 72 },
      { week: "Week 3", score: 78 },
      { week: "Week 4", score: 85 },
      { week: "Week 5", score: 82 },
      { week: "Week 6", score: 90 },
      { week: "Week 7", score: 88 },
      { week: "Week 8", score: 95 },
    ]

    const drawChart = () => {
      const width = canvas.width
      const height = canvas.height
      const padding = 40
      const chartWidth = width - 2 * padding
      const chartHeight = height - 2 * padding

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw background
      ctx.fillStyle = "#f8f9fa"
      ctx.fillRect(0, 0, width, height)

      // Draw grid lines
      ctx.strokeStyle = "#e9ecef"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let i = 0; i <= data.length - 1; i++) {
        const x = padding + (chartWidth / (data.length - 1)) * i
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, height - padding)
        ctx.stroke()
      }

      // Draw line chart
      ctx.strokeStyle = "#667eea"
      ctx.lineWidth = 3
      ctx.beginPath()

      data.forEach((point, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = height - padding - (point.score / 100) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Draw data points
      data.forEach((point, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = height - padding - (point.score / 100) * chartHeight

        ctx.fillStyle = "#667eea"
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, 2 * Math.PI)
        ctx.fill()

        // Draw score labels
        ctx.fillStyle = "#333"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.fillText(point.score + "%", x, y - 15)
      })

      // Draw week labels
      ctx.fillStyle = "#666"
      ctx.font = "11px Arial"
      ctx.textAlign = "center"
      data.forEach((point, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        ctx.fillText(point.week, x, height - 10)
      })

      // Draw y-axis labels
      ctx.textAlign = "right"
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i
        const value = 100 - i * 20
        ctx.fillText(value + "%", padding - 10, y + 4)
      }
    }

    // Set canvas size
    canvas.width = 600
    canvas.height = 300

    drawChart()
  }, [])

  return (
    <div className="score-chart">
      <canvas ref={canvasRef} className="chart-canvas"></canvas>
    </div>
  )
}

export default ScoreChart
