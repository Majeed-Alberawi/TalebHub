import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import DataManagementTable from "../../components/DataManagmentTable";
import UnifiedDataManagement from "../../components/UnifiedDataManagement";
import { subAdminsData } from "../../data/subAdminsData";

export default function SubAdminsManagmentTable() {
  const subAdminsConfig = {
    title: "Sub-Admins Management",
    entityName: "sub-Admin",
    entityNamePlural: "sub-admins",
    searchPlaceholder: "Search sub-admins...",
    icon: faUserShield,

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
        options: ["Sub-Admin", "Super-Admin", "Moderator"],
        defaultValue: "Sub-Admin",
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
    // <DataManagementTable
    //   data={subAdminsData}
    //   title="Sub-Admins Management"
    //   entityName="Sub-admin"
    //   entityNamePlural="sub-admins"
    //   searchPlaceholder="Search sub-Admins..."
    //   itemsPerPage={6}
    // />
    <UnifiedDataManagement
      customConfig={subAdminsConfig}
      initialData={subAdminsData}
    />
  );
}
