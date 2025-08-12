// Navigation utility for handling lesson editing
export const navigateToCourseEditor = (lessonData) => {
  // Store lesson data in sessionStorage for the course editor page
  sessionStorage.setItem("currentLessonData", JSON.stringify(lessonData));

  // Navigate to course editor page (adjust URL based on your routing)
  const courseEditorUrl = `/course-editor/${lessonData.id}`;
  window.open(courseEditorUrl, "_blank"); // Opens in new tab

  // Alternative: Same tab navigation
  // window.location.href = courseEditorUrl;
};

// Utility to get lesson data in course editor page
export const getCurrentLessonData = () => {
  const lessonDataString = sessionStorage.getItem("currentLessonData");
  if (lessonDataString) {
    try {
      return JSON.parse(lessonDataString);
    } catch (error) {
      console.error("Error parsing lesson data:", error);
      return null;
    }
  }
  return null;
};

// Clean up lesson data when done
export const clearCurrentLessonData = () => {
  sessionStorage.removeItem("currentLessonData");
};

// Updated UnifiedDataManagement handleView method
export const createLessonViewHandler = (onLessonUpdate) => {
  return (lesson) => {
    // Store the lesson data
    navigateToCourseEditor(lesson);

    // Optional: Listen for updates when user returns
    const handleStorageChange = (e) => {
      if (e.key === "lessonUpdated") {
        const updatedLesson = JSON.parse(e.newValue);
        if (onLessonUpdate) {
          onLessonUpdate(updatedLesson);
        }
        // Clean up listener
        window.removeEventListener("storage", handleStorageChange);
      }
    };

    window.addEventListener("storage", handleStorageChange);
  };
};

// Course Editor Page Component
import React, { useState, useEffect } from "react";
import CourseEditor from "./CourseEditor";

export function CourseEditorPage() {
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get lesson data from sessionStorage
    const currentLesson = getCurrentLessonData();
    if (currentLesson) {
      setLessonData(currentLesson);
    } else {
      // Redirect back if no lesson data
      window.location.href = "/lessons";
    }
    setLoading(false);
  }, []);

  const handleSave = (updatedCourseData) => {
    // Update the lesson data
    const updatedLesson = {
      ...lessonData,
      courseData: updatedCourseData,
      name: updatedCourseData.title, // Update lesson name to match course title
    };

    // Notify parent window about the update
    if (window.opener) {
      // For popup windows
      window.opener.postMessage(
        {
          type: "LESSON_UPDATED",
          data: updatedLesson,
        },
        "*"
      );
    } else {
      // For same-tab navigation, use localStorage
      localStorage.setItem("lessonUpdated", JSON.stringify(updatedLesson));
      window.dispatchEvent(new Event("storage"));
    }

    // Show success message
    alert("Lesson saved successfully!");
  };

  const handleGoBack = () => {
    // Clean up and go back
    clearCurrentLessonData();
    if (window.opener) {
      window.close(); // Close popup
    } else {
      window.location.href = "/lessons"; // Navigate back
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading course editor...</p>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>No lesson data found. Please go back to lessons page.</p>
        <button onClick={() => (window.location.href = "/lessons")}>
          Go Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <CourseEditor
      lessonData={lessonData}
      onSave={handleSave}
      onGoBack={handleGoBack}
    />
  );
}

// Updated UnifiedDataManagement with new view handler
// Add this to your UnifiedDataManagement component:

/*
// In UnifiedDataManagement component, replace the handleView method:

const handleView = (item) => {
  if (entityType === "lessons") {
    // Open course editor in new tab/page
    navigateToCourseEditor(item);
    
    // Listen for updates from course editor
    const handleMessage = (event) => {
      if (event.data.type === 'LESSON_UPDATED') {
        // Update the lesson in the table
        setItems(prevItems =>
          prevItems.map(lesson =>
            lesson.id === event.data.data.id
              ? event.data.data
              : lesson
          )
        );
        window.removeEventListener('message', handleMessage);
      }
    };
    
    window.addEventListener('message', handleMessage);
  } else {
    console.log(`View ${config.entityName}:`, item);
  }
};
*/

