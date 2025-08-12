// teacher/pages/TeacherOverview.jsx
import { TEACHER_CONFIG } from "../../constants/teacherTabs";
import DashboardOverview from "../../global/components/DashboardOverview";
import UniversalUserLayout from "../../UniversalUserLayout";

export default function TeacherOverview() {
  return (
    <UniversalUserLayout config={TEACHER_CONFIG} userType="teacher">
      <DashboardOverview config={TEACHER_CONFIG} />
    </UniversalUserLayout>
  );
}
