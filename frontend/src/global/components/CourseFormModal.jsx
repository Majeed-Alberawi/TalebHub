// global/components/CourseFormModal.jsx
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faSave,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export default function CourseFormModal({
  isOpen,
  course = null,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "Computer Science",
    description: "",
    status: "Draft",
    totalLessons: 1,
  });

  const [isLoading, setIsLoading] = useState(false);

  const subjects = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Islamic Studies",
    "History",
    "Literature",
    "Education",
    "Art",
  ];

  // Populate form when editing
  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || "",
        subject: course.subject || "Computer Science",
        description: course.description || "",
        status: course.status || "Draft",
        totalLessons: course.totalLessons || 1,
      });
    } else {
      setFormData({
        name: "",
        subject: "Computer Science",
        description: "",
        status: "Draft",
        totalLessons: 1,
      });
    }
  }, [course]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      alert("Course name is required");
      return;
    }

    if (!formData.subject.trim()) {
      alert("Subject is required");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare course data
      const courseData = {
        ...formData,
        id: course?.id || Date.now(), // Use existing ID or generate new one
        createdBy: course?.createdBy || "Current Teacher",
        assignedStudents: course?.assignedStudents || [],
        enrollmentDate:
          course?.enrollmentDate || new Date().toISOString().split("T")[0],
      };

      await onSave(courseData);

      // Reset form if creating new course
      if (!course) {
        setFormData({
          name: "",
          subject: "Computer Science",
          description: "",
          status: "Draft",
          totalLessons: 1,
        });
      }
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Error saving course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content course-form-modal">
        <div className="modal-header">
          <div className="modal-title">
            <FontAwesomeIcon icon={faGraduationCap} />
            <h3>{course ? "Edit Course" : "Create New Course"}</h3>
          </div>
          <button className="btn-close" onClick={onCancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="modal-body">
          <div className="course-form">
            <div className="form-group">
              <label htmlFor="courseName">Course Name *</label>
              <input
                id="courseName"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter course name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="courseSubject">Subject *</label>
              <select
                id="courseSubject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className="form-select"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="courseDescription">Description</label>
              <textarea
                id="courseDescription"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter course description"
                rows="4"
                className="form-textarea"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="courseStatus">Status</label>
                <select
                  id="courseStatus"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="form-select"
                >
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="totalLessons">Total Lessons</label>
                <input
                  id="totalLessons"
                  type="number"
                  min="1"
                  value={formData.totalLessons}
                  onChange={(e) =>
                    handleInputChange(
                      "totalLessons",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faSave} />
            {isLoading
              ? "Saving..."
              : course
              ? "Update Course"
              : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );
}
