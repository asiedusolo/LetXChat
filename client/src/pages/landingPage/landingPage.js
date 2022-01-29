import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <h1 className="landingLogo">
        Let<span className="landingDescPart">X</span>Chat
      </h1>
      <h3 className="landingDescription">
        Connect and{" "}
        <span className="landingDescPart">share with colleagues</span>
      </h3>
      <p className="landingBriefInfo">
        LetXChat is an instant group messaging app. A user can visit the site to
        create and have an account on LetXChat. The user can then login to
        acccess chat groups that he has been assigned to. User can send and
        receive text, pictures, audio and video to and from chat groups.
      </p>
      <div className="landing-btns-container">
        <button className="landingSignup">
          <Link className="landingRegLink" to="/register">
            Sign up
          </Link>
        </button>
        <button className="landingLogin">
          <Link className="landingRegLogin" to="/login">
            Login
          </Link>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
