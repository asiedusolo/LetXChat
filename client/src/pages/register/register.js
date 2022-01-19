import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const Register = () => {
  const fullNameRef = useRef(null);
  const emloyeeIdRef = useRef(null);
  const usernameRef = useRef(null);
  const staffEmailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const history = useHistory();

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
        password: passwordRef.current.value,
      };
      try {
        await axios.post(
          "http://localhost:5000/api/auth/register",
          newUser
        );
        // alert(JSON.stringify(newUser));
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div>
        <h3>Enter your details to sign up on LetXChat</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullname">Full Name: </label>
          <input
            type="text"
            name="fullname"
            ref={fullNameRef}
            placeholder="Full Name"
            required
          />
          <br />
          <label htmlFor="employeeId">Employee ID: </label>
          <input
            type="text"
            name="employeeId"
            ref={emloyeeIdRef}
            placeholder="Employee ID"
            required
          />
          <br />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            ref={usernameRef}
            minLength="3"
            maxLength="20"
            placeholder="Username"
            required
          />
          <br />
          <label htmlFor="staffEmail">Staff Email:</label>
          <input
            type="email"
            name="staffEmail"
            maxLength="50"
            ref={staffEmailRef}
            placeholder="staffEmail"
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            minLength="6"
            placeholder="Enter Password"
            required
          />
          <br />
          <label htmlFor="passwordConfirm">Password Confirm:</label>
          <input
            type="password"
            name="passwordConfirm"
            ref={passwordConfirmRef}
            placeholder="Confirm Password"
            required
          />
          <br />
          <button type="submit">Sign up</button>
          <button>Log into Account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
