// global/pages/UniversalCoursesPage.jsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  // faFilter,
  faTable,
  faGrip,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import CourseCard from "../components/CourseCard";
import CourseFormModal from "../components/CourseFormModal";
import UnifiedDataManagement from "../../admin/components/UnifiedDataManagement";

export default function UniversalCoursesPage({
  userType = "student",
  coursesData = [],
  studentsData = [],
  onCourseCreate,
  onCourseEdit,
  onCourseDelete,
  onCourseView,
  onCourseContinue,
}) {
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Filter courses based on user type and filters
  const getFilteredCourses = () => {
    let filtered = coursesData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (course) => course.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply subject filter
    if (subjectFilter !== "all") {
      filtered = filtered.filter(
        (course) =>
          course.subject?.toLowerCase() === subjectFilter.toLowerCase()
      );
    }

    return filtered;
  };

  const filteredCourses = getFilteredCourses();

  // Get unique subjects for filter dropdown
  const subjects = [
    ...new Set(coursesData.map((course) => course.subject).filter(Boolean)),
  ];

  const handleCreate = () => {
    if (userType === "teacher") {
      setShowCreateModal(true);
    }
  };

  const handleEdit = (course) => {
    if (userType === "teacher") {
      setEditingCourse(course);
      setShowCreateModal(true);
    }
  };

  const handleDelete = (course) => {
    if (userType === "teacher") {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete "${course.name}"?`
      );
      if (confirmDelete) {
        onCourseDelete?.(course);
      }
    }
  };

  const handleView = (course) => {
    onCourseView?.(course);
  };

  const handleContinue = (course) => {
    onCourseContinue?.(course);
  };

  const handleCourseFormSave = (courseData) => {
    if (editingCourse) {
      onCourseEdit?.(courseData);
    } else {
      onCourseCreate?.(courseData);
    }
    setShowCreateModal(false);
    setEditingCourse(null);
  };

  const handleCourseFormCancel = () => {
    setShowCreateModal(false);
    setEditingCourse(null);
  };

  const renderHeader = () => (
    <div className="courses-header">
      <div className="header-title">
        <FontAwesomeIcon icon={faGraduationCap} />
        <h2>{userType === "teacher" ? "My Teaching Courses" : "My Courses"}</h2>
      </div>

      <div className="header-controls">
        {userType === "teacher" && (
          <button className="btn btn-primary" onClick={handleCreate}>
            <FontAwesomeIcon icon={faPlus} />
            Create Course
          </button>
        )}

        <div className="view-mode-toggle">
          <button
            className={`btn-toggle ${viewMode === "cards" ? "active" : ""}`}
            onClick={() => setViewMode("cards")}
          >
            <FontAwesomeIcon icon={faGrip} />
          </button>
          {userType === "teacher" && (
            <button
              className={`btn-toggle ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              <FontAwesomeIcon icon={faTable} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderFilters = () => (
    <div className="courses-filters">
      <div className="search-box">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="draft">Draft</option>
        </select>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderCardsView = () => (
    <div className="courses-grid">
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            userType={userType}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onContinue={handleContinue}
          />
        ))
      ) : (
        <div className="empty-state">
          <FontAwesomeIcon icon={faGraduationCap} className="empty-icon" />
          <h3>No courses found</h3>
          <p>
            {userType === "teacher"
              ? "Create your first course to get started"
              : "No courses match your search criteria"}
          </p>
          {userType === "teacher" && (
            <button className="btn btn-primary" onClick={handleCreate}>
              <FontAwesomeIcon icon={faPlus} />
              Create Course
            </button>
          )}
        </div>
      )}
    </div>
  );

  const renderTableView = () => (
    <UnifiedDataManagement
      entityType="courses"
      initialData={filteredCourses}
      assignableData={studentsData}
    />
  );

  return (
    <div className="courses-page">
      {renderHeader()}
      {renderFilters()}

      <div className="courses-content">
        {viewMode === "cards" ? renderCardsView() : renderTableView()}
      </div>

      {/* Results count */}
      {filteredCourses.length > 0 && (
        <div className="courses-footer">
          <p>
            Showing {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Course Form Modal */}
      <CourseFormModal
        isOpen={showCreateModal}
        course={editingCourse}
        onSave={handleCourseFormSave}
        onCancel={handleCourseFormCancel}
      />
    </div>
  );
}
