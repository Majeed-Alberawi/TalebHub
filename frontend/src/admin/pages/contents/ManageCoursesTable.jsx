import CourseEditor from "../../../global/pages/CourseEditor";
import UnifiedDataManagement from "../../components/UnifiedDataManagement";
import { coursesData } from "../../data/coursesData";
import { studentsData } from "../../data/studentsData";

export default function ManageCoursesTable() {
  return (
    <UnifiedDataManagement
      entityType="courses"
      initialData={coursesData} // Replace with actual data
      assignableData={studentsData} // Replace with actual assignable data
      onCourseEdit={(courseData, onSave, onCancel) => (
        <CourseEditor
          courseData={courseData}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
    />
  );
}
