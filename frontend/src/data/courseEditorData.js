// data/courseEditorData.js
export const courseEditorData = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    subject: "Computer Science",
    createdBy: "John Doe",
    status: "active",
    assignedStudents: ["Ahmed Ali", "Fatima Hassan"],
    sections: [
      {
        id: 1,
        title: "Introduction to HTML",
        lessons: [
          {
            id: 1,
            title: "HTML Basics",
            type: "video",
            content: null,
            fileName: "html-basics.mp4",
            description: "Learn the fundamental concepts of HTML",
          },
          {
            id: 2,
            title: "HTML Elements Reference",
            type: "file",
            content: null,
            fileName: "html-elements.pdf",
            description: "Complete reference guide for HTML elements",
          },
        ],
      },
      {
        id: 2,
        title: "CSS Styling",
        lessons: [
          {
            id: 3,
            title: "CSS Introduction",
            type: "video",
            content: null,
            fileName: "css-intro.mp4",
            description: "Introduction to Cascading Style Sheets",
          },
          {
            id: 4,
            title: "CSS Layout Techniques",
            type: "video",
            content: null,
            fileName: "css-layout.mp4",
            description: "Learn about Flexbox and Grid layouts",
          },
        ],
      },
      {
        id: 3,
        title: "JavaScript Basics",
        lessons: [
          {
            id: 5,
            title: "JavaScript Variables",
            type: "video",
            content: null,
            fileName: "js-variables.mp4",
            description: "Understanding variables and data types",
          },
          {
            id: 6,
            title: "JavaScript Functions",
            type: "file",
            content: null,
            fileName: "js-functions.pdf",
            description: "Working with functions in JavaScript",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Quranic Studies - Advanced",
    description: "Advanced course on Quranic interpretation and analysis",
    subject: "Islamic Studies",
    createdBy: "Dr. Ahmad",
    status: "active",
    assignedStudents: ["Omar Ibrahim", "Aisha Mohammed"],
    sections: [
      {
        id: 4,
        title: "Tafsir Methodology",
        lessons: [
          {
            id: 7,
            title: "Classical Tafsir Approaches",
            type: "video",
            content: null,
            fileName: "classical-tafsir.mp4",
            description: "Overview of classical interpretation methods",
          },
          {
            id: 8,
            title: "Modern Tafsir Techniques",
            type: "file",
            content: null,
            fileName: "modern-tafsir.pdf",
            description: "Contemporary approaches to Quranic interpretation",
          },
        ],
      },
      {
        id: 5,
        title: "Contextual Analysis",
        lessons: [
          {
            id: 9,
            title: "Historical Context",
            type: "video",
            content: null,
            fileName: "historical-context.mp4",
            description:
              "Understanding the historical background of revelations",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Mathematics for Engineers",
    description: "Advanced mathematics concepts for engineering students",
    subject: "Mathematics",
    createdBy: "Prof. Sarah",
    status: "draft",
    assignedStudents: [],
    sections: [
      {
        id: 6,
        title: "Calculus Fundamentals",
        lessons: [
          {
            id: 10,
            title: "Limits and Continuity",
            type: "video",
            content: null,
            fileName: "limits.mp4",
            description: "Understanding limits and continuous functions",
          },
          {
            id: 11,
            title: "Derivatives",
            type: "file",
            content: null,
            fileName: "derivatives.pdf",
            description: "Derivative rules and applications",
          },
        ],
      },
    ],
  },
];

// Helper functions for course data management
export const getCourseById = (courseId) => {
  return courseEditorData.find((course) => course.id === parseInt(courseId));
};

export const updateCourseData = (courseId, updatedData) => {
  const index = courseEditorData.findIndex(
    (course) => course.id === parseInt(courseId)
  );
  if (index !== -1) {
    courseEditorData[index] = { ...courseEditorData[index], ...updatedData };
    return courseEditorData[index];
  }
  return null;
};

export const createNewCourse = (courseData) => {
  const newId = Math.max(...courseEditorData.map((c) => c.id), 0) + 1;
  const newCourse = {
    id: newId,
    title: courseData.title || "New Course",
    description: courseData.description || "",
    subject: courseData.subject || "General",
    createdBy: courseData.createdBy || "Current User",
    status: "draft",
    assignedStudents: [],
    sections: [
      {
        id: 1,
        title: "Introduction",
        lessons: [],
      },
    ],
    ...courseData,
  };
  courseEditorData.push(newCourse);
  return newCourse;
};

export const deleteCourse = (courseId) => {
  const index = courseEditorData.findIndex(
    (course) => course.id === parseInt(courseId)
  );
  if (index !== -1) {
    return courseEditorData.splice(index, 1)[0];
  }
  return null;
};
