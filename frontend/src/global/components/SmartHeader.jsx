// global/components/SmartHeader.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./common/Header/Header";
import UniversalHeader from "./UniversalHeader";
import { STUDENT_CONFIG } from "../../constants/studentTabs";
import { TEACHER_CONFIG } from "../../constants/teacherTabs";

export default function SmartHeader() {
  const location = useLocation();

  // Determine which header to show based on current route
  const getHeaderType = () => {
    const path = location.pathname;

    // Admin routes use sidebar, so no header needed
    if (path.startsWith("/admin") || path.startsWith("/sub-admin")) {
      return "none";
    }

    // Student dashboard routes
    if (path.startsWith("/student")) {
      return "student";
    }

    // Teacher dashboard routes
    if (path.startsWith("/teacher")) {
      return "teacher";
    }

    // Course editor/viewer routes - no header (full screen)
    if (path.includes("/course-editor") || path.includes("/course-viewer")) {
      return "none";
    }

    // Authentication pages - no header for clean login experience
    if (path === "/registration" || path === "/forget-password") {
      return "none";
    }

    // All other public routes use main header
    return "main";
  };

  const headerType = getHeaderType();

  // Render appropriate header based on route
  switch (headerType) {
    case "main":
      return <Header />;

    case "student":
      return <UniversalHeader config={STUDENT_CONFIG} userType="student" />;

    case "teacher":
      return <UniversalHeader config={TEACHER_CONFIG} userType="teacher" />;

    case "none":
    default:
      return null; // No header for admin (has sidebar) or special pages
  }
}
