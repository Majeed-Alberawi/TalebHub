// global/components/CourseCard.jsx (Updated)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faPlay,
  faEdit,
  faTrash,
  faUsers,
  faBookOpen,
  faEye,
  faClock,
  faCheck,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  course,
  userType = "student",
  onEdit,
  onDelete,
  onView,
  onContinue,
}) {
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return faCheck;
      case "active":
        return faPlay;
      case "draft":
        return faClock;
      default:
        return faBookOpen;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "active":
        return "primary";
      case "draft":
        return "warning";
      default:
        return "secondary";
    }
  };

  const handleEditCourse = () => {
    navigate(`/${userType}/course-editor/${course.id}`);
  };

  const handleViewCourse = () => {
    if (userType === "student") {
      navigate(`/student/course-viewer/${course.id}`);
    } else {
      navigate(`/${userType}/course-editor/${course.id}`);
    }
  };

  const renderStudentView = () => (
    <div className="course-card">
      <div className="course-card-decoration">
        <FontAwesomeIcon icon={faGraduationCap} />
      </div>

      <div className="course-card-content">
        <div className="course-header">
          <div className="course-icon">
            <FontAwesomeIcon icon={getStatusIcon(course.status)} />
          </div>
          <div className="course-info">
            <h3 className="course-name">{course.name || course.title}</h3>
            <p className="course-subject">{course.subject}</p>
          </div>
          <span
            className={`course-status status-${getStatusColor(course.status)}`}
          >
            {course.status || "Active"}
          </span>
        </div>

        <p className="course-description">
          {course.description ||
            "Continue your learning journey with this comprehensive course"}
        </p>

        {/* Progress Bar for Students */}
        {course.progress && (
          <div className="progress-section">
            <div className="progress-info">
              <span>
                Lesson {course.currentLesson || 1}/{course.totalLessons || 10}
              </span>
              <span>{course.progress}% Complete</span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill ${getStatusColor(course.status)}`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="course-actions">
          {course.status === "completed" ? (
            <button
              className="action-button success"
              onClick={handleViewCourse}
            >
              <FontAwesomeIcon icon={faCheck} />
              <span>View Certificate</span>
            </button>
          ) : (
            <button
              className="action-button primary"
              onClick={handleViewCourse}
            >
              <FontAwesomeIcon icon={faPlay} />
              <span>Continue Learning</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderTeacherView = () => (
    <div className="course-card teacher-course-card">
      <div className="course-card-decoration">
        <FontAwesomeIcon icon={faGraduationCap} />
      </div>

      <div className="course-card-content">
        <div className="course-header">
          <div className="course-icon">
            <FontAwesomeIcon icon={getStatusIcon(course.status)} />
          </div>
          <div className="course-info">
            <h3 className="course-name">{course.name || course.title}</h3>
            <p className="course-subject">{course.subject}</p>
          </div>
          <span
            className={`course-status status-${getStatusColor(course.status)}`}
          >
            {course.status || "Draft"}
          </span>
        </div>

        <p className="course-description">
          {course.description || "Course description not available"}
        </p>

        {/* Teacher Stats */}
        <div className="teacher-stats">
          <div className="stat-item">
            <FontAwesomeIcon icon={faUsers} />
            <span>{course.assignedStudents?.length || 0} Students</span>
          </div>
          <div className="stat-item">
            <FontAwesomeIcon icon={faBookOpen} />
            <span>
              {course.sections?.reduce(
                (total, section) => total + (section.lessons?.length || 0),
                0
              ) || 0}{" "}
              Lessons
            </span>
          </div>
        </div>

        <div className="course-actions teacher-actions">
          <button
            className="action-button secondary"
            onClick={handleViewCourse}
          >
            <FontAwesomeIcon icon={faEye} />
            <span>Preview</span>
          </button>
          <button className="action-button primary" onClick={handleEditCourse}>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
            <span>Edit Content</span>
          </button>
          <button
            className="action-button danger"
            onClick={() => onDelete?.(course)}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );

  return userType === "teacher" ||
    userType === "admin" ||
    userType === "sub-admin"
    ? renderTeacherView()
    : renderStudentView();
}
