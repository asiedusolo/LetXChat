import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Modal from "./modal";

const Login = () => {
  const staffEmailRef = useRef(null);
  const passwordRef = useRef(null);
    const history = useHistory();
    const [isValidUser, setIsValidUser] = useState()
    const [showModal, setShowModal] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();

    const userInfo = {
      staff_email: staffEmailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
        await axios.post("http://localhost:5000/api/auth/login", userInfo);
        setIsValidUser(true)
        setShowModal(true)
      history.push("/chatroom");
    } catch (error) {
        setIsValidUser(false)
        setShowModal(true)
        console.log(error);
        
    }
  };
    
    const hideModal = () => {
        setShowModal(false)
    }
  return (
    <div>
      <div>
        <h1>Enter your details to login</h1>
      </div>
          <div>
              {showModal && <Modal isValidUser={isValidUser} hideModal={hideModal} />}
      </div>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="staffEmail"
            ref={staffEmailRef}
            placeholder="Staff Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="Password"
            minLength="6"
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
