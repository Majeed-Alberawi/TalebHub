import DEFAULT_CONFIG from "../../constants/navigationTabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

export default function StudentHeader({ config = DEFAULT_CONFIG }) {
  // const [activeTab, setActiveTab] = useState("");
  const location = useLocation();

  return (
    <>
      {/* Header Navigation */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <FontAwesomeIcon icon={config.headerIcon} className="header-icon" />
          <h1>{config.title}</h1>
        </div>
        <nav className="dashboard-nav">
          {config.navigationTabs.map((tab) => {
            const isActive = location.pathname.includes(`/student/${tab.id}`);
            return (
              <Link
                to={`/student/${tab.id}`}
                key={tab.id}
                className={`nav-tab ${isActive ? "active" : ""}`}
              >
                <FontAwesomeIcon icon={tab.icon} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
