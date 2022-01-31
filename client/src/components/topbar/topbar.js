import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/authcontext.js";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbar">
      <div className="profileSection">
        <div className="chatLogo">
          Let<span className="landingDescPart">X</span>Chat
        </div>
        <div className="userContainer">
          <p className="userName">{user.name}</p>
          <Link to={`/profile/${user.username}`}>
            <img
              alt="userPicture"
              src={
                user && user.picture_avatar
                  ? PF + user.picture_avatar
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
