import React, { useRef, useContext } from "react";
import { AuthContext } from "../../contexts/auth/authcontext";
import LoginCall from "./loginAPICalls";
import { Link } from "react-router-dom";
import "./login.css";

// const Login = () => {
//   const staffEmailRef = useRef(null);
//   const passwordRef = useRef(null);
//   const { isFetchingUser, error, dispatch } = useContext(AuthContext);
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const userInfo = {
//       staff_email: staffEmailRef.current.value,
//       password: passwordRef.current.value
//     };

//     await LoginCall(userInfo, dispatch);
//   };

//   return (
//     <div className="loginContainer">
//       <h1 className="loginLogo">
//         Let<span className="landingDescPart">X</span>Chat
//       </h1>
//       <div className="loginMessage">
//         <h3>Enter your details to login</h3>
//       </div>
//       <div className="loginFormContainer">
//         <form onSubmit={handleLogin}>
//           <div>
//             <input
//               type="email"
//               name="staffEmail"
//               ref={staffEmailRef}
//               placeholder="Staff Email"
//               className="loginEmailField"
//               required
//             />
//           </div>
//           <br />
//           <div>
//             <input
//               type="password"
//               name="password"
//               ref={passwordRef}
//               placeholder="Password"
//               className="loginPasswordField"
//               minLength="6"
//               required
//             />
//           </div>
//           <br />
//           <button type="submit" className="login regLogin">
//             {isFetchingUser ? "Logging in..." : "Login"}
//           </button>
//           {error && (
//             <p className="alreadyAccountlogin">
//               Dont have an account?
//               <Link to="/register" className="regLogin">
//                 {" "}
//                 Sign up
//               </Link>
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

const Login = () => {
  const staffEmailRef = useRef(null);
  const passwordRef = useRef(null);
  const { isFetchingUser, error, dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userInfo = {
      staff_email: staffEmailRef.current.value,
      password: passwordRef.current.value
    };
    await LoginCall(userInfo, dispatch);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-400 flex flex-col items-center justify-center p-4">
      {/* Wave Divider at Top (Matches Register Page) */}
      <div className="w-full overflow-hidden rotate-180 absolute top-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="fill-current text-white w-full h-16 md:h-24"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Let<span className="text-yellow-300">X</span>Chat
        </h1>
        
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-8 w-full mt-8">
          <h3 className="text-2xl font-semibold text-white text-center mb-6">
            Enter your details to login
          </h3>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                name="staffEmail"
                ref={staffEmailRef}
                placeholder="Staff Email"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-yellow-300 placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                ref={passwordRef}
                placeholder="Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-yellow-300 placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                required
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isFetchingUser}
                className="w-full bg-white text-teal-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                {isFetchingUser ? "Logging in..." : "Login"}
              </button>
              
              {error && (
                <p className="text-white text-center mt-4">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-bold text-yellow-300 hover:text-white underline"
                  >
                    Sign up
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
