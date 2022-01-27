import React from "react";
import { Link } from 'react-router-dom'
import './landingPage.css'

const LandingPage = () => {
  return (
    <div className="landingPage">
      <h1 className="logo">LetXChat</h1>
      <h3 className="description">Connect and share with colleagues</h3>
      <p className="briefInfo">LetXChat is an instant group messaging app. A user can visit the site to create and have an account on LetXChat. The user can then login to acccess chat groups that he has been assigned to. User can send and receive text, pictures, audio and video to and from chat groups.</p>
      <div className="btns-container">
      <button className="signup"><Link className="regLink" to="/register">Sign up</Link></button>
      <button className="login"><Link className="regLogin" to="/login">Login</Link></button>
      </div>
    </div>
  );
};

export default LandingPage;
