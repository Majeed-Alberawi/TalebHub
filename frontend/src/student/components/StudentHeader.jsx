// student/pages/StudentDashboard.jsx
import { STUDENT_CONFIG } from "../../constants/studentTabs";
import UniversalDashboard from "../../UniversalUserLayout";

export default function StudentDashboard() {
  return <UniversalDashboard config={STUDENT_CONFIG} userType="student" />;
}
