import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="landingPage">
      <div className="landingImageLogoSection">
        <div className="landingPageImageWrapper">
          <h1 className="landingLogo">
            Let<span className="landingDescPart">X</span>Chat
          </h1>
          <img
            src="https://media.istockphoto.com/id/1142207515/photo/smiling-african-american-woman-chatting-on-smartphone-modern-technology-app.webp?b=1&s=170667a&w=0&k=20&c=HV2kHRP5nv3KXd-AlbCFLe8FOLGYpNDJareJ0OrvcNA="
            alt="landingPicture"
            className="landingPageImage"
          />
        </div>
      </div>
      <div className="landingConnectSection">
        <div className="landingDescription">
          <p className="landingConnect">Connect</p>
          <p className="landingShareWith">
            and <span className="landingShare">share</span> with
          </p>
          <p className="landingColleagues">colleagues</p>
        </div>
        <p className="landingBriefInfo">
          LetXChat is an instant group messaging app. A user can visit the site
          to create and have an account on LetXChat. The user can then login to
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
    </div>
  );
};

export default LandingPage;
