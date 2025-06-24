import DataManagementTable from "../../components/DataManagmentTable";
import { studentsData } from "../../data/studentsData";

export default function StudentsManagementTable() {
  return (
    <DataManagementTable
      data={studentsData}
      title="Students Management"
      entityName="Student"
      entityNamePlural="students"
      searchPlaceholder="Search students..."
      itemsPerPage={6}
    />
  );
}
