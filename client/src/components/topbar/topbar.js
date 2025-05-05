import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/authcontext.js";

// const Topbar = () => {
//   const { user } = useContext(AuthContext);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

//   return (
//     <div className="topbar">
//       <div className="profileSection">
//         <div className="chatLogo">
//           Let<span className="landingDescPart">X</span>Chat
//         </div>
//         <div className="userContainer">
//           <p className="userName">{user.name}</p>
//           <Link to={`/profile/${user.username}`}>
//             <img
//               alt="userPicture"
//               src={
//                 user && user.picture_avatar
//                   ? PF + user.picture_avatar
//                   : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
//               }
//             />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="w-full h-16 bg-gradient-to-r from-blue-500 to-teal-400 shadow-md">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">
            Let<span className="text-yellow-300">X</span>Chat
          </h1>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <span className="text-white font-medium">{user.name}</span>
          <Link to={`/profile/${user.username}`}>
            <img
              alt="userPicture"
              src={
                user && user.picture_avatar
                  ? PF + user.picture_avatar
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              }
              className="w-10 h-10 rounded-full object-cover border-2 border-white border-opacity-50 hover:border-opacity-100 transition-all"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Topbar;
