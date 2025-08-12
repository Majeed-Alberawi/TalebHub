// student/pages/StudentOverview.jsx
import { STUDENT_CONFIG } from "../../constants/studentTabs";
import DashboardOverview from "../../global/components/DashboardOverview";
import UniversalUserLayout from "../../UniversalUserLayout";

export default function StudentOverview() {
  return (
    <UniversalUserLayout config={STUDENT_CONFIG} userType="student">
      <DashboardOverview config={STUDENT_CONFIG} />
    </UniversalUserLayout>
  );
}
