import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
// import Modal from "./Modal";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const fullNameRef = useRef(null);
  const emloyeeIdRef = useRef(null);
  const usernameRef = useRef(null);
  const staffEmailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const history = useHistory();

  // const [isValidUser, setIsValidUser] = useState();
  // const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      passwordConfirmRef.current.setCustomValidity("Password mismatch");
    } else {
      const newUser = {
        name: fullNameRef.current.value,
        employee_id: emloyeeIdRef.current.value,
        username: usernameRef.current.value,
        staff_email: staffEmailRef.current.value,
        password: passwordRef.current.value
      };
      try {
        await axios.post("http://localhost:5000/api/auth/register", newUser);
        // setIsValidUser(true);
        // setShowModal(true);
        history.push("/login");
      } catch (error) {
        // setIsValidUser(false);
        // setShowModal(true);
        console.log(error);
      }
    }
  };

  // const hideModal = () => {
  //   // setShowModal(false);
  // };
  return (
    <div className="registerContainer">
      <div className="registerMessage">
        <h3>Enter your details to sign up on LetXChat</h3>
      </div>
      {/* <div className="registerModal">
        {showModal && <Modal isValidUser={isValidUser} hideModal={hideModal} />}
      </div> */}
      <div className="registerFormContainer">
        <form onSubmit={handleSubmit} className="registerForm">
          <div>
            <input
              type="text"
              name="fullname"
              ref={fullNameRef}
              placeholder="Full Name"
              required
            />
          </div>
          <div>
            <br />

            <input
              type="text"
              name="employeeId"
              ref={emloyeeIdRef}
              placeholder="Employee ID"
              required
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              name="username"
              ref={usernameRef}
              minLength="3"
              maxLength="20"
              placeholder="Username"
              required
            />
          </div>
          <br />
          <div>
            <input
              type="email"
              name="staffEmail"
              maxLength="50"
              ref={staffEmailRef}
              placeholder="staffEmail"
              required
            />
          </div>
          <br />
          <div>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              minLength="6"
              placeholder="Enter Password"
              required
            />
          </div>
          <br />
          <div>
            <input
              type="password"
              name="passwordConfirm"
              ref={passwordConfirmRef}
              placeholder="Confirm Password"
              required
            />
          </div>
          <br />
          <div>
            <button type="submit" className="regSignup regLink">
              Sign up
            </button>
            <button className="alreadyAccountlogin">
              <Link to="/login" className="regLogin">
                Log into Account
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
