import React, { useState } from "react";

import instructors from "../../data/instructors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faBookOpen,
  faChevronDown,
  faFilter,
  faLocationDot,
  faMagnifyingGlass,
  faPhone,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faStar } from "@fortawesome/free-regular-svg-icons";

export default function InstructorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sample instructor data
  // const instructors = [
  //   {
  //     id: 1,
  //     name: "Dr. Sarah Johnson",
  //     title: "Professor of Computer Science",
  //     department: "Computer Science",
  //     email: "s.johnson@university.edu",
  //     phone: "+1 (555) 123-4567",
  //     office: "CS Building, Room 301",
  //     image:
  //       "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
  //     rating: 4.9,
  //     students: 120,
  //     courses: 8,
  //     specializations: ["Machine Learning", "Data Science", "AI Ethics"],
  //     bio: "Dr. Johnson is a leading expert in machine learning with over 15 years of research experience. She has published numerous papers in top-tier conferences and mentored dozens of graduate students.",
  //     experience: "15+ years",
  //   },
  //   {
  //     id: 2,
  //     name: "Prof. Michael Chen",
  //     title: "Associate Professor of Mathematics",
  //     department: "Mathematics",
  //     email: "m.chen@university.edu",
  //     phone: "+1 (555) 234-5678",
  //     office: "Math Building, Room 205",
  //     image:
  //       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  //     rating: 4.8,
  //     students: 95,
  //     courses: 6,
  //     specializations: ["Calculus", "Statistics", "Mathematical Modeling"],
  //     bio: "Prof. Chen specializes in applied mathematics and has extensive experience in mathematical modeling for real-world applications.",
  //     experience: "12+ years",
  //   },
  //   {
  //     id: 3,
  //     name: "Dr. Emily Rodriguez",
  //     title: "Assistant Professor of Physics",
  //     department: "Physics",
  //     email: "e.rodriguez@university.edu",
  //     phone: "+1 (555) 345-6789",
  //     office: "Physics Lab, Room 102",
  //     image:
  //       "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  //     rating: 4.7,
  //     students: 78,
  //     courses: 5,
  //     specializations: [
  //       "Quantum Physics",
  //       "Thermodynamics",
  //       "Research Methods",
  //     ],
  //     bio: "Dr. Rodriguez is passionate about quantum physics research and making complex physics concepts accessible to undergraduate students.",
  //     experience: "8+ years",
  //   },
  //   {
  //     id: 4,
  //     name: "Prof. David Kim",
  //     title: "Professor of Business Administration",
  //     department: "Business",
  //     email: "d.kim@university.edu",
  //     phone: "+1 (555) 456-7890",
  //     office: "Business Center, Room 401",
  //     image:
  //       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  //     rating: 4.6,
  //     students: 150,
  //     courses: 10,
  //     specializations: [
  //       "Strategic Management",
  //       "Leadership",
  //       "International Business",
  //     ],
  //     bio: "Prof. Kim brings 20+ years of industry experience to the classroom, having worked as a consultant for Fortune 500 companies.",
  //     experience: "20+ years",
  //   },
  //   {
  //     id: 5,
  //     name: "Dr. Lisa Thompson",
  //     title: "Associate Professor of Psychology",
  //     department: "Psychology",
  //     email: "l.thompson@university.edu",
  //     phone: "+1 (555) 567-8901",
  //     office: "Psychology Building, Room 203",
  //     image:
  //       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
  //     rating: 4.9,
  //     students: 110,
  //     courses: 7,
  //     specializations: [
  //       "Cognitive Psychology",
  //       "Research Psychology",
  //       "Behavioral Analysis",
  //     ],
  //     bio: "Dr. Thompson's research focuses on cognitive processes and human behavior, with numerous publications in leading psychology journals.",
  //     experience: "14+ years",
  //   },
  //   {
  //     id: 6,
  //     name: "Prof. James Wilson",
  //     title: "Professor of Engineering",
  //     department: "Engineering",
  //     email: "j.wilson@university.edu",
  //     phone: "+1 (555) 678-9012",
  //     office: "Engineering Hall, Room 305",
  //     image:
  //       "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  //     rating: 4.8,
  //     students: 85,
  //     courses: 9,
  //     specializations: [
  //       "Mechanical Engineering",
  //       "Robotics",
  //       "Design Engineering",
  //     ],
  //     bio: "Prof. Wilson is a renowned mechanical engineer with expertise in robotics and automation systems.",
  //     experience: "18+ years",
  //   },
  // ];

  const departments = [
    "all",
    "Computer Science",
    "Mathematics",
    "Physics",
    "Business",
    "Psychology",
    "Engineering",
  ];

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.specializations.some((spec) =>
        spec.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDepartment =
      selectedDepartment === "all" ||
      instructor.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="instructors-page">
      {/* Header Section */}
      <section className="instructors-header">
        <div className="container">
          <div className="header-content">
            <h1>Meet Our Instructors</h1>
            <p>
              Connect with our world-class faculty members who are dedicated to
              your academic success
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-filters">
            <div className="search-bar">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon"
              />
              <input
                type="text"
                placeholder="Search instructors by name, title, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-controls">
              <button
                className="filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FontAwesomeIcon icon={faFilter} />
                Filters
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`chevron ${showFilters ? "open" : ""}`}
                />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="instructors-grid-section">
        <div className="container">
          <div className="results-header">
            <h2>Our Faculty ({filteredInstructors.length})</h2>
          </div>

          <div className="instructors-grid">
            {filteredInstructors.map((instructor) => (
              <div key={instructor.id} className="instructor-card">
                <div className="card-header">
                  <div className="instructor-avatar">
                    <img src={instructor.image} alt={instructor.name} />
                    <div className="rating-badge">
                      <FontAwesomeIcon icon={faStar} className="star-icon" />
                      {instructor.rating}
                    </div>
                  </div>
                  <div className="instructor-info">
                    <h3>{instructor.name}</h3>
                    <p className="title">{instructor.title}</p>
                    <span className="department">{instructor.department}</span>
                  </div>
                </div>

                <div className="card-stats">
                  <div className="stat">
                    <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                    <span>{instructor.students} Students</span>
                  </div>
                  <div className="stat">
                    <FontAwesomeIcon icon={faBookOpen} className="stat-icon" />
                    <span>{instructor.courses} Courses</span>
                  </div>
                  <div className="stat">
                    <FontAwesomeIcon icon={faAward} className="stat-icon" />
                    <span>{instructor.experience}</span>
                  </div>
                </div>

                <div className="specializations">
                  <h4>Specializations</h4>
                  <div className="spec-tags">
                    {instructor.specializations.map((spec, index) => (
                      <span key={index} className="spec-tag">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bio">
                  <p>{instructor.bio}</p>
                </div>

                <div className="contact-info">
                  <div className="contact-item">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="contact-icon"
                    />
                    <span>{instructor.email}</span>
                  </div>
                  <div className="contact-item">
                    <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                    <span>{instructor.phone}</span>
                  </div>
                  <div className="contact-item">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="contact-icon"
                    />
                    <span>{instructor.office}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn-primary">View Profile</button>
                  <button className="btn-secondary">Contact</button>
                </div>
              </div>
            ))}
          </div>

          {filteredInstructors.length === 0 && (
            <div className="no-results">
              <h3>No instructors found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
