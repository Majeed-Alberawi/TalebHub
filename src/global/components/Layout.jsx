import { Outlet } from "react-router-dom";
import Header from "./common/Header/Header.jsx";
import Footer from "./common/Footer/Footer.jsx";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about-us";

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
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
