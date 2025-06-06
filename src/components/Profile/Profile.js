"use client"

import { useState, useEffect } from "react"
import ProfileCompletion from "./ProfileCompletion"
import "./Profile.css"

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: "",
    dateOfBirth: "",
    address: "",
    bio: "",
    skills: [],
    avatar: null,
  })

  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    calculateCompletion()
  }, [profileData])

  const calculateCompletion = () => {
    const fields = ["name", "email", "phone", "dateOfBirth", "address", "bio"]
    const filledFields = fields.filter((field) => profileData[field] && profileData[field].trim() !== "")
    const skillsComplete = profileData.skills.length > 0
    const avatarComplete = profileData.avatar !== null

    const totalFields = fields.length + 2 // +2 for skills and avatar
    const completedFields = filledFields.length + (skillsComplete ? 1 : 0) + (avatarComplete ? 1 : 0)

    const completionPercentage = Math.round((completedFields / totalFields) * 100)
    setCompletion(completionPercentage)
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSkillAdd = (skill) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const handleSkillRemove = (skillToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSave = () => {
    // Simulate API call to save profile
    console.log("Saving profile:", profileData)
    alert("Profile saved successfully!")
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <ProfileCompletion completion={completion} />
      </div>

      <div className="profile-content">
        <div className="profile-form">
          <div className="form-section">
            <h3>Personal Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  disabled
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                value={profileData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your address"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Skills & Interests</h3>
            <SkillsManager skills={profileData.skills} onAdd={handleSkillAdd} onRemove={handleSkillRemove} />
          </div>

          <div className="form-actions">
            <button className="save-btn" onClick={handleSave}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const SkillsManager = ({ skills, onAdd, onRemove }) => {
  const [newSkill, setNewSkill] = useState("")

  const handleAdd = () => {
    if (newSkill.trim()) {
      onAdd(newSkill.trim())
      setNewSkill("")
    }
  }

  return (
    <div className="skills-manager">
      <div className="skills-input">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill"
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
        />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
            <button onClick={() => onRemove(skill)}>×</button>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Profile
