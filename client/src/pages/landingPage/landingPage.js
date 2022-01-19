import React from "react";
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <button><Link to="/register">Sign up</Link></button>
      <button><Link to="/login">Login</Link></button>
    </div>
  );
};

export default LandingPage;
