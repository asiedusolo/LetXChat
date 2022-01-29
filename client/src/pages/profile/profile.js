import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      console.log(username);
      const response = await axios.get(
        `http://localhost:5000/api/user?username=${username}`
      );
      setUser(response.data);
    };
    fetchUser();
  }, [username]);

  return (
    <div className="profilePage">
      <div className="userProfileData">
        <div className="userProfileWrapper">
          <h3 className="userName">{user.name}</h3>
          <img
            alt="profilePic"
            src={
              user.picture_avatar
                ? user.picture_avatar
                : `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`
            }
            className="userImage"
          />
          <h3>{user.username}</h3>
          <h3>{user.staff_email}</h3>
          <input type="file" name="picturePicture" />
          <button type="submit">Upload profile</button>
        </div>
      </div>
      <div className="userProfileEdit">
        <form className="userProfileForm">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="profileTextField"
          />
          <br />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="profileTextField"
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="profilePasswordField"
          />
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="profilePasswordField"
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
