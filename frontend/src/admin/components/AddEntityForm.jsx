import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faUserTag,
  faPhone,
  faMapMarkerAlt,
  faCalendarAlt,
  faEye,
  faEyeSlash,
  faSave,
  faTimes,
  faSpinner,
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

export default function AddEntityForm({
  title = "Add New Entity",
  entityType = "user",
  onSubmit = () => {},
  onCancel = () => {},
  isLoading = false,
  initialData = {},
  roleOptions = [
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
    { value: "admin", label: "Administrator" },
  ],
  showAdditionalFields = false,
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    password: initialData.password || "",
    confirmPassword: "",
    role: initialData.role || roleOptions[0]?.value || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
    dateOfBirth: initialData.dateOfBirth || "",
    status: initialData.status || "active",
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation (only for new entries)
    if (!initialData.id) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    // Phone validation (if provided)
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = !!initialData.id;

  return (
    <div className="add-entity-form">
      <div className="add-entity-form__header">
        <h2 className="add-entity-form__title">
          <FontAwesomeIcon
            icon={faUser}
            className="add-entity-form__title-icon"
          />
          {title}
        </h2>
        <button
          type="button"
          className="btn btn--icon btn--close"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <form className="add-entity-form__form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              <FontAwesomeIcon icon={faUser} className="form-label__icon" />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? "form-input--error" : ""}`}
              placeholder="Enter full name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="form-error">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                {errors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="form-label__icon" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${
                errors.email ? "form-input--error" : ""
              }`}
              placeholder="Enter email address"
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="form-error">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Field (only for new entries) */}
          {!isEditing && (
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                <FontAwesomeIcon icon={faLock} className="form-label__icon" />
                Password *
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.password ? "form-input--error" : ""
                  }`}
                  placeholder="Enter password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <span className="form-error">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.password}
                </span>
              )}
            </div>
          )}

          {/* Confirm Password Field (only for new entries) */}
          {!isEditing && (
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                <FontAwesomeIcon icon={faLock} className="form-label__icon" />
                Confirm Password *
              </label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.confirmPassword ? "form-input--error" : ""
                  }`}
                  placeholder="Confirm password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="form-error">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {/* Role Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="role">
              <FontAwesomeIcon icon={faUserTag} className="form-label__icon" />
              Role *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`form-select ${
                errors.role ? "form-select--error" : ""
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select a role</option>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className="form-error">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                {errors.role}
              </span>
            )}
          </div>

          {/* Status Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="status">
              <FontAwesomeIcon icon={faCheck} className="form-label__icon" />
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select"
              disabled={isSubmitting}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Additional Fields */}
          {showAdditionalFields && (
            <>
              {/* Phone Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="form-label__icon"
                  />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${
                    errors.phone ? "form-input--error" : ""
                  }`}
                  placeholder="Enter phone number"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <span className="form-error">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Date of Birth Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="dateOfBirth">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="form-label__icon"
                  />
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              {/* Address Field */}
              <div className="form-group form-group--full-width">
                <label className="form-label" htmlFor="address">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="form-label__icon"
                  />
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Enter address"
                  rows="3"
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <FontAwesomeIcon icon={faTimes} />
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} />
                {isEditing ? "Update" : "Create"} {entityType}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
