import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUser, updateUser } from "../store/slices/userSlice";
import { selectUser, selectUserToken } from "../selectors/userSelectors";
import EditName from "../components/EditName";
import Account from "../components/Account";
import Button from "../components/Button";
import data from "../datas/data.json";

const Profile = () => {
  // États locaux pour gérer le mode édition et les comptes utilisateur
  const [isEditing, setIsEditing] = useState(false);
  const [accounts, setAccounts] = useState([]);

  // Hooks pour accéder aux fonctions et store de Redux
  const user = useSelector(selectUser);
  const token = useSelector(selectUserToken);
  const dispatch = useDispatch();

  // Vérifie si le token n'est pas présent
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Déclenche l'action pour récupérer les données utilisateur
    dispatch(profileUser(token)).then((response) => {
      if (response.payload) {
        // Charge les données uniquement si l'utilisateur est authentifié
        setAccounts(data);
      } else {
        // Redirige vers la page de connexion si la réponse est invalide
        window.location.href = "/login";
      }
    });
  }, [token, dispatch]);

  // Fonction pour activer le mode édition
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Fonction pour annuler le mode édition
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Fonction pour sauvegarder les modifications de l'utilisateur
  const handleSave = (newUserName) => {
    dispatch(updateUser({ userName: newUserName, token }))
      // Recharge les données utilisateur après mise à jour
      .then(() => dispatch(profileUser(token)))
      // Désactive le mode édition
      .finally(() => setIsEditing(false));
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <EditName user={user} onCancel={handleCancel} onSave={handleSave} />
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {user && user.firstName && user.lastName ? (
                <>
                  {user.firstName} {user.lastName}!
                </>
              ) : (
                "User!"
              )}
            </h1>
            <Button className="edit-button" onClick={handleEditClick}>Edit Name</Button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
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