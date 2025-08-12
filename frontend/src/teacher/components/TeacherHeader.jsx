import { TEACHER_CONFIG } from "../../constants/teacherTabs";
import UniversalDashboard from "../../UniversalUserLayout";

export default function TeacherHeader() {
  return <UniversalDashboard config={TEACHER_CONFIG} userType="teacher" />;
}
