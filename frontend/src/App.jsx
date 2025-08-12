import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ========================================
// GLOBAL PAGES & COMPONENTS
// ========================================
import Layout from "./global/components/Layout";
import Home from "./global/pages/landing/Home";
import NotFound from "./global/pages/NotFound";
import AboutUs from "./global/pages/AboutUs";
import AllCoursesPage from "./global/pages/courses/AllCoursesPage";
import CourseEditor from "./global/pages/CourseEditor";

// ========================================
// AUTHENTICATION PAGES
// ========================================
import Registration from "./global/pages/auth/Registration";
import ForgetPassword from "./global/pages/auth/ForgetPassword";

// ========================================
// INSTRUCTOR/TEACHER PUBLIC PAGES
// ========================================
import InstructorsPage from "./global/pages/teacher/InstructorsPage";

// ========================================
// ADMIN PAGES & COMPONENTS
// ========================================
import AdminMainPage from "./admin/pages/AdminMainPage";
import DashboardContent from "./admin/pages/contents/DashboardContent";
import TeachersManagementTable from "./admin/pages/contents/TeachersManagementTable";
import StudentsManagementTable from "./admin/pages/contents/StudentsManagmentTable";
import SubAdminsManagmentTable from "./admin/pages/contents/SubAdminsManagmentTable";
import ManageCoursesTable from "./admin/pages/contents/ManageCoursesTable";
import AdminCourseEditor from "./admin/pages/AdminCourseEditor";

// ========================================
// STUDENT PAGES & COMPONENTS
// ========================================
import StudentOverview from "./student/components/StudentOverview";
import StudentCourses from "./student/pages/StudentCourses";
// import StudentNotifications from "./student/pages/StudentNotifications";
import CourseViewer from "./student/pages/CourseViewer";

// ========================================
// TEACHER PAGES & COMPONENTS
// ========================================
import TeacherOverview from "./teacher/components/TeacherOverview";
import TeacherCourses from "./teacher/pages/TeacherCourses";
// import TeacherStudents from "./teacher/pages/TeacherStudents";
// import TeacherSchedule from "./teacher/pages/TeacherSchedule";
// import TeacherNotifications from "./teacher/pages/TeacherNotifications";
import TeacherCourseEditor from "./teacher/pages/TeacherCourseEditor";

function App() {
  return (
    <Router>
      <Routes>
        {/* ========================================
            PUBLIC ROUTES (WITH LAYOUT)
            ======================================== */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="courses" element={<AllCoursesPage />} />
          <Route path="instructors" element={<InstructorsPage />} />
        </Route>

        {/* ========================================
            AUTHENTICATION ROUTES (NO LAYOUT)
            ======================================== */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* ========================================
            STANDALONE COURSE EDITOR (NO LAYOUT)
            ======================================== */}
        <Route path="/course-editor" element={<CourseEditor />} />

        {/* ========================================
            ADMIN DASHBOARD ROUTES
            ======================================== */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route path="/admin" element={<AdminMainPage />}>
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="teachers" element={<TeachersManagementTable />} />
          <Route path="students" element={<StudentsManagementTable />} />
          <Route path="sub-admins" element={<SubAdminsManagmentTable />} />
          <Route path="courses" element={<ManageCoursesTable />} />
        </Route>

        {/* Admin Course Editor (Standalone) */}
        <Route
          path="/admin/course-editor/:courseId"
          element={<AdminCourseEditor />}
        />

        {/* ========================================
            SUB-ADMIN DASHBOARD ROUTES
            ======================================== */}
        <Route
          path="/sub-admin"
          element={<Navigate to="/sub-admin/dashboard" replace />}
        />
        <Route path="/sub-admin" element={<AdminMainPage />}>
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="teachers" element={<TeachersManagementTable />} />
          <Route path="students" element={<StudentsManagementTable />} />
          <Route path="courses" element={<ManageCoursesTable />} />
        </Route>

        {/* Sub-Admin Course Editor (Standalone) */}
        <Route
          path="/sub-admin/course-editor/:courseId"
          element={<AdminCourseEditor />}
        />

        {/* ========================================
            STUDENT DASHBOARD ROUTES
            ======================================== */}
        <Route
          path="/student"
          element={<Navigate to="/student/overview" replace />}
        />
        <Route path="/student/overview" element={<StudentOverview />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        {/* <Route
          path="/student/notifications"
          element={<StudentNotifications />}
        /> */}

        {/* Student Course Viewer (Standalone) */}
        <Route
          path="/student/course-viewer/:courseId"
          element={<CourseViewer />}
        />

        {/* ========================================
            TEACHER DASHBOARD ROUTES
            ======================================== */}
        <Route
          path="/teacher"
          element={<Navigate to="/teacher/overview" replace />}
        />
        <Route path="/teacher/overview" element={<TeacherOverview />} />
        <Route path="/teacher/courses" element={<TeacherCourses />} />
        {/* <Route path="/teacher/students" element={<TeacherStudents />} /> */}
        {/* <Route path="/teacher/schedule" element={<TeacherSchedule />} /> */}
        {/* <Route
          path="/teacher/notifications"
          element={<TeacherNotifications />}
        /> */}

        {/* Teacher Course Editor (Standalone) */}
        <Route
          path="/teacher/course-editor/:courseId"
          element={<TeacherCourseEditor />}
        />

        {/* ========================================
            LEGACY ROUTES (FOR BACKWARD COMPATIBILITY)
            ======================================== */}
        <Route
          path="/adminMainPage"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route
          path="/adminMainPage/*"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route
          path="/forgetPassword"
          element={<Navigate to="/forget-password" replace />}
        />
        <Route
          path="/instructorsPage"
          element={<Navigate to="/instructors" replace />}
        />

        {/* ========================================
            404 NOT FOUND ROUTE
            ======================================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
