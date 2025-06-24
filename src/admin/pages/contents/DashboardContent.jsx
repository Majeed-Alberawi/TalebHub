import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faUserGraduate,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardContent() {
  // Mock data for dashboard metrics
  const [dashboardData, setDashboardData] = useState({
    teachers: 24,
    students: 156,
    lessons: 48,
    loading: true,
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDashboardData((prev) => ({ ...prev, loading: false }));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const MetricCard = ({ title, value, icon, loading, trend }) => (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3>{title}</h3>
      </div>
      <div className="metric-value">
        {loading ? (
          <div className="loading-skeleton"></div>
        ) : (
          <>
            <span className="number">{value}</span>
            {trend && (
              <span className={`trend ${trend > 0 ? "positive" : "negative"}`}>
                {trend > 0 ? "+" : ""}
                {trend}%
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="overview-content">
        <div className="content-header">
          <h1>Dashboard Overview</h1>
          <p className="content-subtitle">
            Monitor your educational platform performance
          </p>
        </div>

        <div className="dashboard-grid">
          <MetricCard
            title="Teachers"
            value={dashboardData.teachers}
            icon={faChalkboardTeacher}
            loading={dashboardData.loading}
            trend={+12}
          />
          <MetricCard
            title="Students"
            value={dashboardData.students}
            icon={faUserGraduate}
            loading={dashboardData.loading}
            trend={+8}
          />
          <MetricCard
            title="Lessons"
            value={dashboardData.lessons}
            icon={faBook}
            loading={dashboardData.loading}
            trend={+15}
          />
        </div>

        <div className="dashboard-sections">
          <div className="section">
            <div className="section-header">
              <h2>Recent Activity</h2>
              <button className="section-action">View All</button>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">
                  <FontAwesomeIcon icon={faUserGraduate} />
                </div>
                <div className="activity-content">
                  <p>
                    <strong>15 new students</strong> registered today
                  </p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <FontAwesomeIcon icon={faBook} />
                </div>
                <div className="activity-content">
                  <p>
                    <strong>3 new lessons</strong> were created
                  </p>
                  <span className="activity-time">4 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                </div>
                <div className="activity-content">
                  <p>
                    <strong>2 teachers</strong> joined the platform
                  </p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
