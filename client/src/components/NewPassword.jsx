import React, { useState } from "react";
import "./NewPassword.css"; // Import CSS for styling

const NewPassword = () => {
  // State variables for new password and confirm password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handler for input change in new password field
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Handler for input change in confirm password field
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling password submission, e.g., validation
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // You can add your logic for password validation here
  };

  return (
    <div className="new-password-container">
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label htmlFor="newPassword" className="password-label">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className="password-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="password-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="password-input"
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default NewPassword;
