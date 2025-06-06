"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import ProfileCompletion from "../components/Profile/ProfileCompletion"
import "./Profile.css"

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    bio: "",
    education: "",
    skills: [],
    interests: [],
  })
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [loading, setLoading] = useState(false)
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        dateOfBirth: user.dateOfBirth || "",
        bio: user.bio || "",
        education: user.education || "",
        skills: user.skills || [],
        interests: user.interests || [],
      })
    }
  }, [user])

  useEffect(() => {
    calculateCompletion()
  }, [formData])

  const calculateCompletion = () => {
    const fields = [
      { name: "name", weight: 15 },
      { name: "email", weight: 15 },
      { name: "phone", weight: 10 },
      { name: "address", weight: 10 },
      { name: "dateOfBirth", weight: 10 },
      { name: "bio", weight: 10 },
      { name: "education", weight: 15 },
    ]

    let completionScore = 0

    // Calculate completion for text fields
    fields.forEach((field) => {
      if (formData[field.name] && formData[field.name].trim() !== "") {
        completionScore += field.weight
      }
    })

    // Calculate completion for arrays
    if (formData.skills && formData.skills.length > 0) {
      completionScore += 10
    }

    if (formData.interests && formData.interests.length > 0) {
      completionScore += 5
    }

    setCompletion(completionScore)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() !== "" && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addInterest = () => {
    if (newInterest.trim() !== "" && !formData.interests.includes(newInterest.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }))
      setNewInterest("")
    }
  }

  const removeInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateProfile({
        ...formData,
        profileCompletion: completion,
      })
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information and preferences</p>
        </div>
        <ProfileCompletion completion={completion} />
      </div>

      <div className="profile-content">
        <form onSubmit={handleSubmit}>
          <div className="profile-section">
            <h2>Personal Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">
                  Date of Birth <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">
                Address <span className="required">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="profile-section">
            <h2>Education & Background</h2>

            <div className="form-group">
              <label htmlFor="education">
                Education <span className="required">*</span>
              </label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Enter your educational background"
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className="profile-section">
            <h2>Skills & Interests</h2>

            <div className="form-group">
              <label htmlFor="skills">
                Skills <span className="required">*</span>
              </label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <button type="button" onClick={addSkill}>
                  Add
                </button>
              </div>

              <div className="tags-container">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="tag">
                    <span>{skill}</span>
                    <button type="button" onClick={() => removeSkill(skill)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="interests">Interests</label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="interests"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                />
                <button type="button" onClick={addInterest}>
                  Add
                </button>
              </div>

              <div className="tags-container">
                {formData.interests.map((interest, index) => (
                  <div key={index} className="tag">
                    <span>{interest}</span>
                    <button type="button" onClick={() => removeInterest(interest)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  <span>Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
