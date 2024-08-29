import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditName from "../components/EditName";
import Account from "../components/Account";
import Button from "../components/Button";
import data from "../datas/data.json";
import {
  fetchProfile,
  updateProfileData,
} from "../features/profile/profileSlice";
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../features/profile/profileSlice";

// Authentification et récupération du profil
const useAuth = (navigate, dispatch) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Si token absent, redirection /login
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchProfile());
    }
    // Nettoyage si rafraichissement de la page
    const handleBeforeUnload = () => localStorage.removeItem("token");
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, dispatch]);
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  // Envoi des actions au store Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sélection des données depuis le store Redux
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);

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

  // Gestion des états de chargement et des erreurs
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
              {profile?.firstName ? (
                <>
                  {profile.firstName} {profile.lastName} !
                </>
              ) : (
                "User!"
              )}
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
