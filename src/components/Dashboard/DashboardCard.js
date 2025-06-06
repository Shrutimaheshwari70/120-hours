import "./DashboardCard.css"

const DashboardCard = ({ title, value, icon, color, trend, delay }) => {
  return (
    <div
      className="dashboard-card"
      style={{
        animationDelay: `${delay}s`,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className="card-header">
        <div className="card-icon" style={{ backgroundColor: `${color}20` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <div className="card-trend" style={{ color }}>
          {trend}
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-value">{value}</h3>
        <p className="card-title">{title}</p>
      </div>

      <div className="card-footer">
        <div className="progress-bar">
          <div className="progress-fill" style={{ backgroundColor: color }}></div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
