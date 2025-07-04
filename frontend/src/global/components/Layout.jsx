import { Outlet } from "react-router-dom";
import Header from "./common/Header/Header.jsx";
import Footer from "./common/Footer/Footer.jsx";
import { useLocation } from "react-router-dom";
import StudentHeader from "../../student/components/StudentHeader.jsx";

function Layout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about-us";
  const isStudentDashbord = location.pathname === "/student/courses";

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
      {isStudentDashbord && (
        <div className="container">
          <StudentHeader />
        </div>
      )}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
