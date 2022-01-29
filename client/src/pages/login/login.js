import React, { useRef, useState, useContext } from "react";
// import axios from "axios";
import Modal from "./modal";
import { AuthContext } from "../../contexts/auth/authcontext";
import LoginCall from "./loginAPICalls";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const staffEmailRef = useRef(null);
  const passwordRef = useRef(null);
  // const [isValidUser, setIsValidUser] = useState()
  const { isFetchingUser, error, dispatch } = useContext(AuthContext);
  // const [showModal, setShowModal] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    const userInfo = {
      staff_email: staffEmailRef.current.value,
      password: passwordRef.current.value
    };

    await LoginCall(userInfo, dispatch);
    // setShowModal(error);
  };

  // const hideModal = () => {
  //   setShowModal(false);
  // };
  return (
    <div className="loginContainer">
      <div className="loginMessage">
        <h1>Enter your details to login</h1>
      </div>
      {/* <div>{showModal && <Modal hideModal={hideModal} />}</div> */}
      <div className="loginFormContainer">
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              name="staffEmail"
              ref={staffEmailRef}
              placeholder="Staff Email"
              className="loginEmailField"
              required
            />
          </div>
          <br />
          <div>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="Password"
              className="loginPasswordField"
              minLength="6"
              required
            />
          </div>
          <br />
          <button type="submit" className="login regLogin">
            {isFetchingUser ? "Logging in..." : "Login"}
          </button>
          {error && (
            <button className="loginSignup">
              <Link to="/register">Dont have an account? Sign up</Link>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
