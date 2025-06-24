import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function CoursesTab() {
  return (
    <div className="educational-dashboard">
      <div className="dashboard-container">
        {/* Programs Section */}
        <div className="programs-section">
          <h2 className="section-title">Programs</h2>

          {/* Program Card */}
          <div className="program-card">
            {/* Decorative Elements */}
            <div className="program-card-decoration">
              <FontAwesomeIcon icon={faGraduationCap} />
            </div>

            <div className="program-card-content">
              <div className="program-header">
                <div className="program-icon">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                <div className="program-info">
                  <h3 className="program-name">Sophia Academy</h3>
                  <p className="program-version">Fifth Edition</p>
                </div>
              </div>

              <h4 className="program-title">
                Sophia Academy - General Track (14+ Years)
              </h4>

              <p className="program-description">
                Designed for thinkers and researchers, combining
                <br />
                cognitive operations and creative materials
              </p>

              {/* Progress Bar */}
              <div className="progress-section">
                <div className="progress-info">
                  <span>Lesson 15/36</span>
                  <span>41.7% Complete</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: "41.7%" }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <button className="action-button">
                <FontAwesomeIcon icon={faPlay} />
                <span>View Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
