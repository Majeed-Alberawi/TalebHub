// global/components/UniversalLayout.jsx

import UniversalHeader from "./global/components/UniversalHeader";

export default function UniversalUserLayout({
  config,
  userType = "student",
  children,
}) {
  return (
    <div className="dashboard">
      <div className="container">
        {/* Header Navigation */}
        <UniversalHeader config={config} userType={userType} />

        {/* Main Content - This will change based on the route */}
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
