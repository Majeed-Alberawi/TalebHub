import { Outlet } from "react-router-dom";
import StudentHeader from "./StudentHeader";

export default function StudentLayout() {
  return (
    <div className="student-layout">
      <StudentHeader />
      <div className="student-content">
        <Outlet />
      </div>
    </div>
  );
}
