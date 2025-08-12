// global/components/DashboardOverview.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChartBar } from "@fortawesome/free-solid-svg-icons";

export default function DashboardOverview({ config }) {
  return (
    <>
      {/* Stats Cards */}
      <div className="stats-section">
        {config.statsCards.map((card, index) => (
          <div key={index} className={`stats-card ${card.color}`}>
            <div className="stats-icon">
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <div className="stats-content">
              <div className="stats-number">{card.count}</div>
              <div className="stats-title">{card.title}</div>
              <div className="stats-subtitle">{card.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Notifications Section */}
        {config.sections.showNotifications && (
          <div className="notifications-section">
            <div className="section-header">
              <FontAwesomeIcon icon={faBell} />
              <h2>Announcements</h2>
            </div>
            <div className="notifications-list">
              {config.notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <div className="notification-content">
                    <h3>{notification.title}</h3>
                    <p>{notification.description}</p>
                    <span className="notification-date">
                      {notification.date}
                    </span>
                  </div>
                </div>
              ))}
              <button className="view-all-btn">View All</button>
            </div>
          </div>
        )}

        {/* Progress & Learning Section */}
        <div className="learning-section">
          <div className="section-header">
            <FontAwesomeIcon icon={faChartBar} />
            <h2>Continue Learning</h2>
          </div>

          {/* Progress Tracking */}
          {config.sections.showProgress && (
            <div className="progress-container">
              <h3>Subjects Progress</h3>
              <div className="progress-list">
                {config.progressData.map((item, index) => (
                  <div key={index} className="progress-item">
                    <div className="progress-info">
                      <span className="subject-name">{item.subject}</span>
                      <span className="progress-percentage">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${item.color}`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {config.sections.showAchievements && (
            <div className="achievements-container">
              <h3>Achievements</h3>
              <div className="achievements-grid">
                {config.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`achievement-item ${
                      achievement.earned ? "earned" : "locked"
                    }`}
                  >
                    <div className="achievement-icon">
                      <FontAwesomeIcon icon={achievement.icon} />
                    </div>
                    <span className="achievement-title">
                      {achievement.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daily Goals */}
          {config.sections.showDailyGoals && (
            <div className="daily-goals">
              <h3>Today's Goals</h3>
              <div className="goals-list">
                {config.dailyGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`goal-item ${goal.completed ? "completed" : ""}`}
                  >
                    <FontAwesomeIcon icon={goal.icon} />
                    <span>{goal.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
