// student/pages/StudentCourses.jsx
import { STUDENT_CONFIG } from "../../constants/studentTabs";
// import UniversalLayout from "../../global/components/UniversalLayout";
import UniversalCoursesPage from "../../global/pages/UniversalCoursesPage";
import UniversalUserLayout from "../../UniversalUserLayout";

// Mock student courses data
const studentCoursesData = [
  {
    id: 1,
    name: "Curriculum Teaching (Self-study)",
    subject: "Education",
    description:
      "Designed for thinkers and researchers, combining cognitive operations and creative materials",
    status: "active",
    progress: 75,
    currentLesson: 15,
    totalLessons: 36,
    enrollmentDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Quranic Studies",
    subject: "Islamic Studies",
    description:
      "Comprehensive study of Quranic interpretation and understanding",
    status: "completed",
    progress: 100,
    currentLesson: 24,
    totalLessons: 24,
    enrollmentDate: "2023-09-01",
  },
  {
    id: 3,
    name: "Hadith Analysis",
    subject: "Islamic Studies",
    description: "Deep dive into Hadith authentication and interpretation",
    status: "active",
    progress: 45,
    currentLesson: 8,
    totalLessons: 18,
    enrollmentDate: "2024-02-01",
  },
];

export default function StudentCourses() {
  const handleCourseView = (course) => {
    console.log("Viewing course:", course);
    // Navigate to course detail page or open course viewer
  };

  const handleCourseContinue = (course) => {
    console.log("Continuing course:", course);
    // Navigate to the current lesson or course player
  };

  return (
    <UniversalUserLayout config={STUDENT_CONFIG} userType="student">
      <UniversalCoursesPage
        userType="student"
        coursesData={studentCoursesData}
        onCourseView={handleCourseView}
        onCourseContinue={handleCourseContinue}
      />
    </UniversalUserLayout>
  );
}
