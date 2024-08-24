import React, { useState, useEffect } from "react";
import Button from "../components/Button";

const EditName = ({ user, onCancel, onSave }) => {
  // État local pour gérer la modification du nom d'utilisateur
  const [newUserName, setNewUserName] = useState("");

  // Effet pour initialiser le nom d'utilisateur à la valeur actuelle du profil
  useEffect(() => {
    if (user) {
      setNewUserName(user.userName || "");
    }
  }, [user]);

  // Fonction pour gérer le clic sur le bouton de sauvegarde
  const handleSaveClick = (e) => {
    e.preventDefault();
    // Vérifie que le nom n'est pas vide ou constitué uniquement d'espaces
    if (newUserName.trim()) {
      onSave(newUserName);
    }
  };

  return (
    <div className="edit-name">
      <h2>Edit User Info</h2>
      <form onSubmit={handleSaveClick}>
        <div className="form-group">
          <label>
            User Name:
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder={user.userName}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            First Name:
            <input type="text" value={user.firstName || ''} disabled />
          </label>
        </div>
        <div className="form-group">
          <label>
            Last Name:
            <input type="text" value={user.lastName || ''} disabled />
          </label>
        </div>
        <div className="button-container">
          <Button type="submit" className="save-button">
            Save
          </Button>
          <Button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditName;
