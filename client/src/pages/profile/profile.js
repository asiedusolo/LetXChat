import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [fileData, setFileData] = useState();
  const [userPicture, setUserPicture] = useState("");
  const [profileUserName, setProfileUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/user?username=${username}`
      );
      setUser(response.data);
      setUserPicture(response.data.picture_avatar);
    };
    fetchUser();
  }, [username]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", fileData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        data
      );
      const updates = {
        picture_avatar: response.data.filename
      };
      try {
        const userResponse = await axios.put(
          `http://localhost:5000/api/user/${user._id}`,
          updates
        );
        setUserPicture(userResponse.data.picture_avatar);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const handleUserProfileEdit = async (e) => {
    e.preventDefault();
    let updates;
    if (password && password === confirmPassword && username) {
      updates = {
        username: profileUserName,
        password: password
      };
    } else if (password && password === confirmPassword && !username) {
      updates = {
        password: password
      };
    } else if (username && !password) {
      updates = {
        username: profileUserName
      };
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/${user._id}`,
        updates
      );
      setNewUsername(response.data.username);
      setProfileUserName("");
      alert("Details updated successfully");
    } catch (error) {
      console.log(error);
      alert("Username already exists or password mismatch");
    }
  };

  return (
    <div className="profilePage">
      <div className="userProfileData">
        <div className="userProfileWrapper">
          <h3 className="userName">{user.name}</h3>
          <img
            alt="profilePic"
            src={
              user && user.picture_avatar
                ? PF + `${userPicture ? userPicture : user.picture_avatar}`
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
            className="userImage"
          />
          <h3 className="userUsername">
            {newUsername ? newUsername : user.username}
          </h3>
          <h3 className="userEmail">{user.staff_email}</h3>
          <form onSubmit={onSubmitHandler}>
            <input
              type="file"
              name="picturePicture"
              onChange={fileChangeHandler}
              className="userInputFile"
            />
            <button className="changeProfile" type="submit">
              Change profile
            </button>
          </form>
        </div>
      </div>
      <div className="userProfileEdit">
        <form className="userProfileForm" onSubmit={handleUserProfileEdit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="profileTextField"
            value={profileUserName}
            onChange={(e) => setProfileUserName(e.target.value)}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="profilePasswordField"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="profilePasswordField"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="profileEditButton">
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
