import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditName from "../components/EditName";
import Account from "../components/Account";
import Button from "../components/Button";
import data from "../datas/data.json";
import { fetchProfile, updateProfileData } from "../features/profile/profileSlice"; 
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../features/profile/profileSlice"; 

// Hook pour gérer l'authentification et la récupération du profil
const useAuth = (navigate, dispatch) => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Si token n'est pas présent, redirige vers /login
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchProfile());
    }

    // Nettoyage du token lors du déchargement
    const handleBeforeUnload = () => localStorage.removeItem("token");
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [navigate, dispatch]);
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // Gestion du mode d'édition
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(selectProfile); // Sélection du profil complet depuis le store
  const loading = useSelector(selectProfileLoading); // Sélection de l'état de chargement
  const error = useSelector(selectProfileError); // Sélection des erreurs éventuelles

  // Utilisation du hook d'authentification
  useAuth(navigate, dispatch);

  // Fonction pour activer le mode édition
  const handleEditClick = () => setIsEditing(true);

  // Fonction pour annuler le mode édition
  const handleCancel = () => setIsEditing(false);

  // Fonction pour sauvegarder les modifications de l'utilisateur
  const handleSave = (newUserName) => {
    dispatch(updateProfileData(newUserName)).finally(() => setIsEditing(false));
  };

  // Gestion du rendu en fonction de l'état de chargement et des erreurs
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <EditName
            user={profile}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {profile?.userName ? <>{profile.userName}!</> : "User!"}
            </h1>
            <Button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </Button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {data.map((account, index) => (
        <Account
          key={`account-${index}`}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
};

export default Profile;
