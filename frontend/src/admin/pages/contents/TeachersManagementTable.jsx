import DataManagementTable from "../../components/DataManagmentTable";
import UnifiedDataManagement from "../../components/UnifiedDataManagement";
import { teachersData } from "../../data/teachersData";

export default function TeachersManagementTable() {
  const teachersConfig = {
    title: "Teachers Management",
    entityName: "teacher",
    entityNamePlural: "teachers",
    searchPlaceholder: "Search teacher...",

    // Define table columns
    columns: [
      { key: "name", label: "Name", type: "name" },
      { key: "email", label: "Email", type: "email" },
      { key: "role", label: "Role", type: "role" },
      { key: "status", label: "Status", type: "status" },
    ],

    // Available actions for each row
    actions: ["edit", "delete"], // No assign needed for sub-admins

    // Filter options
    filters: [
      {
        key: "status",
        label: "All Status",
        options: ["all", "active", "inactive"],
      },
      {
        key: "role",
        label: "All Roles",
        options: ["all", "sub-admin", "super-admin", "moderator"],
      },
    ],

    // Form fields for create/edit
    formFields: [
      {
        key: "name",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter full name (e.g., Mr. John Doe)",
      },
      {
        key: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "Enter email address",
      },
      {
        key: "role",
        label: "Role",
        type: "select",
        required: true,
        options: ["teacher"],
        defaultValue: "teacher",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Active", "Inactive"],
        defaultValue: "Active",
      },
      {
        key: "department",
        label: "Department",
        type: "select",
        required: false,
        options: ["IT", "HR", "Finance", "Academic", "Operations"],
      },
      {
        key: "permissions",
        label: "Permissions",
        type: "textarea",
        rows: 3,
        placeholder: "Describe specific permissions and responsibilities...",
      },
    ],
  };
  return (
    // <div className="page">
    //   <DataManagementTable
    //     data={teachersData}
    //     title="Teachers Management"
    //     entityName="teacher"
    //     entityNamePlural="teachers"
    //     searchPlaceholder="Search teachers..."
    //     itemsPerPage={6}
    //   />
    <UnifiedDataManagement
      customConfig={teachersConfig}
      initialData={teachersData}
    />
  );
}
