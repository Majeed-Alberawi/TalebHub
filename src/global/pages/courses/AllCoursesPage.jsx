import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUsers,
  faClock,
  faSearch,
  // faFilter,
  faSort,
  faList,
  faGraduationCap,
  faBookmark,
  faPlay,
  faTooth,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";

// Sample dentistry course data
import courses from "../../data/courses";

export default function AllCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");

  // Get unique filter options
  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category)),
  ];
  const levels = ["All", ...new Set(courses.map((course) => course.level))];
  const subjects = ["All", ...new Set(courses.map((course) => course.subject))];
  const semesters = [
    "All",
    ...new Set(courses.map((course) => course.semester)),
  ];

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      const matchesSubject =
        selectedSubject === "All" || course.subject === selectedSubject;
      const matchesSemester =
        selectedSemester === "All" || course.semester === selectedSemester;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesSubject &&
        matchesSemester
      );
    });

    // Sort courses
    switch (sortBy) {
      case "popular":
        return filtered.sort((a, b) => b.students - a.students);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "newest":
        return filtered.sort(
          (a, b) => new Date(b.semester) - new Date(a.semester)
        );
      case "duration":
        return filtered.sort((a, b) => {
          const getDuration = (dur) => {
            const hours = parseFloat(dur.match(/(\d+)h/)?.[1] || 0);
            const minutes = parseFloat(dur.match(/(\d+)m/)?.[1] || 0);
            return hours * 60 + minutes;
          };
          return getDuration(b.duration) - getDuration(a.duration);
        });
      case "lessons":
        return filtered.sort((a, b) => b.lessonsCount - a.lessonsCount);
      default:
        return filtered;
    }
  }, [
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedSubject,
    selectedSemester,
    sortBy,
  ]);

  return (
    <div className="all-courses-page">
      <div className="container">
        {/* Header Section */}
        <div className="page-header">
          <div className="header-content">
            <div className="header-icon">
              <FontAwesomeIcon icon={faTooth} />
            </div>
            <h1>Dentistry Course Library</h1>
            <p>
              Learn from your fellow dental students • {courses.length} courses
              available
            </p>
            <div className="header-stats">
              <div className="stat">
                <FontAwesomeIcon icon={faGraduationCap} />
                <span>Student-Created Content</span>
              </div>
              <div className="stat">
                <FontAwesomeIcon icon={faUsers} />
                <span>
                  {courses.reduce((acc, course) => acc + course.students, 0)}{" "}
                  Students Enrolled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="filters-section">
          <div className="search-container">
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Search courses, instructors, or subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-controls">
            <div className="filter-row">
              <div className="filter-group">
                <label>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Semester</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  {semesters.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="controls-row">
              <div className="sort-group">
                <FontAwesomeIcon icon={faSort} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="duration">Longest Duration</option>
                  <option value="lessons">Most Lessons</option>
                </select>
              </div>

              <div className="view-toggle">
                <button
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                >
                  <FontAwesomeIcon icon={faGrip} />
                </button>
                <button
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                  title="List View"
                >
                  <FontAwesomeIcon icon={faList} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            <strong>{filteredAndSortedCourses.length}</strong> courses found
            {searchTerm && (
              <span>
                {" "}
                for "<em>{searchTerm}</em>"
              </span>
            )}
          </p>
        </div>

        {/* Courses Grid/List */}
        <div className={`courses-container ${viewMode}`}>
          {filteredAndSortedCourses.map((course) => (
            <div key={course.id} className={`course-card ${viewMode}`}>
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-badges">
                  {course.isPopular && (
                    <span className="badge popular">Popular</span>
                  )}
                  <span className="badge level">{course.level}</span>
                </div>
                <div className="course-overlay">
                  <button className="play-btn">
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                </div>
              </div>

              <div className="course-content">
                <div className="course-meta">
                  <span className="course-category">{course.category}</span>
                  <span className="course-semester">{course.semester}</span>
                </div>

                <h3 className="course-title">{course.title}</h3>

                <div className="instructor-info">
                  <div className="instructor-details">
                    <p className="instructor-name">by {course.instructor}</p>
                    <p className="instructor-year">
                      {course.studentYear} Student • {course.university}
                    </p>
                  </div>
                </div>

                {viewMode === "list" && (
                  <div className="course-description">
                    <p>{course.description}</p>
                    <p className="prerequisites">
                      <strong>Prerequisites:</strong> {course.prerequisites}
                    </p>
                  </div>
                )}

                <div className="course-stats">
                  <div className="stat rating">
                    <FontAwesomeIcon icon={faStar} />
                    <span>{course.rating}</span>
                  </div>
                  <div className="stat students">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>{course.students}</span>
                  </div>
                  <div className="stat duration">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="stat lessons">
                    <FontAwesomeIcon icon={faPlay} />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                </div>

                <div className="course-actions">
                  <button className="btn-primary">Start Learning</button>
                  <button className="btn-secondary">
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedCourses.length === 0 && (
          <div className="no-results">
            <FontAwesomeIcon icon={faSearch} className="no-results-icon" />
            <h3>No courses found</h3>
            <p>
              Try adjusting your search criteria or filters to find relevant
              courses
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedLevel("All");
                setSelectedSubject("All");
                setSelectedSemester("All");
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
