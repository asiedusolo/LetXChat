import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/authcontext.js";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="topbar">
      <div className="profileSection">
        <div className="chatLogo">
          <h4>LetXChat</h4>
        </div>
        <div className="userContainer">
          <p class="userName">{user.name}</p>
          <Link to={`/profile/${user.username}`}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="profilePicture"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
