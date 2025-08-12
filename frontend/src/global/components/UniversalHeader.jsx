// global/components/UniversalHeader.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  faHome,
  faSignOutAlt,
  faExternalLinkAlt,
  faUser,
  // faBell,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function UniversalHeader({ config, userType = "student" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  // const [showNotifications, setShowNotifications] = useState(false);

  // Check if user is in dashboard mode (student/teacher/admin/sub-admin)
  const isDashboardMode = ["student", "teacher", "admin", "sub-admin"].includes(
    userType
  );

  const handleGoToMainPage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    navigate("/");
  };

  const getUserDisplayName = () => {
    switch (userType) {
      case "admin":
        return "Admin User";
      case "sub-admin":
        return "Sub Admin";
      case "teacher":
        return "Teacher";
      case "student":
        return "Student";
      default:
        return "Guest";
    }
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-title">
        <FontAwesomeIcon icon={config.headerIcon} className="header-icon" />
        <h1>{config.title}</h1>
      </div>

      <nav className="dashboard-nav">
        {config.navigationTabs.map((tab) => {
          const isActive = location.pathname.includes(`/${userType}/${tab.id}`);
          return (
            <Link
              to={`/${userType}/${tab.id}`}
              key={tab.id}
              className={`nav-tab ${isActive ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right Side Controls */}
      {isDashboardMode && (
        <div className="dashboard-controls">
          {/* Go to Main Page Button */}
          <button
            className="btn btn-outline main-page-btn"
            onClick={handleGoToMainPage}
            title="Go to Main Page"
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Main Page</span>
          </button>

          {/* Notifications */}
          {/* <div className="notification-wrapper">
            <button
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="notification-badge">3</span>
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>Notifications</h4>
                </div>
                <div className="notification-list">
                  <div className="notification-item">
                    <p>New course assignment available</p>
                    <span className="notification-time">2 hours ago</span>
                  </div>
                  <div className="notification-item">
                    <p>Your submission has been graded</p>
                    <span className="notification-time">5 hours ago</span>
                  </div>
                  <div className="notification-item">
                    <p>Class reminder: Web Development at 2 PM</p>
                    <span className="notification-time">1 day ago</span>
                  </div>
                </div>
                <div className="notification-footer">
                  <Link to={`/${userType}/notifications`}>
                    View All Notifications
                  </Link>
                </div>
              </div>
            )}
          </div> */}

          {/* User Menu */}
          <div className="user-menu-wrapper">
            <button
              className="user-menu-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <span className="user-name">{getUserDisplayName()}</span>
              <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="user-info">
                    <div className="user-avatar-large">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="user-details">
                      <h4>{getUserDisplayName()}</h4>
                      <p className="user-type">{userType?.replace("-", " ")}</p>
                    </div>
                  </div>
                </div>

                <div className="user-dropdown-menu">
                  <Link to={`/${userType}/profile`} className="dropdown-item">
                    <FontAwesomeIcon icon={faUser} />
                    <span>My Profile</span>
                  </Link>
                  <Link to="/" className="dropdown-item">
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    <span>Visit Main Site</span>
                  </Link>
                  <hr className="dropdown-divider" />
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-btn"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
