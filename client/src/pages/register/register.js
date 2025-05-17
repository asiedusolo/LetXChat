import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./register.css";

// const Register = () => {
//   const fullNameRef = useRef(null);
//   const emloyeeIdRef = useRef(null);
//   const usernameRef = useRef(null);
//   const staffEmailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const passwordConfirmRef = useRef(null);
//   const history = useHistory();

//   const [chatRoomIds, setChatRoomIds] = useState([]);

//   useEffect(() => {
//     const fetchChatRooms = async () => {
//       try {
//         const response = await axios.get("${API_BASE_URL}/chatRooms");
//         setChatRoomIds(response.data.map((chatroom) => chatroom._id));
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchChatRooms();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       passwordConfirmRef.current.setCustomValidity("Password mismatch");
//     } else {
//       const newUser = {
//         name: fullNameRef.current.value,
//         employee_id: emloyeeIdRef.current.value,
//         username: usernameRef.current.value,
//         staff_email: staffEmailRef.current.value,
//         password: passwordRef.current.value
//       };
//       try {
//         const response = await axios.post(
//           "${API_BASE_URL}/auth/register",
//           newUser
//         );

//         const allChatRoomIds = chatRoomIds;
//         const randomInt =
//           Math.floor(Math.random() * (allChatRoomIds.length - 1 - 3 + 1)) + 3;
//         function getRandomSubarray(arr, size) {
//           var shuffled = arr.slice(0),
//             i = arr.length,
//             temp,
//             index;
//           while (i--) {
//             index = Math.floor((i + 1) * Math.random());
//             temp = shuffled[index];
//             shuffled[index] = shuffled[i];
//             shuffled[i] = temp;
//           }
//           return shuffled.slice(0, size);
//         }
//         const subArray = getRandomSubarray(allChatRoomIds, randomInt);
//         await axios
//           .all(
//             subArray.map((member) =>
//               axios.put(
//                 `${API_BASE_URL}/chatRooms/${member}/${response.data._id}`
//               )
//             )
//           )
//           .then((response) => console.log("Joined chat rooms select"));

//         history.push("/login");
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <div className="registerContainer">
//       <h1 className="registerLogo">
//         Let<span className="landingDescPart">X</span>Chat
//       </h1>
//       <div className="registerMessage">
//         <h3>Enter your details to sign up</h3>
//       </div>
      
//       <div className="registerFormContainer">
//         <form onSubmit={handleSubmit} className="registerForm">
//           <div>
//             <input
//               type="text"
//               name="fullname"
//               ref={fullNameRef}
//               placeholder="Full Name"
//               className="registerTextField"
//               required
//             />
//           </div>
//           <div>
//             <br />

//             <input
//               type="text"
//               name="employeeId"
//               ref={emloyeeIdRef}
//               placeholder="Employee ID"
//               className="registerTextField"
//               required
//             />
//           </div>
//           <br />
//           <div>
//             <input
//               type="text"
//               name="username"
//               ref={usernameRef}
//               minLength="3"
//               maxLength="20"
//               placeholder="Username"
//               className="registerTextField"
//               required
//             />
//           </div>
//           <br />
//           <div>
//             <input
//               type="email"
//               name="staffEmail"
//               maxLength="50"
//               ref={staffEmailRef}
//               placeholder="Email"
//               className="registerEmailField"
//               required
//             />
//           </div>
//           <br />
//           <div>
//             <input
//               type="password"
//               name="password"
//               ref={passwordRef}
//               minLength="6"
//               placeholder="Enter Password"
//               className="registerPasswordField"
//               required
//             />
//           </div>
//           <br />
//           <div>
//             <input
//               type="password"
//               name="passwordConfirm"
//               ref={passwordConfirmRef}
//               placeholder="Confirm Password"
//               className="registerPasswordField"
//               required
//             />
//           </div>
//           <br />
//           <div>
//             <button type="submit" className="regSignup regLink">
//               Sign up
//             </button>
//             <p className="alreadyAccountlogin">
//               Already have an account?
//               <Link to="/login" className="regLogin">
//                 Log In
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

const Register = () => {
  const fullNameRef = useRef(null);
  const emloyeeIdRef = useRef(null);
  const usernameRef = useRef(null);
  const staffEmailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const history = useHistory();
  const API_BASE_URL = process.env.API_BASE_URL


  const [chatRoomIds, setChatRoomIds] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/chatRooms`);
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
          `${API_BASE_URL}/auth/register`,
          newUser
        );
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
                `${API_BASE_URL}/chatRooms/${member}/${response.data._id}`
              )
            )
          )
          .then((response) => console.log("Joined chat rooms select"));

        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-400 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-2 self-start ml-4">
          Let<span className="text-yellow-300">X</span>Chat
        </h1>
        
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-8 w-full">
          <h3 className="text-2xl font-semibold text-white text-center mb-6">
            Enter your details to sign up
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="fullname"
                ref={fullNameRef}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                required
              />
            </div>
            
            <div>
              <input
                type="text"
                name="employeeId"
                ref={emloyeeIdRef}
                placeholder="Employee ID"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                required
              />
            </div>
            
            <div>
              <input
                type="text"
                name="username"
                ref={usernameRef}
                minLength="3"
                maxLength="20"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                name="staffEmail"
                maxLength="50"
                ref={staffEmailRef}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                ref={passwordRef}
                minLength="6"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                name="passwordConfirm"
                ref={passwordConfirmRef}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                required
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-white text-teal-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                Sign up
              </button>
              
              <p className="text-white text-center mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-yellow-300 hover:text-yellow-200 underline"
                >
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
