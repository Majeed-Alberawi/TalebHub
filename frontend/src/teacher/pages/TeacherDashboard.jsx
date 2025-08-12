// teacher/pages/TeacherDashboard.jsx
import { TEACHER_CONFIG } from "../../constants/teacherTabs";
import UniversalDashboard from "../../UniversalUserLayout";

export default function TeacherDashboard() {
  return <UniversalDashboard config={TEACHER_CONFIG} userType="teacher" />;
}
