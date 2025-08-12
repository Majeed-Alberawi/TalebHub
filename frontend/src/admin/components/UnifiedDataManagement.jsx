import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faPlus,
  faSearch,
  faChevronLeft,
  faChevronRight,
  faUserPlus,
  faBook,
  faUser,
  // faUsers,
  faTimes,
  faSave,
  // faDownload,
  faFileExcel,
  faUserGraduate,
  faUserShield,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

// Navigation utilities
const navigateToCourseEditor = (lessonData) => {
  sessionStorage.setItem("currentLessonData", JSON.stringify(lessonData));
  const courseEditorUrl = `/course-editor/${lessonData.id}`;
  window.open(courseEditorUrl, "_blank");
};

// Default configurations for different entity types
const entityConfigs = {
  courses: {
    title: "Courses Management",
    entityName: "courses",
    entityNamePlural: "courses",
    searchPlaceholder: "Search courses...",
    icon: faBook,
    columns: [
      { key: "name", label: "Lesson Name", type: "lesson-info" },
      { key: "createdBy", label: "Created By", type: "text" },
      { key: "subject", label: "Subject", type: "subject" },
      {
        key: "assignedStudents",
        label: "Assigned Students",
        type: "assigned-students",
      },
      { key: "status", label: "Status", type: "status" },
    ],
    actions: ["view", "edit", "assign", "export", "delete"],
    filters: [
      {
        key: "status",
        label: "All Status",
        options: ["all", "active", "draft", "inactive"],
      },
      {
        key: "subject",
        label: "All Subjects",
        options: [
          "all",
          "Computer Science",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "History",
          "Literature",
          "Art",
        ],
      },
    ],
    formFields: [
      { key: "name", label: "Lesson Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", rows: 4 },
      {
        key: "subject",
        label: "Subject",
        type: "select",
        required: true,
        options: [
          "Computer Science",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "History",
          "Literature",
          "Art",
        ],
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Draft", "Active", "Inactive"],
      },
    ],
    assignmentField: "assignedStudents",
    exportData: (item, assignedData) => ({
      "Lesson Title": item.name,
      Subject: item.subject,
      "Student Name": assignedData.name,
      "Student Email": assignedData.email,
      "Student Status": assignedData.status,
      Grade: assignedData.grade || "N/A",
      "Enrollment Date": assignedData.enrollmentDate || "N/A",
      "Assignment Date": new Date().toLocaleDateString(),
      "Lesson Status": item.status,
      "Created By": item.createdBy,
    }),
  },

  users: {
    title: "User Management",
    entityName: "user",
    entityNamePlural: "users",
    searchPlaceholder: "Search users...",
    icon: faUser,
    columns: [
      { key: "name", label: "Name", type: "name" },
      { key: "email", label: "Email", type: "email" },
      { key: "role", label: "Role", type: "role" },
      { key: "status", label: "Status", type: "status" },
    ],
    actions: ["view", "edit", "delete"],
    filters: [
      {
        key: "status",
        label: "All Status",
        options: ["all", "active", "inactive"],
      },
      {
        key: "role",
        label: "All Roles",
        options: ["all", "teacher", "student", "admin"],
      },
    ],
    formFields: [
      { key: "name", label: "Full Name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      {
        key: "role",
        label: "Role",
        type: "select",
        required: true,
        options: ["teacher", "student", "admin"],
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Active", "Inactive"],
      },
    ],
  },

  students: {
    title: "Students Management",
    entityName: "student",
    entityNamePlural: "students",
    searchPlaceholder: "Search students...",
    icon: faUserGraduate,
    columns: [
      { key: "name", label: "Student Name", type: "name" },
      { key: "email", label: "Email", type: "email" },
      { key: "role", label: "Role", type: "role" },
      { key: "enrollmentDate", label: "Enrollment Date", type: "text" },
      { key: "status", label: "Status", type: "status" },
    ],
    actions: ["view", "edit", "export", "delete"],
    filters: [
      {
        key: "status",
        label: "All Status",
        options: ["all", "active", "inactive"],
      },
      {
        key: "enrollmentDate",
        label: "Enrollment Year",
        options: ["all", "2024", "2023", "2022"],
      },
    ],
    formFields: [
      { key: "name", label: "Full Name", type: "text", required: true },
      { key: "email", label: "Student Email", type: "email", required: true },
      {
        key: "role",
        label: "Role",
        type: "select",
        required: true,
        options: ["Student"],
        defaultValue: "Student",
      },
      {
        key: "enrollmentDate",
        label: "Enrollment Date",
        type: "date",
        required: true,
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: ["Active", "Inactive"],
      },
    ],
    exportData: (student) => ({
      "Student Name": student.name,
      Email: student.email,
      Role: student.role,
      "Enrollment Date": student.enrollmentDate,
      Status: student.status,
      "Export Date": new Date().toLocaleDateString(),
    }),
  },

  subadmins: {
    title: "Sub-Admins Management",
    entityName: "sub-admin",
    entityNamePlural: "sub-admins",
    searchPlaceholder: "Search sub-admins...",
    icon: faUserShield,
    columns: [
      { key: "name", label: "Name", type: "name" },
      { key: "email", label: "Email", type: "email" },
      { key: "department", label: "Department", type: "subject" },
      { key: "role", label: "Role", type: "role" },
      { key: "status", label: "Status", type: "status" },
    ],
    actions: ["view", "edit", "export", "delete"],
    filters: [
      {
        key: "status",
        label: "All Status",
        options: ["all", "active", "inactive"],
      },
      {
        key: "department",
        label: "All Departments",
        options: ["all", "IT", "HR", "Finance", "Academic", "Operations"],
      },
    ],
    formFields: [
      { key: "name", label: "Full Name", type: "text", required: true },
      {
        key: "email",
        label: "University Email",
        type: "email",
        required: true,
      },
      {
        key: "department",
        label: "Department",
        type: "select",
        required: true,
        options: ["IT", "HR", "Finance", "Academic", "Operations"],
      },
      {
        key: "role",
        label: "Admin Role",
        type: "select",
        required: true,
        options: ["Sub-Admin", "Department Head", "System Admin"],
      },
      {
        key: "permissions",
        label: "Permissions & Responsibilities",
        type: "textarea",
        rows: 4,
      },
      {
        key: "status",
        label: "Account Status",
        type: "select",
        options: ["Active", "Inactive", "Suspended"],
      },
    ],
    exportData: (item) => ({
      Name: item.name,
      Email: item.email,
      Department: item.department,
      Role: item.role,
      Status: item.status,
      Permissions: item.permissions || "N/A",
      "Export Date": new Date().toLocaleDateString(),
    }),
  },
};

