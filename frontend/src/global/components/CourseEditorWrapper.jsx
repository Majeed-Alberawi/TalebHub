// global/components/CourseEditorWrapper.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseEditor from "../pages/CourseEditor";
import { getCourseById, updateCourseData } from "../../data/courseEditorData";

export default function CourseEditorWrapper({ userType = "student" }) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      try {
        const course = getCourseById(courseId);
        if (course) {
          setCourseData(course);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        setError("Error loading course data");
        console.error("Error loading course:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setError("No course ID provided");
      setLoading(false);
    }
  }, [courseId]);

  const handleSave = (updatedCourseData) => {
    try {
      const savedCourse = updateCourseData(courseId, updatedCourseData);
      if (savedCourse) {
        setCourseData(savedCourse);
        console.log("Course saved successfully");
      }
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  const handleClose = () => {
    // Navigate back to the appropriate courses page based on user type
    switch (userType) {
      case "admin":
        navigate("/admin/courses");
        break;
      case "sub-admin":
        navigate("/sub-admin/courses");
        break;
      case "teacher":
        navigate("/teacher/courses");
        break;
      case "student":
        navigate("/student/courses");
        break;
      default:
        navigate("/");
    }
  };

  const handleBack = () => {
    handleClose(); // Same behavior as close for now
  };

  if (loading) {
    return (
      <div className="course-editor-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-editor-error">
        <div className="error-content">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleClose}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <CourseEditor
      courseId={courseId}
      userType={userType}
      initialCourseData={courseData}
      onSave={handleSave}
      onClose={handleClose}
      onBack={handleBack}
    />
  );
}
