import DataManagementTable from "../../components/DataManagmentTable";
import { subAdminsData } from "../../data/subAdminsData";

export default function SubAdminsManagmentTable() {
  return (
    <DataManagementTable
      data={subAdminsData}
      title="Sub-Admins Management"
      entityName="Sub-admin"
      entityNamePlural="sub-admins"
      searchPlaceholder="Search sub-Admins..."
      itemsPerPage={6}
    />
  );
}
