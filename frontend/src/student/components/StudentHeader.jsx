import { useState } from "react";
import DEFAULT_CONFIG from "../../constants/navigationTabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function StudentHeader({ config = DEFAULT_CONFIG }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="educational-dashboard ">
      {/* Header Navigation */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <FontAwesomeIcon icon={config.headerIcon} className="header-icon" />
          <h1>{config.title}</h1>
        </div>
        <nav className="dashboard-nav">
          {config.navigationTabs.map((tab) => (
            <Link
              to={`/student/${tab.id}`}
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <FontAwesomeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
