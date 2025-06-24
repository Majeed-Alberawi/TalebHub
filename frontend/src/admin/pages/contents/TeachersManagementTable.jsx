import DataManagementTable from "../../components/DataManagmentTable";
import { teachersData } from "../../data/teachersData";

export default function TeachersManagementTable() {
  return (
    <div className="page">
      <DataManagementTable
        data={teachersData}
        title="Teachers Management"
        entityName="teacher"
        entityNamePlural="teachers"
        searchPlaceholder="Search teachers..."
        itemsPerPage={6}
      />
    </div>
  );
}
