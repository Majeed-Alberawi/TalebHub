import React, { useState, useEffect } from "react";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCalendarAlt,
  faTrophy,
  faFire,
  faStar,
  faBookmark,
  faGraduationCap,
  faCertificate,
  faProjectDiagram,
  faEdit,
  faShare,
  faDownload,
  faUser,
  faTimes,
  faSave,
  faCamera,
  faHouseChimneyUser,
  // faBell
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faGithub,
  faInstagram,
  faDribbble,
} from "@fortawesome/free-brands-svg-icons";

import avatar from "../../assets/avatar.svg"; // Placeholder avatar image
import { Link } from "react-router-dom";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [user, setUser] = useState({
    name: "Aisha Al-Mutairi",
    title: "Dental Student | Future Oral Surgeon",
    bio: "Dedicated dental student passionate about oral health, patient care, and advanced dental techniques. Interested in oral surgery, orthodontics, and preventive dentistry. Actively building clinical skills and participating in dental research projects.",
    avatar: avatar, // replace with actual dental student avatar
    email: "aisha.almutairi@dentalgenius.edu",
    phone: "+962 777 123 456",
    location: "Amman, Jordan",
    joinDate: "October 2023",
    level: "Intermediate",
    experience: "2nd Year Student",
    completionRate: 87,
    socialLinks: {
      facebook: "https://facebook.com/aisha.dental",
      twitter: "https://twitter.com/aisha_dental",
      linkedin: "https://linkedin.com/in/aisha-dental",
      github: "",
      instagram: "https://instagram.com/aisha.dental.life",
      dribbble: "",
    },
    stats: {
      coursesCompleted: 12,
      certificates: 4,
      projects: 6,
      points: 1520,
      streak: 8,
      rank: "Scholar",
    },
    skills: [
      { name: "Dental Anatomy", level: 90, category: "theory" },
      { name: "Oral Radiology", level: 75, category: "clinical" },
      { name: "Prosthodontics", level: 70, category: "clinical" },
      { name: "Orthodontics Basics", level: 65, category: "theory" },
      { name: "Patient Care", level: 85, category: "clinical" },
      { name: "Research Writing", level: 80, category: "academic" },
    ],
    achievements: [
      {
        id: 1,
        name: "Top Anatomy Student",
        description: "Scored highest in dental anatomy course",
        icon: faTrophy,
        earned: true,
        rarity: "gold",
      },
      {
        id: 2,
        name: "Community Service",
        description: "Participated in free dental care camp",
        icon: faStar,
        earned: true,
        rarity: "silver",
      },
      {
        id: 3,
        name: "Clinical Beginner",
        description: "Completed first patient examination",
        icon: faCertificate,
        earned: true,
        rarity: "bronze",
      },
      {
        id: 4,
        name: "Research Assistant",
        description: "Contributed to dental materials research project",
        icon: faBookmark,
        earned: false,
        rarity: "bronze",
      },
    ],
  });

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    github: "",
    instagram: "",
    dribbble: "",
  });

  const recentActivity = [
    {
      id: 1,
      type: "course_completed",
      title: "Dental Anatomy & Physiology",
      description:
        "Completed comprehensive study of human dental anatomy and oral structures",
      date: "2 hours ago",
      points: 120,
      icon: faGraduationCap,
      color: "primary",
    },
    {
      id: 2,
      type: "certificate_earned",
      title: "Oral Radiology Basics",
      description:
        "Earned certification in interpreting dental X-rays and radiographic techniques",
      date: "1 day ago",
      points: 200,
      icon: faCertificate,
      color: "success",
    },
    {
      id: 3,
      type: "project_submitted",
      title: "Community Dental Awareness Project",
      description:
        "Organized and submitted a project on oral hygiene awareness in schools",
      date: "3 days ago",
      points: 180,
      icon: faProjectDiagram,
      color: "warning",
    },
  ];

  const handleEditProfile = () => {
    setFormData({
      name: user.name,
      title: user.title,
      bio: user.bio,
      email: user.email,
      phone: user.phone,
      location: user.location,
      facebook: user.socialLinks.facebook,
      twitter: user.socialLinks.twitter,
      linkedin: user.socialLinks.linkedin,
      github: user.socialLinks.github,
      instagram: user.socialLinks.instagram,
      dribbble: user.socialLinks.dribbble,
    });
    setShowEditForm(true);
  };

  const handleFormCancel = () => {
    setShowEditForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user data
      setUser((prev) => ({
        ...prev,
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        socialLinks: {
          facebook: formData.facebook,
          twitter: formData.twitter,
          linkedin: formData.linkedin,
          github: formData.github,
          instagram: formData.instagram,
          dribbble: formData.dribbble,
        },
      }));

      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`profile-page ${isVisible ? "visible" : ""}`}>
      <div className="container">
        {/* Enhanced Header with Cover Image */}
        <div className="profile-hero">
          <div className="cover-image">
            {/* <img src={user.coverImage} alt="Cover" /> */}
            {/* <div className="cover-overlay"></div> */}
            <div className="hero-actions">
              <Link to="/student/overview" className="action-btn primary">
                <FontAwesomeIcon icon={faHouseChimneyUser} />
                &nbsp; go to dashboard
              </Link>
              <button
                className="action-btn primary"
                onClick={handleEditProfile}
              >
                <FontAwesomeIcon icon={faEdit} />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img src={user.avatar} alt={user.name} />
                {/* <div className="status-ring"></div>
                <div className="level-badge">{user.stats.rank}</div> */}
              </div>

              <div className="profile-main-info">
                <h1 className="profile-name">{user.name}</h1>
                <p className="profile-title">{user.title}</p>
                <div className="profile-meta">
                  <span className="meta-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {user.location}
                  </span>
                  <span className="meta-item">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    Member since {user.joinDate}
                  </span>
                  <span className="meta-item level-indicator">
                    Level: {user.level} ({user.experience})
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="profile-stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">
                    {user.stats.coursesCompleted}
                  </span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="stat-trend positive">+5 this month</div>
              </div>

              {/* <div className="stat-card success">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faCertificate} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{user.stats.certificates}</span>
                  <span className="stat-label">Certificates</span>
                </div>
                <div className="stat-trend positive">+2 this month</div>
              </div>

              <div className="stat-card warning">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faProjectDiagram} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">{user.stats.projects}</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-trend positive">+3 this month</div>
              </div>

              <div className="stat-card info">
                <div className="stat-icon">
                  <FontAwesomeIcon icon={faTrophy} />
                </div>
                <div className="stat-content">
                  <span className="stat-number">
                    {user.stats.points.toLocaleString()}
                  </span>
                  <span className="stat-label">Points</span>
                </div>
                <div className="stat-trend positive">+240 this week</div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="profile-navigation">
          <div className="nav-tabs">
            {["overview", "activity"].map((tab) => (
              <button
                key={tab}
                className={`nav-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="profile-completion">
            <span className="completion-label">Profile Complete</span>
            <div className="completion-bar">
              <div
                className="completion-fill"
                style={{ width: `${user.completionRate}%` }}
              ></div>
            </div>
            <span className="completion-percentage">
              {user.completionRate}%
            </span>
          </div>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {activeTab === "overview" && (
            <div className="content-grid overview-grid">
              {/* About Section */}
              <div className="content-card about-card">
                <div className="card-header">
                  <h2>About Me</h2>
                  <button className="edit-btn" onClick={handleEditProfile}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
                <p className="bio-text">{user.bio}</p>

                <div className="contact-grid">
                  <div className="contact-item">
                    <div className="contact-icon email">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-label">Email</span>
                      <a
                        href={`mailto:${user.email}`}
                        className="contact-value"
                      >
                        {user.email}
                      </a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon phone">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div className="contact-details">
                      <span className="contact-label">Phone</span>
                      <a href={`tel:${user.phone}`} className="contact-value">
                        {user.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Connections */}
              {/* <div className="content-card social-card">
                <div className="card-header">
                  <h2>Connect With Me</h2>
                  <div className="social-stats">6 platforms</div>
                </div>
                <div className="social-grid">
                  {Object.entries(user.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-link ${platform}`}
                    >
                      <FontAwesomeIcon
                        icon={
                          platform === "facebook"
                            ? faFacebookF
                            : platform === "twitter"
                            ? faTwitter
                            : platform === "linkedin"
                            ? faLinkedinIn
                            : platform === "github"
                            ? faGithub
                            : platform === "instagram"
                            ? faInstagram
                            : faDribbble
                        }
                      />
                      <span>{platform}</span>
                      <div className="link-arrow">→</div>
                    </a>
                  ))}
                </div>
              </div> */}

              {/* Recent Activity */}
              <div className="content-card activity-card full-width">
                <div className="card-header">
                  <h2>Recent Activity</h2>
                  {/* <div className="activity-filter">
                    <button className="filter-btn active">All</button>
                    <button className="filter-btn">Courses</button>
                    <button className="filter-btn">Projects</button>
                  </div> */}
                </div>
                <div className="activity-timeline">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={activity.id}
                      className={`activity-item ${activity.color}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="activity-icon">
                        <FontAwesomeIcon icon={activity.icon} />
                      </div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <h4>{activity.title}</h4>
                          <div className="activity-points">
                            +{activity.points} pts
                          </div>
                        </div>
                        <p>{activity.description}</p>
                        <span className="activity-time">{activity.date}</span>
                      </div>
                      <div className="activity-badge"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="content-grid activity-detailed-grid">
              <div className="content-card activity-detailed-card full-width">
                <div className="card-header">
                  <h2>Detailed Activity Log</h2>
                  <div className="activity-controls">
                    <select className="time-filter">
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>This year</option>
                    </select>
                    <button className="export-btn">
                      <FontAwesomeIcon icon={faDownload} />
                      Export
                    </button>
                  </div>
                </div>
                <div className="activity-detailed-timeline">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className={`activity-detailed-item ${activity.color}`}
                    >
                      <div className="activity-date-section">
                        <div className="activity-date">{activity.date}</div>
                      </div>
                      <div className="activity-icon">
                        <FontAwesomeIcon icon={activity.icon} />
                      </div>
                      <div className="activity-content">
                        <h4>{activity.title}</h4>
                        <p>{activity.description}</p>
                        <div className="activity-meta">
                          <span className="activity-type">
                            {activity.type.replace("_", " ")}
                          </span>
                          <span className="activity-points">
                            +{activity.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content profile-form-modal">
            <div className="modal-header">
              <div className="modal-title">
                <FontAwesomeIcon icon={faUser} />
                <h3>Edit Profile</h3>
              </div>
              <button className="btn-close" onClick={handleFormCancel}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleFormSubmit} className="profile-form">
                {/* Basic Information Section */}
                <div className="form-section">
                  <h4 className="section-title">Basic Information</h4>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="title">Professional Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-input"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Full Stack Developer"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      className="form-textarea"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      rows="4"
                    />
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="form-section">
                  <h4 className="section-title">Contact Information</h4>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-input"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Social Links Section */}
                {/* <div className="form-section">
                  <h4 className="section-title">Social Links</h4>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="linkedin">LinkedIn</label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        className="form-input"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="github">GitHub</label>
                      <input
                        type="url"
                        id="github"
                        name="github"
                        className="form-input"
                        value={formData.github}
                        onChange={handleInputChange}
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="twitter">Twitter</label>
                      <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        className="form-input"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        placeholder="https://twitter.com/username"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="dribbble">Dribbble</label>
                      <input
                        type="url"
                        id="dribbble"
                        name="dribbble"
                        className="form-input"
                        value={formData.dribbble}
                        onChange={handleInputChange}
                        placeholder="https://dribbble.com/username"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="facebook">Facebook</label>
                      <input
                        type="url"
                        id="facebook"
                        name="facebook"
                        className="form-input"
                        value={formData.facebook}
                        onChange={handleInputChange}
                        placeholder="https://facebook.com/username"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="instagram">Instagram</label>
                      <input
                        type="url"
                        id="instagram"
                        name="instagram"
                        className="form-input"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                  </div>
                </div> */}
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleFormCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleFormSubmit}
                disabled={isLoading}
              >
                <FontAwesomeIcon icon={faSave} />
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
