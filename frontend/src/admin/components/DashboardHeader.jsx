import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faUserTie,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardHeader() {
  const user = "admin"; // can it be sub-admin

  return (
    <>
      <header className="top-nav">
        <div className="container">
          <div className="nav-left">
            <div className="label">
              <span className="label-badge">
                {user === "admin" ? (
                  <FontAwesomeIcon icon={faUserTie} />
                ) : user === "sub-admin" ? (
                  <FontAwesomeIcon icon={faUserShield} />
                ) : (
                  ""
                )}
                {user.toLocaleUpperCase()}
              </span>
            </div>
          </div>

          <div className="nav-center">
            <div className="search-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search teachers, students, lessons..."
                className="search-input"
              />
            </div>
          </div>

          <div className="nav-right">
            <button className="nav-button">
              <FontAwesomeIcon icon={faBell} />
              <span className="notification-badge">3</span>
            </button>
            <div className="profile-menu">
              <button className="profile-button">
                <FontAwesomeIcon icon={faUser} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
