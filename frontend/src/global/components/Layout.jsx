import { Outlet } from "react-router-dom";
import Header from "./common/Header/Header.jsx";
import Footer from "./common/Footer/Footer.jsx";
import { useLocation } from "react-router-dom";
import StudentDashboard from "../../student/pages/StudentDashboard.jsx";
import TeacherDashboard from "../../teacher/pages/TeacherDashboard.jsx";

function Layout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about-us";
  const isStudentDashbord = location.pathname === "/student/courses";
  const isTeacherDashbord = location.pathname === "/teacher";

  return (
    <>
      {!isLandingPage && !isAboutPage && (
        <div
          className="container landing-upspace"
          style={{ position: "relative" }}
        >
          <Header />
        </div>
      )}
      {isStudentDashbord && <StudentDashboard />}
      {isTeacherDashbord && <TeacherDashboard />}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
