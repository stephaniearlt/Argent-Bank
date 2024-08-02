import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUser, updateUser } from "../store/slices/userSlice";
import { selectUser, selectUserToken } from "../selectors/userSelectors";
import EditName from "../components/EditName";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);

  useEffect(() => {
    console.log('Profile component rendered');
    if (token) {
      dispatch(profileUser(token)).then((response) => {
        console.log("Profile loaded:", response.payload);
      });
    }
  }, [token, dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (newUserName) => {
    dispatch(updateUser({ userName: newUserName, token }))
      .then(() => dispatch(profileUser(token))) // Recharge les données utilisateur après mise à jour
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
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
