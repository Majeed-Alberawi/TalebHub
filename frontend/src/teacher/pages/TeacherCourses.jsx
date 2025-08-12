// teacher/pages/TeacherCourses.jsx
import { useState } from "react";
import { TEACHER_CONFIG } from "../../constants/teacherTabs";
import UniversalUserLayout from "../../UniversalUserLayout";
import UniversalCoursesPage from "../../global/pages/UniversalCoursesPage";

// Mock teacher courses data
const teacherCoursesData = [
  {
    id: 1,
    name: "Quranic Studies - Advanced",
    subject: "Islamic Studies",
    description:
      "Advanced course on Quranic interpretation and analysis for senior students",
    status: "active",
    createdBy: "Current Teacher",
    assignedStudents: ["Ahmed Ali", "Fatima Hassan", "Omar Ibrahim"],
    totalLessons: 20,
    enrollmentDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Hadith Analysis",
    subject: "Islamic Studies",
    description:
      "Comprehensive study of Hadith authentication methods and interpretation techniques",
    status: "active",
    createdBy: "Current Teacher",
    assignedStudents: ["Fatima Hassan", "Yusuf Abdullah"],
    totalLessons: 15,
    enrollmentDate: "2024-02-01",
  },
  {
    id: 3,
    name: "Islamic History",
    subject: "History",
    description:
      "Survey of Islamic civilization from its origins to the modern era",
    status: "draft",
    createdBy: "Current Teacher",
    assignedStudents: [],
    totalLessons: 12,
    enrollmentDate: "2024-03-01",
  },
];

// Mock students data for assignment
const studentsData = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    status: "active",
    grade: "A",
    enrollmentDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Fatima Hassan",
    email: "fatima@example.com",
    status: "active",
    grade: "B+",
    enrollmentDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Omar Ibrahim",
    email: "omar@example.com",
    status: "active",
    grade: "A-",
    enrollmentDate: "2024-01-25",
  },
  {
    id: 4,
    name: "Aisha Mohammed",
    email: "aisha@example.com",
    status: "active",
    grade: "B",
    enrollmentDate: "2024-02-01",
  },
  {
    id: 5,
    name: "Yusuf Abdullah",
    email: "yusuf@example.com",
    status: "active",
    grade: "A",
    enrollmentDate: "2024-02-05",
  },
];

export default function TeacherCourses() {
  const [courses, setCourses] = useState(teacherCoursesData);

  const handleCourseCreate = (courseData) => {
    console.log("Creating course:", courseData);
    // Add course creation logic
    const newCourse = {
      id: Math.max(...courses.map((c) => c.id), 0) + 1,
      ...courseData,
      createdBy: "Current Teacher",
      assignedStudents: [],
      status: "draft",
    };
    setCourses([...courses, newCourse]);
  };

  const handleCourseEdit = (course) => {
    console.log("Editing course:", course);
    // Navigate to course editor or open edit modal
    // This could integrate with your existing CourseEditor component
  };

  const handleCourseDelete = (course) => {
    console.log("Deleting course:", course);
    setCourses(courses.filter((c) => c.id !== course.id));
  };

  const handleCourseView = (course) => {
    console.log("Viewing course:", course);
    // Navigate to course detail page or course content viewer
  };

  return (
    <UniversalUserLayout config={TEACHER_CONFIG} userType="teacher">
      <UniversalCoursesPage
        userType="teacher"
        coursesData={courses}
        studentsData={studentsData}
        onCourseCreate={handleCourseCreate}
        onCourseEdit={handleCourseEdit}
        onCourseDelete={handleCourseDelete}
        onCourseView={handleCourseView}
      />
    </UniversalUserLayout>
  );
}
