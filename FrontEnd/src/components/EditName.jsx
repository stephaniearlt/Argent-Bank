import React, { useState } from "react";

const EditName = ({ user, onCancel, onSave }) => {
  const [newUserName, setNewUserName] = useState(user.userName || "");

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (newUserName.trim()) {
      onSave(newUserName);
    }
  };

  return (
    <div className="edit-name">
      <h2>Edit user info</h2>
      <form onSubmit={handleSaveClick}>
        <label>
          User Name:
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder={user.userName}
          />
        </label>
        <label>
          First Name:
          <input type="text" value={user.firstName} disabled />
        </label>
        <label>
          Last Name:
          <input type="text" value={user.lastName} disabled />
        </label>
        <button type="submit" className="edit-button">Save</button>
        <button type="button" className="edit-button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditName;
