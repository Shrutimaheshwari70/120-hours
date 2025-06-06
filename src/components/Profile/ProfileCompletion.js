import "./ProfileCompletion.css"

const ProfileCompletion = ({ completion }) => {
  const isComplete = completion === 100
  const warningLevel = completion < 50 ? "high" : completion < 80 ? "medium" : "low"

  return (
    <div className="profile-completion">
      <div className="completion-header">
        <div className="completion-icon">
          {isComplete ? (
            <span className="complete-icon">✅</span>
          ) : (
            <span className={`warning-icon ${warningLevel}`}>⚠️</span>
          )}
        </div>
        <div className="completion-text">
          <h4>Profile Completion</h4>
          <p>{completion}% Complete</p>
        </div>
      </div>

      <div className="completion-bar">
        <div
          className="completion-progress"
          style={{
            width: `${completion}%`,
            backgroundColor: isComplete ? "#4CAF50" : completion > 70 ? "#FF9800" : "#F44336",
          }}
        />
      </div>

      {!isComplete && (
        <div className="completion-warning">
          <p>Complete your profile to unlock all features!</p>
          <span className="remaining">{100 - completion}% remaining</span>
        </div>
      )}
    </div>
  )
}

export default ProfileCompletion
