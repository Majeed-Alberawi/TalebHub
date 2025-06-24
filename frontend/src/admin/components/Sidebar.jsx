import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  // faHome,
  faGraduationCap,
  faShieldAlt,
  faBook,
  faClipboardList,
  faChartLine,
  faBell,
  faCog,
  faQuestionCircle,
  faSignOutAlt,
  faBars,
  faTimes,
  faChalkboardUser,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../global/components/Logo";
import { Link } from "react-router-dom";

export default function Sidebar({
  isMobileOpen,
  setIsMobileOpen,
  isMobile,
  setIsMobile,
}) {
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { id: "dashboard", icon: faChartBar, label: "Dashboard", active: true },
    // { id: "overview", icon: faHome, label: "Overview" },
    { id: "teachers", icon: faChalkboardUser, label: "Teachers", active: true },
    { id: "students", icon: faGraduationCap, label: "Students", active: true },
    { id: "sub-admins", icon: faShieldAlt, label: "Sub Admins", active: true },
    { id: "lessons", icon: faBook, label: "Lessons" },
    { id: "assignments", icon: faClipboardList, label: "Assignments" },
    { id: "reports", icon: faChartLine, label: "Reports" },
    { id: "notifications", icon: faBell, label: "Notifications" },
  ];

  const bottomMenuItems = [
    { id: "settings", icon: faCog, label: "Settings" },
    { id: "help", icon: faQuestionCircle, label: "Help" },
    { id: "logout", icon: faSignOutAlt, label: "Logout" },
  ];

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleMenuClick = (itemId) => {
    console.log(`Clicked: ${itemId}`);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`mobile-toggle ${isMobile ? "block" : "hidden"}`}
        onClick={toggleMobile}
      >
        {isMobileOpen ? (
          <FontAwesomeIcon icon={faTimes} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="lg" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && isMobile && (
        <div className="mobile-overlay" onClick={toggleMobile} />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar ${
          isMobile && !isMobileOpen ? "mobile-closed" : ""
        }`}
      >
        <div className="sidebar-header">
          <Logo />
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              to={`/adminMainPage/${item.id}`}
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`nav-item ${item.active ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={item.icon} size="sm" />
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-bottom">
          {bottomMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`nav-item ${item.id === "logout" ? "logout" : ""}`}
            >
              <FontAwesomeIcon icon={item.icon} size="sm" />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
