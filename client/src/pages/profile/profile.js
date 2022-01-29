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
        <h3>{user.name}</h3>
        <img
          alt="profilePic"
          src={
            user.picture_avatar
              ? user.picture_avatar
              : `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`
          }
        />
        <h3>{user.username}</h3>
        <h3>{user.staff_email}</h3>
        <input type="file" name="picturePicture" />
      </div>
      <div className="userProfileEdit">
        <form>
          <input type="text" name="name" placeholder="Full Name" />
          <br />
          <input type="text" name="username" placeholder="Username" />
          <br />
          <input type="password" name="password" placeholder="Password" />
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <br />
          <button type="submit">Edit Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
