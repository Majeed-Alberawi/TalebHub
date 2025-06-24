import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardContent from "./contents/DashboardContent";
import { Outlet } from "react-router-dom";

export default function AdminMainPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <>
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
      />

      <section className="main-section">
        <div className="container">
          <DashboardHeader />
        </div>
        <div className={`main-content ${isMobile ? "mobile" : "desktop"}`}>
          <div className="container">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}
