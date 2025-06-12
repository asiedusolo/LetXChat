import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/authcontext";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Let<span className="text-blue-600">X</span>Chat
            </h1>
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-3">
              {user.name}
            </span>
            <Link to={`/profile/${user.username}`} className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src={
                  user?.picture_avatar
                    ? process.env.REACT_APP_ENV == 'development' ? PF + user.picture_avatar : user.picture_avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt="User profile"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;