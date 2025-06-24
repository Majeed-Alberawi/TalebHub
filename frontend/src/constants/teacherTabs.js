import {
  faBookOpen,
  faGraduationCap,
  faClock,
  faTrophy,
  faFire,
  faBullseye,
  faBell,
  faHome,
  faChalkboardUser,
  faUserGraduate,
  faCalendarAlt,
  faUsers,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import DEFAULT_CONFIG from "./navigationTabs";

export const TEACHER_CONFIG = {
  ...DEFAULT_CONFIG,
  title: "Teaching Dashboard",
  headerIcon: faChalkboardUser,
  navigationTabs: [
    { id: "overview", label: "Dashboard", icon: faHome },
    { id: "courses", label: "My Courses", icon: faGraduationCap },
    { id: "students", label: "Students", icon: faUserGraduate },
    { id: "schedule", label: "Schedule", icon: faCalendarAlt },
    { id: "notifications", label: "Announcements", icon: faBell },
  ],
  statsCards: [
    {
      title: "Active Courses",
      count: 3,
      subtitle: "Currently Teaching",
      icon: faBookOpen,
      color: "primary",
    },
    {
      title: "Total Students",
      count: 45,
      subtitle: "Enrolled Students",
      icon: faUsers,
      color: "success",
    },
    {
      title: "Pending Reviews",
      count: 8,
      subtitle: "Assignments to Grade",
      icon: faClipboardList,
      color: "warning",
    },
  ],
  notifications: [
    {
      id: 1,
      title: "New Assignment Submissions",
      description:
        "You have 5 new assignment submissions from Tafsir class that need review and grading...",
      date: "6/19/2025",
      type: "assignment",
    },
    {
      id: 2,
      title: "Staff Meeting Reminder",
      description:
        "Weekly staff meeting scheduled for tomorrow at 2:00 PM in the main conference room",
      date: "6/18/2025",
      type: "meeting",
    },
    {
      id: 3,
      title: "Course Material Update",
      description:
        "Please update your course materials for the upcoming semester. Deadline is next Friday...",
      date: "6/17/2025",
      type: "update",
    },
  ],
  progressData: [
    { subject: "Qur'an Studies", progress: 90, color: "primary" },
    { subject: "Hadith Analysis", progress: 85, color: "success" },
    { subject: "Fiqh Principles", progress: 78, color: "warning" },
    { subject: "Islamic History", progress: 65, color: "tertiary" },
  ],
  achievements: [
    { title: "Course Completed", icon: faGraduationCap, earned: true },
    { title: "Student Favorite", icon: faTrophy, earned: true },
    { title: "Perfect Attendance", icon: faFire, earned: false },
    { title: "Innovation Award", icon: faBullseye, earned: false },
  ],
  dailyGoals: [
    {
      id: 1,
      title: "Grade Assignment Submissions",
      icon: faClipboardList,
      completed: true,
    },
    {
      id: 2,
      title: "Prepare Tomorrow's Lesson",
      icon: faBookOpen,
      completed: false,
    },
    {
      id: 3,
      title: "Update Course Materials",
      icon: faClock,
      completed: false,
    },
  ],
};