// Router setup example (if using React Router)
/*
// In your App.js or router configuration:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CourseEditorPage } from './CourseEditorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/course-editor/:id" element={<CourseEditorPage />} />
        <Route path="/students" element={<StudentsPage />} />
        {other routes }
      </Routes>
    </Router>
  );
}
*/

// Alternative: If not using React Router, you can use simple navigation
export const simpleNavigationSetup = {
  // In your main lessons page component
  LessonsPageWithNavigation: () => {
    const [lessons, setLessons] = useState(initialLessonsData);

    const handleLessonUpdate = (updatedLesson) => {
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === updatedLesson.id ? updatedLesson : lesson
        )
      );
    };

    return (
      <UnifiedDataManagement
        entityType="lessons"
        initialData={lessons}
        customConfig={{
          ...lessonsConfig,
          // Override the view action to open in new page
          handleView: createLessonViewHandler(handleLessonUpdate),
        }}
      />
    );
  },

  // Simple page routing without React Router
  initializePageRouting: () => {
    // Check current page URL
    const currentPath = window.location.pathname;

    if (currentPath.includes("/course-editor/")) {
      // Load course editor page
      const lessonId = currentPath.split("/").pop();
      return <CourseEditorPage />;
    } else if (currentPath.includes("/lessons")) {
      // Load lessons page
      return <LessonsPageWithNavigation />;
    }
    // ... other page conditions
  },
};

// CSS for loading states
export const additionalStyles = `
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
}

.course-header .header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.course-title-section .lesson-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.lesson-subject {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.lesson-status {
  background: #d1fae5;
  color: #065f46;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
}

.lesson-creator {
  color: #6b7280;
  font-style: italic;
}

.video-element {
  width: 100%;
  max-height: 400px;
  border-radius: 0.5rem;
}

.video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  color: #6b7280;
}

.empty-sections {
  padding: 2rem;
  text-align: center;
}

.empty-state-small {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
}
`;

// Complete implementation example
export const CompleteImplementationExample = {
  // 1. Main Lessons Page Component
  LessonsPage: `
import React, { useState } from 'react';
import UnifiedDataManagement from './UnifiedDataManagement';
import { navigateToCourseEditor } from './navigation';

function LessonsPage() {
  const [lessons, setLessons] = useState(lessonsData);

  const lessonsConfig = {
    // ... your existing config
    actions: ["view", "edit", "assign", "export", "delete"],
  };

  const handleView = (lesson) => {
    // Open course editor in new tab
    navigateToCourseEditor(lesson);
    
    // Listen for updates
    const handleMessage = (event) => {
      if (event.data.type === 'LESSON_UPDATED') {
        setLessons(prevLessons =>
          prevLessons.map(l =>
            l.id === event.data.data.id ? event.data.data : l
          )
        );
        window.removeEventListener('message', handleMessage);
      }
    };
    
    window.addEventListener('message', handleMessage);
  };

  return (
    <UnifiedDataManagement
      customConfig={{
        ...lessonsConfig,
        handleView // Pass custom view handler
      }}
      initialData={lessons}
    />
  );
}
  `,

  // 2. Course Editor Page Route
  CourseEditorRoute: `
// Create a new file: CourseEditorPage.jsx
import React from 'react';
import { CourseEditorPage } from './navigation';

export default CourseEditorPage;
  `,

  // 3. App.js routing setup
  AppRouting: `
// If using React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/course-editor/:id" element={<CourseEditorPage />} />
        <Route path="/students" element={<StudentsPage />} />
      </Routes>
    </Router>
  );
}

// If NOT using React Router (simple navigation)
function App() {
  const currentPath = window.location.pathname;
  
  if (currentPath.includes('/course-editor/')) {
    return <CourseEditorPage />;
  } else if (currentPath === '/lessons') {
    return <LessonsPage />;
  } else if (currentPath === '/students') {
    return <StudentsPage />;
  }
  
  return <LessonsPage />; // Default
}
  `,
};

export default {
  navigateToCourseEditor,
  getCurrentLessonData,
  clearCurrentLessonData,
  createLessonViewHandler,
  CourseEditorPage,
  CompleteImplementationExample,
};
