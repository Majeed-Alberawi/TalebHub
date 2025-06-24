import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBookOpen,
  faGraduationCap,
  faClock,
  faTrophy,
  faFire,
  faBullseye,
  faBell,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

// Configuration object that can be passed as props
const DEFAULT_CONFIG = {
  title: "My Learning Board",
  headerIcon: faGraduationCap,
  navigationTabs: [
    { id: "overview", label: "Progress Dashboard", icon: faHome },
    { id: "courses", label: "Courses", icon: faGraduationCap },
    // { id: "tests", label: "Tests", icon: faFlask },
    // { id: "certificates", label: "Certificates", icon: faCertificate },
    { id: "notifications", label: "Announcements", icon: faBell },
  ],
  statsCards: [
    {
      title: "Current Courses",
      count: 1,
      subtitle: "Completion Certificates",
      icon: faBookOpen,
      color: "primary",
    },
    {
      title: "Completed Lessons",
      count: 15,
      subtitle: "Supplementary Lessons",
      icon: faChartLine,
      color: "success",
    },
    {
      title: "Ongoing Content",
      count: 0,
      subtitle: "Ongoing Content",
      icon: faClock,
      color: "warning",
    },
  ],
  notifications: [
    {
      id: 1,
      title: "Curriculum Teaching (Self-study)",
      description:
        "Registration is now open for the Curriculum Teaching (Self-Study) course. Anyone can register for this track on the site...",
      date: "6/19/2025",
      type: "course",
    },
    {
      id: 2,
      title: "Official Channel",
      description:
        "Content access to the official Telegram channel for the Tafsirna program is not allowed",
      date: "5/24/2025",
      type: "announcement",
    },
    {
      id: 3,
      title: "Tafsirna Ten",
      description:
        "The Public Activities Department is pleased to announce the #Tafsirna_Ten program which focuses on the spiritual and practical aspects of our yearly life...",
      date: "5/22/2025",
      type: "program",
    },
  ],
  progressData: [
    { subject: "Qur'an", progress: 85, color: "primary" },
    { subject: "Hadith", progress: 72, color: "success" },
    { subject: "Fiqh", progress: 60, color: "warning" },
    { subject: "Tafsir", progress: 45, color: "tertiary" },
  ],
  achievements: [
    { title: "First Completed Lesson", icon: faGraduationCap, earned: true },
    { title: "One Week Streak", icon: faFire, earned: true },
    { title: "Goal Achiever", icon: faBullseye, earned: false },
    { title: "Ideal Student", icon: faTrophy, earned: false },
  ],
  dailyGoals: [
    {
      id: 1,
      title: "Review Tafsir Lesson",
      icon: faBullseye,
      completed: true,
    },
    {
      id: 2,
      title: "Read 5 Pages from the Curriculum",
      icon: faBookOpen,
      completed: false,
    },
    {
      id: 3,
      title: "Attend Live Lesson",
      icon: faClock,
      completed: false,
    },
  ],
  sections: {
    showNotifications: true,
    showProgress: true,
    showAchievements: true,
    showDailyGoals: true,
  },
};
export default DEFAULT_CONFIG;
