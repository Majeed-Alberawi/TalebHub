import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import DataManagementTable from "../../components/DataManagmentTable";
import UnifiedDataManagement from "../../components/UnifiedDataManagement";
import { studentsData } from "../../data/studentsData";

export default function StudentsManagementTable() {
  // Optimized Students Configuration
  const studentsConfig = {
    title: "Students Management",
    entityName: "student",
    entityNamePlural: "students",
    searchPlaceholder: "Search students...",
    icon: faUserGraduate, // Student graduation cap icon

    // Define table columns
    columns: [
      { key: "name", label: "Student Name", type: "name" },
      { key: "email", label: "Email", type: "email" },
      { key: "studentId", label: "Student ID", type: "text" }, // Added student ID
      { key: "enrollmentDate", label: "Enrollment Date", type: "text" }, // Added enrollment date
      { key: "status", label: "Status", type: "status" },
    ],

    // Available actions for each row
    actions: ["edit", "delete"], // Added view and export

    // Filter options
    filters: [
      {
        key: "status",
        label: "All Status",
        options: ["all", "active", "inactive", "graduated", "suspended"],
      },
      {
        key: "enrollmentDate",
        label: "All Grades",
        options: ["all", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"],
      },
      {
        key: "department", // If students have departments/majors
        label: "All Departments",
        options: [
          "all",
          "Computer Science",
          "Engineering",
          "Business",
          "Arts",
          "Sciences",
        ],
      },
    ],

    // Form fields for create/edit
    formFields: [
      {
        key: "name",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter student's full name",
      },
      {
        key: "email",
        label: "Student Email",
        type: "email",
        required: true,
        placeholder: "student@university.edu",
      },
      {
        key: "studentId",
        label: "Student ID",
        type: "text",
        required: true,
        placeholder: "e.g., STU2024001",
      },
      {
        key: "department",
        label: "Department/Major",
        type: "select",
        required: true,
        options: [
          "Computer Science",
          "Engineering",
          "Business",
          "Arts",
          "Sciences",
        ],
      },
      {
        key: "enrollmentDate",
        label: "Enrollment Date",
        type: "date",
        required: true,
      },
      {
        key: "graduationYear",
        label: "Expected Graduation Year",
        type: "number",
        required: false,
        placeholder: "e.g., 2025",
      },
      {
        key: "status",
        label: "Student Status",
        type: "select",
        options: ["Active", "Inactive", "Graduated", "Suspended", "On Leave"],
        defaultValue: "Active",
      },
      {
        key: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: false,
        placeholder: "Enter phone number",
      },
      {
        key: "address",
        label: "Address",
        type: "textarea",
        rows: 2,
        placeholder: "Enter student's address...",
      },
      {
        key: "notes",
        label: "Additional Notes",
        type: "textarea",
        rows: 3,
        placeholder: "Any additional notes about the student...",
      },
    ],

    // Export configuration for students
    exportData: (student) => ({
      "Student Name": student.name,
      "Student ID": student.studentId || "N/A",
      Email: student.email,
      Department: student.department || "N/A",
      Grade: student.grade || "N/A",
      Status: student.status,
      "Enrollment Date": student.enrollmentDate || "N/A",
      "Graduation Year": student.graduationYear || "N/A",
      "Contact Number": student.contactNumber || "N/A",
      Address: student.address || "N/A",
      "Export Date": new Date().toLocaleDateString(),
    }),
  };

  // Alternative: Simplified version if you prefer your original structure
  // const studentsConfigSimplified = {
  //   title: "Students Management",
  //   entityName: "student",
  //   entityNamePlural: "students",
  //   searchPlaceholder: "Search students...",
  //   icon: faUserGraduate,

  //   columns: [
  //     { key: "name", label: "Name", type: "name" },
  //     { key: "email", label: "Email", type: "email" },
  //     { key: "role", label: "Role", type: "role" },
  //     { key: "status", label: "Status", type: "status" },
  //   ],

  //   actions: ["edit", "delete"],

  //   filters: [
  //     {
  //       key: "status",
  //       label: "All Status",
  //       options: ["all", "active", "inactive"],
  //     },
  //     // Fixed: Changed role options to be more student-appropriate
  //     {
  //       key: "role",
  //       label: "All Types",
  //       options: ["all", "undergraduate", "graduate", "doctoral"],
  //     },
  //   ],

  //   formFields: [
  //     {
  //       key: "name",
  //       label: "Full Name",
  //       type: "text",
  //       required: true,
  //       placeholder: "Enter student's full name",
  //     },
  //     {
  //       key: "email",
  //       label: "Email Address",
  //       type: "email",
  //       required: true,
  //       placeholder: "student@university.edu",
  //     },
  //     // Fixed: Changed role options to be student-specific
  //     {
  //       key: "role",
  //       label: "Student Type",
  //       type: "select",
  //       required: true,
  //       options: ["undergraduate", "graduate", "doctoral"],
  //       defaultValue: "undergraduate",
  //     },
  //     {
  //       key: "status",
  //       label: "Status",
  //       type: "select",
  //       options: ["Active", "Inactive"],
  //       defaultValue: "Active",
  //     },
  //     // Made department more student-appropriate
  //     {
  //       key: "department",
  //       label: "Major/Department",
  //       type: "select",
  //       required: false,
  //       options: [
  //         "Computer Science",
  //         "Engineering",
  //         "Business",
  //         "Arts",
  //         "Sciences",
  //         "Mathematics",
  //         "Literature",
  //       ],
  //     },
  //     // Changed permissions to something more student-relevant
  //     {
  //       key: "notes",
  //       label: "Student Notes",
  //       type: "textarea",
  //       rows: 3,
  //       placeholder:
  //         "Any notes about the student (academic performance, special requirements, etc.)",
  //     },
  //   ],
  // };

  return (
    // <DataManagementTable
    //   data={studentsData}
    //   title="Students Management"
    //   entityName="Student"
    //   entityNamePlural="students"
    //   searchPlaceholder="Search students..."
    //   itemsPerPage={6}
    // />
    <UnifiedDataManagement
      customConfig={studentsConfig}
      initialData={studentsData}
      entityType="students"
    />
  );
}
