// global/pages/CourseEditor.jsx
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEdit,
  faVideo,
  faFileAlt,
  faChevronDown,
  faChevronRight,
  faEye,
  faUpload,
  faSave,
  faTimes,
  faPlay,
  faDownload,
  faFileLines,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function CourseEditor({
  courseId,
  userType = "student", // 'admin', 'sub-admin', 'teacher', 'student'
  initialCourseData = null,
  onSave,
  onClose,
  onBack,
}) {
  // Default course data structure
  const defaultCourseData = {
    id: courseId || Date.now(),
    title: "New Course",
    description: "",
    subject: "General",
    sections: [
      {
        id: 1,
        title: "Introduction",
        lessons: [
          {
            id: 1,
            title: "Welcome to the Course",
            type: "video",
            content: null,
            fileName: null,
          },
        ],
      },
    ],
  };

  const [courseData, setCourseData] = useState(
    initialCourseData || defaultCourseData
  );
  const [expandedSections, setExpandedSections] = useState(new Set([1]));
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [viewMode, setViewMode] = useState(
    userType === "student" ? "student" : "teacher"
  );
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [newLessonData, setNewLessonData] = useState({
    title: "",
    type: "video",
    sectionId: null,
  });
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingCourseInfo, setEditingCourseInfo] = useState(false);
  const [courseInfo, setCourseInfo] = useState({
    title: courseData.title,
    description: courseData.description || "",
    subject: courseData.subject || "General",
  });
  const fileInputRef = useRef(null);

  // Check if user can edit
  const canEdit = ["admin", "sub-admin", "teacher"].includes(userType);

  // Load course data when courseId changes
  useEffect(() => {
    if (initialCourseData) {
      setCourseData(initialCourseData);
      setCourseInfo({
        title: initialCourseData.title,
        description: initialCourseData.description || "",
        subject: initialCourseData.subject || "General",
      });
    }
  }, [initialCourseData]);

  // Auto-save functionality
  useEffect(() => {
    if (onSave && canEdit) {
      const timeoutId = setTimeout(() => {
        onSave(courseData);
      }, 1000); // Auto-save after 1 second of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [courseData, onSave, canEdit]);

  // Section management
  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const addSection = () => {
    if (!canEdit) return;
    setShowSectionForm(true);
    setNewSectionTitle("");
  };

  const saveSection = () => {
    if (!newSectionTitle.trim() || !canEdit) return;

    const newSection = {
      id: Date.now(),
      title: newSectionTitle,
      lessons: [],
    };

    setCourseData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));

    setShowSectionForm(false);
    setNewSectionTitle("");
  };

  const editSection = (section) => {
    if (!canEdit) return;
    setEditingSection(section.id);
    setNewSectionTitle(section.title);
  };

  const saveEditSection = () => {
    if (!canEdit) return;
    setCourseData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === editingSection
          ? { ...section, title: newSectionTitle }
          : section
      ),
    }));
    setEditingSection(null);
    setNewSectionTitle("");
  };

  const deleteSection = (sectionId) => {
    if (!canEdit) return;
    if (window.confirm("Are you sure you want to delete this section?")) {
      setCourseData((prev) => ({
        ...prev,
        sections: prev.sections.filter((section) => section.id !== sectionId),
      }));
    }
  };

  // Lesson management
  const addLesson = (sectionId) => {
    if (!canEdit) return;
    setNewLessonData({
      title: "",
      type: "video",
      sectionId,
    });
    setShowLessonForm(true);
  };

  const saveLesson = () => {
    if (!newLessonData.title.trim() || !canEdit) return;

    const newLesson = {
      id: Date.now(),
      title: newLessonData.title,
      type: newLessonData.type,
      content: null,
      fileName: null,
    };

    setCourseData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === newLessonData.sectionId
          ? { ...section, lessons: [...section.lessons, newLesson] }
          : section
      ),
    }));

    setShowLessonForm(false);
    setNewLessonData({ title: "", type: "video", sectionId: null });
  };

  const editLesson = (lesson) => {
    if (!canEdit) return;
    setEditingLesson(lesson.id);
    setNewLessonData({
      title: lesson.title,
      type: lesson.type,
      sectionId: null,
    });
    setSelectedLesson(lesson.id);
  };

  const saveEditLesson = () => {
    if (!canEdit) return;
    setCourseData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => ({
        ...section,
        lessons: section.lessons.map((lesson) =>
          lesson.id === editingLesson
            ? {
                ...lesson,
                title: newLessonData.title,
                type: newLessonData.type,
              }
            : lesson
        ),
      })),
    }));
    setEditingLesson(null);
    setNewLessonData({ title: "", type: "video", sectionId: null });
  };

  const deleteLesson = (sectionId, lessonId) => {
    if (!canEdit) return;
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setCourseData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                lessons: section.lessons.filter(
                  (lesson) => lesson.id !== lessonId
                ),
              }
            : section
        ),
      }));
      if (selectedLesson === lessonId) {
        setSelectedLesson(null);
      }
    }
  };

  const selectLesson = (lesson) => {
    setSelectedLesson(lesson.id);
  };

  const handleFileUpload = (event) => {
    if (!canEdit) return;
    const file = event.target.files[0];
    if (file && selectedLesson) {
      setCourseData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) => ({
          ...section,
          lessons: section.lessons.map((lesson) =>
            lesson.id === selectedLesson
              ? { ...lesson, content: file, fileName: file.name }
              : lesson
          ),
        })),
      }));
    }
  };

  const saveCourseInfo = () => {
    if (!canEdit) return;
    setCourseData((prev) => ({
      ...prev,
      title: courseInfo.title,
      description: courseInfo.description,
      subject: courseInfo.subject,
    }));
    setEditingCourseInfo(false);
  };

  const getSelectedLessonData = () => {
    for (const section of courseData.sections) {
      const lesson = section.lessons.find((l) => l.id === selectedLesson);
      if (lesson) return lesson;
    }
    return null;
  };

  const selectedLessonData = getSelectedLessonData();

  return (
    <div className="course-editor">
      {/* Header */}
      <div className="course-header">
        <div className="header-content container">
          <div className="header-left">
            {onBack && (
              <button className="btn btn-outline" onClick={onBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
              </button>
            )}
            {editingCourseInfo && canEdit ? (
              <div className="course-title-edit">
                <input
                  type="text"
                  value={courseInfo.title}
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, title: e.target.value })
                  }
                  className="title-input"
                />
                <button className="btn btn-success" onClick={saveCourseInfo}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setEditingCourseInfo(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <div className="course-title-display">
                <h1>{courseData.title}</h1>
                {canEdit && (
                  <button
                    className="btn-icon"
                    onClick={() => setEditingCourseInfo(true)}
                    title="Edit course title"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="header-actions">
            {canEdit && (
              <button
                className={`btn ${
                  viewMode === "student" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() =>
                  setViewMode(viewMode === "teacher" ? "student" : "teacher")
                }
              >
                <FontAwesomeIcon icon={faEye} />
                {viewMode === "teacher" ? "Preview" : "Edit Mode"}
              </button>
            )}
            {onClose && (
              <button className="btn btn-danger" onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
                Close
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Sidebar */}
        <div className="course-sidebar">
          <div className="sidebar-header">
            <h2>Course Sections</h2>
            {viewMode === "teacher" && canEdit && (
              <button className="btn btn-primary" onClick={addSection}>
                <FontAwesomeIcon icon={faPlus} />
                Add Section
              </button>
            )}
          </div>

          <ul className="sections-list">
            {courseData.sections.map((section) => (
              <li key={section.id} className="section-item">
                <div
                  className="course-section-header"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="section-title">
                    <FontAwesomeIcon
                      icon={
                        expandedSections.has(section.id)
                          ? faChevronDown
                          : faChevronRight
                      }
                    />
                    {editingSection === section.id ? (
                      <input
                        type="text"
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        onBlur={saveEditSection}
                        onKeyPress={(e) =>
                          e.key === "Enter" && saveEditSection()
                        }
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      section.title
                    )}
                  </div>
                  {viewMode === "teacher" && canEdit && (
                    <div
                      className="section-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="btn-icon"
                        onClick={() => editSection(section)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn-icon danger"
                        onClick={() => deleteSection(section.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  )}
                </div>

                {expandedSections.has(section.id) && (
                  <ul className="lessons-list">
                    {section.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className={`lesson-item ${
                          selectedLesson === lesson.id ? "active" : ""
                        }`}
                        onClick={() => selectLesson(lesson)}
                      >
                        <div className="lesson-info">
                          <div className={`lesson-icon ${lesson.type}`}>
                            <FontAwesomeIcon
                              icon={
                                lesson.type === "video" ? faVideo : faFileAlt
                              }
                            />
                          </div>
                          <span className="lesson-title">{lesson.title}</span>
                        </div>
                        {viewMode === "teacher" && canEdit && (
                          <div
                            className="lesson-actions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="btn-icon"
                              onClick={() => editLesson(lesson)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="btn-icon danger"
                              onClick={() =>
                                deleteLesson(section.id, lesson.id)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                    {viewMode === "teacher" && canEdit && (
                      <li className="add-lesson-btn">
                        <button
                          className="btn btn-secondary"
                          onClick={() => addLesson(section.id)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                          Add Lesson
                        </button>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="course-main-content">
          {selectedLessonData ? (
            viewMode === "teacher" && canEdit ? (
              // Teacher Edit View
              <div className="lesson-editor">
                <div className="lesson-header">
                  <div className="lesson-title-section">
                    {editingLesson === selectedLessonData.id ? (
                      <div className="form-group">
                        <input
                          type="text"
                          value={newLessonData.title}
                          onChange={(e) =>
                            setNewLessonData({
                              ...newLessonData,
                              title: e.target.value,
                            })
                          }
                          placeholder="Lesson title"
                        />
                        <select
                          value={newLessonData.type}
                          onChange={(e) =>
                            setNewLessonData({
                              ...newLessonData,
                              type: e.target.value,
                            })
                          }
                        >
                          <option value="video">Video</option>
                          <option value="file">File</option>
                        </select>
                        <div className="form-actions">
                          <button
                            className="btn btn-success"
                            onClick={saveEditLesson}
                          >
                            <FontAwesomeIcon icon={faSave} />
                            Save
                          </button>
                          <button
                            className="btn btn-outline"
                            onClick={() => setEditingLesson(null)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h4>{selectedLessonData.title}</h4>
                        <div className="lesson-type">
                          <FontAwesomeIcon
                            icon={
                              selectedLessonData.type === "video"
                                ? faVideo
                                : faFileAlt
                            }
                          />
                          {selectedLessonData.type}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {editingLesson !== selectedLessonData.id && (
                  <div className="upload-section">
                    {selectedLessonData.content ||
                    selectedLessonData.fileName ? (
                      <div className="file-info">
                        <div className="file-icon">
                          <FontAwesomeIcon
                            icon={
                              selectedLessonData.type === "video"
                                ? faVideo
                                : faFileAlt
                            }
                          />
                        </div>
                        <div className="file-details">
                          <div className="file-name">
                            {selectedLessonData.fileName}
                          </div>
                          <div className="file-type">
                            {selectedLessonData.type}
                          </div>
                        </div>
                        <button
                          className="btn btn-outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <FontAwesomeIcon icon={faUpload} />
                          Replace
                        </button>
                      </div>
                    ) : (
                      <div
                        className="upload-area"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="upload-icon">
                          <FontAwesomeIcon icon={faUpload} />
                        </div>
                        <div className="upload-text">
                          Upload{" "}
                          {selectedLessonData.type === "video"
                            ? "Video"
                            : "File"}
                        </div>
                        <div className="upload-hint">
                          Click to browse or drag and drop your{" "}
                          {selectedLessonData.type === "video"
                            ? "video file"
                            : "document"}
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      accept={
                        selectedLessonData.type === "video"
                          ? "video/*"
                          : ".pdf,.doc,.docx,.ppt,.pptx"
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
            ) : (
              // Student Preview View
              <div className="student-lesson-view">
                <div className="content-header">
                  <h3>{selectedLessonData.title}</h3>
                  <p>
                    <FontAwesomeIcon
                      icon={
                        selectedLessonData.type === "video"
                          ? faVideo
                          : faFileAlt
                      }
                    />
                    {selectedLessonData.type === "video"
                      ? "Video Lesson"
                      : "Document"}
                  </p>
                </div>

                {selectedLessonData.type === "video" ? (
                  <div className="video-player">
                    <div className="play-button">
                      <FontAwesomeIcon icon={faPlay} />
                    </div>
                  </div>
                ) : (
                  <div className="file-download">
                    <div className="download-icon">
                      <FontAwesomeIcon icon={faDownload} />
                    </div>
                    <h4>{selectedLessonData.fileName || "Document"}</h4>
                    <p>Click to download and view this document</p>
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faDownload} />
                      Download File
                    </button>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="empty-state">
              <FontAwesomeIcon icon={faFileLines} />
              <h4>No lesson selected</h4>
              <p>
                Select a lesson from the sidebar to{" "}
                {viewMode === "teacher" && canEdit ? "edit" : "view"} its
                content.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Section Modal */}
      {showSectionForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowSectionForm(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Section</h3>
              <button
                className="btn-icon"
                onClick={() => setShowSectionForm(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="form-group">
              <label>Section Title</label>
              <input
                type="text"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                placeholder="Enter section title"
                autoFocus
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-success" onClick={saveSection}>
                <FontAwesomeIcon icon={faSave} />
                Save Section
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setShowSectionForm(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showLessonForm && (
        <div className="modal-overlay" onClick={() => setShowLessonForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Lesson</h3>
              <button
                className="btn-icon"
                onClick={() => setShowLessonForm(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="form-group">
              <label>Lesson Title</label>
              <input
                type="text"
                value={newLessonData.title}
                onChange={(e) =>
                  setNewLessonData({ ...newLessonData, title: e.target.value })
                }
                placeholder="Enter lesson title"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Lesson Type</label>
              <select
                value={newLessonData.type}
                onChange={(e) =>
                  setNewLessonData({ ...newLessonData, type: e.target.value })
                }
              >
                <option value="video">Video</option>
                <option value="file">File</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="btn btn-success" onClick={saveLesson}>
                <FontAwesomeIcon icon={faSave} />
                Save Lesson
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setShowLessonForm(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
