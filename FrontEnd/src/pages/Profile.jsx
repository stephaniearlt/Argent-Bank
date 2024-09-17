import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditName from "../components/EditName";
import Account from "../components/Account";
import Button from "../components/Button";
import data from "../datas/data.json";
import {
  fetchProfile,
  updateProfileData,
  selectProfile,
  selectProfileStatus,
  selectProfileError,
} from "../features/profile/profileSlice";
import { selectUserToken } from "../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const status = useSelector(selectProfileStatus);
  const error = useSelector(selectProfileError);
  const token = useSelector(selectUserToken);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile());
    }
  }, [dispatch, token]);

  const handleSave = (newUserName) => {
    if (token) {
      dispatch(updateProfileData({ userName: newUserName })).finally(() =>
        setIsEditing(false)
      );
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p className="error-message">{error}</p>;

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? (
          <EditName
            user={profile}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
          />
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {profile?.firstName ? (
                <>
                  {profile.firstName} {profile.lastName}!
                </>
              ) : (
                "User!"
              )}
            </h1>
            <Button className="edit-button" onClick={() => setIsEditing(true)}>
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