// Excel export utility functions
const generateExcelData = (item, config, assignableData = []) => {
  if (!config.exportData) return [];

  if (config.assignmentField && item[config.assignmentField]) {
    const assignedList = item[config.assignmentField] || [];
    return assignedList.map((assignedName) => {
      const assignedItem = assignableData.find((d) => d.name === assignedName);
      return config.exportData(item, assignedItem || { name: assignedName });
    });
  } else {
    return [config.exportData(item)];
  }
};

const downloadExcel = (data, filename) => {
  if (data.length === 0) {
    alert("No data to export!");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((header) => `"${row[header] || ""}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default function UnifiedDataManagement({
  entityType = "courses",
  initialData = null,
  customConfig = null,
  assignableData = [],
}) {
  const config = customConfig || entityConfigs[entityType];

  const [items, setItems] = useState(initialData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});

  // Initialize filters
  useEffect(() => {
    const initialFilters = {};
    config.filters?.forEach((filter) => {
      initialFilters[filter.key] = "all";
    });
    setFilters(initialFilters);
  }, [config.filters]);

  // Listen for lesson updates from course editor
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "LESSON_UPDATED") {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === event.data.data.id ? event.data.data : item
          )
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Form state
  const [formData, setFormData] = useState(() => {
    const initial = {};
    config.formFields.forEach((field) => {
      initial[field.key] =
        field.type === "select" && field.options ? field.options[0] : "";
    });
    return initial;
  });

  const itemsPerPage = 6;

  // Filter items based on search term and filters
  const filteredItems = items.filter((item) => {
    const searchFields = [
      "name",
      "email",
      "createdBy",
      "subject",
      "department",
    ];
    const matchesSearch = searchFields.some((field) =>
      item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilters = Object.entries(filters).every(
      ([filterKey, filterValue]) => {
        if (filterValue === "all") return true;
        if (filterKey === "enrollmentDate" && filterValue !== "all") {
          return item[filterKey]?.includes(filterValue);
        }
        return item[filterKey]?.toLowerCase() === filterValue.toLowerCase();
      }
    );

    return matchesSearch && matchesFilters;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleCreate = () => {
    const resetForm = {};
    config.formFields.forEach((field) => {
      if (field.type === "select" && field.options) {
        resetForm[field.key] = field.defaultValue || field.options[0];
      } else {
        resetForm[field.key] = "";
      }
    });
    setFormData(resetForm);
    setSelectedItem(null);
    setShowCreateForm(true);
  };

  const handleEdit = (item) => {
    const editForm = {};
    config.formFields.forEach((field) => {
      editForm[field.key] = item[field.key] || "";
    });
    setFormData(editForm);
    setSelectedItem(item);
    setShowEditForm(true);
  };

  const handleView = (item) => {
    if (entityType === "courses") {
      // Open course editor in new tab with lesson data
      navigateToCourseEditor(item);
    } else {
      console.log(`View ${config.entityName}:`, item);
      // You can add custom view logic for other entity types here
    }
  };

  const handleDelete = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    if (
      window.confirm(
        `Are you sure you want to delete "${item?.name || item?.email}"?`
      )
    ) {
      setItems(items.filter((item) => item.id !== itemId));
    }
  };

  const handleAssign = (item) => {
    setSelectedItem(item);
    setShowAssignModal(true);
  };

  const handleExport = (item) => {
    const excelData = generateExcelData(item, config, assignableData);
    const filename = `${item.name?.replace(/[^a-zA-Z0-9]/g, "_") || "Export"}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    downloadExcel(excelData, filename);
  };

  const handleFormSubmit = async () => {
    const requiredFields = config.formFields.filter((field) => field.required);
    const isValid = requiredFields.every((field) =>
      formData[field.key]?.trim()
    );

    if (!isValid) return;

    setIsLoading(true);

    try {
      if (selectedItem) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  ...formData,
                  ...(entityType === "courses" && {
                    courseData: { ...item.courseData, title: formData.name },
                  }),
                }
              : item
          )
        );
        setShowEditForm(false);
      } else {
        const newId = Math.max(...items.map((item) => item.id || 0), 0) + 1;
        const newItem = {
          id: newId,
          ...formData,
          ...(entityType === "courses" && {
            createdBy: "Current User",
            assignedStudents: [],
            courseData: { id: newId, title: formData.name, sections: [] },
          }),
        };
        setItems((prevItems) => [...prevItems, newItem]);
        setShowCreateForm(false);
      }

      const resetForm = {};
      config.formFields.forEach((field) => {
        resetForm[field.key] =
          field.type === "select" && field.options ? field.options[0] : "";
      });
      setFormData(resetForm);
    } catch (error) {
      console.error(`Error saving ${config.entityName}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignSubmit = (assignedItems) => {
    const assignmentField = config.assignmentField || "assignedTo";
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === selectedItem.id
          ? { ...item, [assignmentField]: assignedItems }
          : item
      )
    );
    setShowAssignModal(false);
  };

  const renderCellContent = (item, column) => {
    const value = item[column.key];

    switch (column.type) {
      case "lesson-info":
        return (
          <div className="lesson-info">
            <FontAwesomeIcon icon={config.icon} className="lesson-icon" />
            <div>
              <div className="lesson-name">{value}</div>
              <div className="lesson-description">{item.description}</div>
            </div>
          </div>
        );

      case "name":
        return <span className="item-name">{value}</span>;

      case "email":
        return <span className="item-email">{value}</span>;

      case "subject":
        return <span className="subject-label">{value}</span>;

      case "role":
        return <span className="role-label">{value}</span>;

      case "assigned-students":
        return (
          <div className="assigned-students">
            {value && value.length > 0 ? (
              <>
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="students-icon"
                />
                <span>
                  {value.length} student{value.length !== 1 ? "s" : ""} assigned
                </span>
                <div className="assigned-list">
                  {value.map((studentName, index) => (
                    <span key={index} className="assigned-student">
                      {studentName}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <span className="no-assignments">No students assigned</span>
            )}
          </div>
        );

      case "status":
        return (
          <span
            className={`status-label status-label--${value?.toLowerCase()}`}
          >
            {value}
          </span>
        );

      case "text":
        // Format enrollment date if it's a date field
        if (column.key === "enrollmentDate" && value) {
          return <span>{new Date(value).toLocaleDateString()}</span>;
        }
        return <span>{value}</span>;

      default:
        return <span>{value}</span>;
    }
  };

  const renderActions = (item) => {
    return (
      <div className="action-buttons">
        {config.actions.includes("view") && (
          <button
            className="btn btn-action btn-view"
            onClick={() => handleView(item)}
            title={
              entityType === "courses"
                ? "Edit Course Content (New Tab)"
                : `View ${config.entityName}`
            }
          >
            <FontAwesomeIcon
              icon={entityType === "courses" ? faExternalLinkAlt : faEye}
            />
          </button>
        )}
        {config.actions.includes("edit") && (
          <button
            className="btn btn-action btn-edit"
            onClick={() => handleEdit(item)}
            title={`Edit ${config.entityName}`}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        {config.actions.includes("assign") && (
          <button
            className="btn btn-action btn-assign"
            onClick={() => handleAssign(item)}
            title="Assign Items"
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        )}
        {config.actions.includes("export") && (
          <button
            className="btn btn-action btn-export"
            onClick={() => handleExport(item)}
            title="Export to Excel"
          >
            <FontAwesomeIcon icon={faFileExcel} />
          </button>
        )}
        {config.actions.includes("delete") && (
          <button
            className="btn btn-action btn-delete"
            onClick={() => handleDelete(item.id)}
            title={`Delete ${config.entityName}`}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="data-management">
      {/* Create/Edit Form Modal */}
      {(showCreateForm || showEditForm) && (
        <div className="modal-overlay">
          <div className="modal-content lesson-form-modal">
            <div className="modal-header">
              <h3>
                {selectedItem
                  ? `Edit ${config.entityName}`
                  : `Create New ${config.entityName}`}
              </h3>
              <button
                className="btn-close"
                onClick={() => {
                  setShowCreateForm(false);
                  setShowEditForm(false);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="lesson-form">
              {config.formFields.map((field) => (
                <div key={field.key} className="form-group">
                  <label htmlFor={field.key}>
                    {field.label} {field.required && "*"}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.key}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      placeholder={
                        field.placeholder ||
                        `Enter ${field.label.toLowerCase()}`
                      }
                      rows={field.rows || 3}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.key}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      value={formData[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                      placeholder={
                        field.placeholder ||
                        `Enter ${field.label.toLowerCase()}`
                      }
                    />
                  )}
                </div>
              ))}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    setShowEditForm(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={isLoading}
                  onClick={handleFormSubmit}
                >
                  <FontAwesomeIcon icon={faSave} />
                  {isLoading
                    ? "Saving..."
                    : selectedItem
                    ? `Update ${config.entityName}`
                    : `Create ${config.entityName}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && selectedItem && config.assignmentField && (
        <AssignmentModal
          item={selectedItem}
          assignableData={assignableData}
          assignmentField={config.assignmentField}
          onSubmit={handleAssignSubmit}
          onCancel={() => setShowAssignModal(false)}
          entityName={config.entityName}
        />
      )}

      <div className="data-management__header">
        <h2 className="data-management__title">{config.title}</h2>
        <button className="btn btn-primary" onClick={handleCreate}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
          Create{" "}
          {config.entityName.charAt(0).toUpperCase() +
            config.entityName.slice(1)}
        </button>
      </div>

      <div className="data-management__controls">
        <div className="filters-row">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-box__icon" />
            <input
              type="text"
              placeholder={config.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-box__input"
            />
          </div>

          {config.filters && config.filters.length > 0 && (
            <div className="filter-group">
              {config.filters.map((filter) => (
                <select
                  key={filter.key}
                  value={filters[filter.key] || "all"}
                  onChange={(e) =>
                    setFilters({ ...filters, [filter.key]: e.target.value })
                  }
                  className="filter-select"
                >
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option === "all"
                        ? filter.label
                        : option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead className="data-table__head">
            <tr>
              {config.columns.map((column) => (
                <th key={column.key} className="data-table__header">
                  {column.label}
                </th>
              ))}
              <th className="data-table__header data-table__header--actions">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="data-table__body">
            {currentItems.map((item) => (
              <tr key={item.id} className="data-table__row">
                {config.columns.map((column) => (
                  <td
                    key={column.key}
                    className={`data-table__cell ${
                      column.type === "lesson-info" || column.type === "name"
                        ? "data-table__cell--name"
                        : column.type === "email"
                        ? "data-table__cell--email"
                        : ""
                    }`}
                  >
                    {renderCellContent(item, column)}
                  </td>
                ))}
                <td className="data-table__cell data-table__cell--actions">
                  {renderActions(item)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentItems.length === 0 && (
          <div className="empty-state">
            <FontAwesomeIcon icon={config.icon} className="empty-icon" />
            <h3>No {config.entityNamePlural} found</h3>
            <p>
              No {config.entityNamePlural} match your search criteria. Try
              adjusting your filters or create a new {config.entityName}.
            </p>
          </div>
        )}
      </div>

      {filteredItems.length > 0 && (
        <div className="pagination">
          <button
            className="btn btn-pagination"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous
          </button>

          <span className="pagination__info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-pagination"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      <div className="data-management__footer">
        <p className="data-count">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of{" "}
          {filteredItems.length} {config.entityNamePlural}
        </p>
      </div>
    </div>
  );
}

// Generic Assignment Modal Component
function AssignmentModal({
  item,
  assignableData,
  assignmentField,
  onSubmit,
  onCancel,
  // entityName,
}) {
  const [selectedItems, setSelectedItems] = useState(
    item[assignmentField] || []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = assignableData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemToggle = (itemName) => {
    setSelectedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content assign-modal">
        <div className="modal-header">
          <h3>Assign to "{item.name || item.email}"</h3>
          <button className="btn-close" onClick={onCancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="assign-content">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-box__icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-box__input"
            />
          </div>

          <div className="users-list">
            {filteredData.map((data) => (
              <div key={data.id} className="user-item">
                <label className="user-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(data.name)}
                    onChange={() => handleItemToggle(data.name)}
                  />
                  <span className="checkmark"></span>
                  <div className="user-info">
                    <span className="user-name">{data.name}</span>
                    {data.email && (
                      <span className="user-email">{data.email}</span>
                    )}
                    {data.role && (
                      <span
                        className={`user-status status-${data.status?.toLowerCase()}`}
                      >
                        {data.role} {data.grade && `• Grade: ${data.grade}`}
                      </span>
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="selected-count">
            {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}{" "}
            selected
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onSubmit(selectedItems)}
          >
            <FontAwesomeIcon icon={faSave} />
            Save Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
