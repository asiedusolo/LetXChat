import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [fileData, setFileData] = useState();
  const [userPicture, setUserPicture] = useState("");
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
  console.log(userPicture);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", fileData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        data
      );
      console.log("Filename", response.data.filename);
      const updates = {
        picture_avatar: response.data.filename
      };
      try {
        const userResponse = await axios.put(
          `http://localhost:5000/api/user/${user._id}`,
          updates
        );
        console.log("user response", userResponse.data.picture_avatar);
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
                : PF + "Screenshot from 2022-01-27 20-11-19.png"
            }
            className="userImage"
          />
          <h3>{user.username}</h3>
          <h3>{user.staff_email}</h3>
          <form onSubmit={onSubmitHandler}>
            <input
              type="file"
              name="picturePicture"
              onChange={fileChangeHandler}
            />
            <button type="submit">Change profile</button>
          </form>
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
