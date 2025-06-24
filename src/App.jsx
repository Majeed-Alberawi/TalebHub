import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Home from "./global/pages/landing/Home";
import NotFound from "./global/pages/NotFound";
import Registration from "./global/pages/auth/Registration";
import AllCoursesPage from "./global/pages/courses/AllCoursesPage";
import AboutUs from "./global/pages/AboutUs";

// COMPONENTS
import Layout from "./global/components/Layout";
import ForgetPassword from "./global/pages/auth/ForgetPassword";
import InstructorsPage from "./global/pages/teacher/InstructorsPage";
import AdminMainPage from "./admin/pages/AdminMainPage";
import DashboardContent from "./admin/pages/contents/DashboardContent";
import TeachersManagementTable from "./admin/pages/contents/TeachersManagementTable";
import StudentsManagementTable from "./admin/pages/contents/StudentsManagmentTable";
import SubAdminsManagmentTable from "./admin/pages/contents/SubAdminsManagmentTable";
import { TeacherDashboard } from "./teacher/pages/TeacherMainPage";
import StudentDashboard from "./student/pages/StudentDashboard";
import CoursesTab from "./student/components/CoursesTab";

// Admin Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="courses" element={<AllCoursesPage />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="instructorsPage" element={<InstructorsPage />} />
        </Route>
        <Route path="forgetPassword" element={<ForgetPassword />} />
        {/* Start Admin Pages */}
        <Route path="adminMainPage" element={<AdminMainPage />} />
        {/* End Admin Pages */}

        {/* Start Admin / Sub-Admin Dashboard */}
        <Route path="/adminMainPage" element={<AdminMainPage />}>
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="teachers" element={<TeachersManagementTable />} />
          <Route path="students" element={<StudentsManagementTable />} />
          <Route path="sub-admins" element={<SubAdminsManagmentTable />} />
        </Route>

        {/* Start Student Dashboard */}
        <Route path="/student/overview" element={<Layout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<CoursesTab />} />
          {/* /student/courses */}
        </Route>

        {/* Start teacher Dashboard */}
        <Route path="/teacher" element={<Layout />}>
          <Route index element={<TeacherDashboard />}>
            {/* <Route path="dashboard" element={<DashboardContent />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
