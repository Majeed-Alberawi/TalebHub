import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faPlus,
  faSearch,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import AddEntityForm from "./AddEntityForm";

export default function DataManagementTable({
  data = [],
  title = "Data Management",
  entityName = "item",
  entityNamePlural = "items",
  searchPlaceholder = "Search items...",
  itemsPerPage = 6,
  roleOptions = [
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
    { value: "admin", label: "Administrator" },
  ],
  showAdditionalFields = false,
}) {
  const [items, setItems] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleView = (item) => {
    console.log(`View ${entityName}:`, item);
    // Add view logic here
  };

  const handleEdit = (item) => {
    console.log(`Edit ${entityName}:`, item);
    // Add edit logic here
  };

  const handleDelete = (itemId) => {
    const confirmMessage = `Are you sure you want to delete this ${entityName}?`;
    if (window.confirm(confirmMessage)) {
      setItems(items.filter((item) => item.id !== itemId));
    }
  };

  const handleAddItem = () => {
    setShowAddForm(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Generate a new ID (in a real app, this would come from your backend)
      const newId = Math.max(...items.map((item) => item.id || 0), 0) + 1;

      const newItem = {
        ...formData,
        id: newId,
      };

      // Add the new item to the list
      setItems((prevItems) => [...prevItems, newItem]);

      // Close the form
      setShowAddForm(false);

      console.log(`${entityName} added successfully:`, newItem);

      // Optional: Show success message
      // You could add a toast notification here
    } catch (error) {
      console.error(`Error adding ${entityName}:`, error);
      // Handle error (show error message, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowAddForm(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="data-management">
      {/* Add Entity Form Modal/Overlay */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddEntityForm
              title={`Add New ${
                entityName.charAt(0).toUpperCase() + entityName.slice(1)
              }`}
              entityType={entityName}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isLoading}
              roleOptions={roleOptions}
              showAdditionalFields={showAdditionalFields}
            />
          </div>
        </div>
      )}

      <div className="data-management__header">
        <h2 className="data-management__title">{title}</h2>
        <button className="btn btn--primary" onClick={handleAddItem}>
          <FontAwesomeIcon icon={faPlus} className="icon" />
          Add {entityName.charAt(0).toUpperCase() + entityName.slice(1)}
        </button>
      </div>

      <div className="data-management__controls">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-box__icon" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box__input"
          />
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead className="data-table__head">
            <tr>
              <th className="data-table__header">Name</th>
              <th className="data-table__header">Email</th>
              <th className="data-table__header">Status</th>
              <th className="data-table__header">Role</th>
              <th className="data-table__header data-table__header--actions">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="data-table__body">
            {currentItems.map((item) => (
              <tr key={item.id} className="data-table__row">
                <td className="data-table__cell data-table__cell--name">
                  {item.name}
                </td>
                <td className="data-table__cell data-table__cell--email">
                  {item.email}
                </td>
                <td className="data-table__cell">
                  <span
                    className={`status-label status-label--${item.status?.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="data-table__cell">
                  <span className="role-label">{item.role}</span>
                </td>
                <td className="data-table__cell data-table__cell--actions">
                  <div className="action-buttons">
                    <button
                      className="btn btn--action btn--view"
                      onClick={() => handleView(item)}
                      title={`View ${
                        entityName.charAt(0).toUpperCase() + entityName.slice(1)
                      }`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="btn btn--action btn--edit"
                      onClick={() => handleEdit(item)}
                      title={`Edit ${
                        entityName.charAt(0).toUpperCase() + entityName.slice(1)
                      }`}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="btn btn--action btn--delete"
                      onClick={() => handleDelete(item.id)}
                      title={`Delete ${
                        entityName.charAt(0).toUpperCase() + entityName.slice(1)
                      }`}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentItems.length === 0 && (
          <div className="empty-state">
            <p>No {entityNamePlural} found matching your search criteria.</p>
          </div>
        )}
      </div>

      {filteredItems.length > 0 && (
        <div className="pagination">
          <button
            className="btn btn--pagination"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            title="Previous page"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous
          </button>

          <span className="pagination__info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn--pagination"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            Next
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      <div className="data-management__footer">
        <p className="data-count">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of{" "}
          {filteredItems.length} {entityNamePlural}
        </p>
      </div>
    </div>
  );
}
