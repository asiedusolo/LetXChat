import React, { useRef, useState, useEffect } from "react";
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
  const [chatRoomIds, setChatRoomIds] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/chatRooms");
        // console.log(response.data.map((chatroom) => chatroom._id));
        setChatRoomIds(response.data.map((chatroom) => chatroom._id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatRooms();
  }, []);

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
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          newUser
        );
        // setIsValidUser(true);
        // setShowModal(true);
        const allChatRoomIds = chatRoomIds;
        const randomInt =
          Math.floor(Math.random() * (allChatRoomIds.length - 1 - 3 + 1)) + 3;
        function getRandomSubarray(arr, size) {
          var shuffled = arr.slice(0),
            i = arr.length,
            temp,
            index;
          while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
          }
          return shuffled.slice(0, size);
        }
        const subArray = getRandomSubarray(allChatRoomIds, randomInt);
        await axios
          .all(
            subArray.map((member) =>
              axios.put(
                `http://localhost:5000/api/chatRooms/${member}/${response.data._id}`
              )
            )
          )
          .then((response) => console.log("Joined chat rooms select"));

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
      <h1 className="registerLogo">
        Let<span className="landingDescPart">X</span>Chat
      </h1>
      <div className="registerMessage">
        <h3>Enter your details to sign up</h3>
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
              className="registerTextField"
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
              className="registerTextField"
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
              className="registerTextField"
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
              placeholder="Email"
              className="registerEmailField"
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
              className="registerPasswordField"
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
              className="registerPasswordField"
              required
            />
          </div>
          <br />
          <div>
            <button type="submit" className="regSignup regLink">
              Sign up
            </button>
            <p className="alreadyAccountlogin">
              Already have an account?
              <Link to="/login" className="regLogin">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
