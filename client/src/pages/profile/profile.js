import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { FiUser, FiMail, FiEdit2, FiUpload, FiCheck } from "react-icons/fi";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [fileData, setFileData] = useState();
  const [userPicture, setUserPicture] = useState("");
  const [profileUserName, setProfileUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const REACT_APP_ENV = process.env.REACT_APP_ENVT

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_URL}/api/user?username=${username}`
        );
        setUser(response.data);
        setUserPicture(response.data.picture_avatar);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [username]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!fileData) return;
    
    const data = new FormData();
    data.append("file", fileData);
    
    try {
      const response = await axios.post(
        `${REACT_APP_API_BASE_URL}/api/upload`,
        data
      );
      const updates = { picture_avatar: REACT_APP_ENV === 'development' ? response.data.filename : response.data.url };
      
      const userResponse = await axios.put(
        `${REACT_APP_API_BASE_URL}/api/user/${user._id}`,
        updates
      );
      setUserPicture(userResponse.data.picture_avatar);
      setSuccessMessage("Profile picture updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Failed to update profile picture");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const handleUserProfileEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    
    let updates = {};
    if (password) {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        setTimeout(() => setErrorMessage(""), 3000);
        setIsSubmitting(false);
        return;
      }
      updates.password = password;
    }
    
    if (profileUserName) {
      updates.username = profileUserName;
    }

    try {
      const response = await axios.put(
        `${REACT_APP_API_BASE_URL}/api/user/${user._id}`,
        updates
      );
      setNewUsername(response.data.username);
      setProfileUserName("");
      setPassword("");
      setConfirmPassword("");
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(error.response?.data?.message || "Failed to update profile");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Section */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <img
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                  src={
                    user.picture_avatar
                      ? REACT_APP_ENV === 'development' ? PF + user.picture_avatar : user.picture_avatar
                      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  }
                  alt="Profile"
                />
                <form onSubmit={onSubmitHandler} className="mt-4">
                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer">
                      <span className="sr-only">Change profile picture</span>
                      <input
                        type="file"
                        onChange={fileChangeHandler}
                        className="hidden"
                        accept="image/*"
                      />
                      <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <FiUpload className="-ml-0.5 mr-2 h-4 w-4" />
                        Change
                      </span>
                    </label>
                    {fileData && (
                      <button
                        type="submit"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiCheck className="-ml-0.5 mr-2 h-4 w-4" />
                        Save
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <FiUser className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  @{newUsername || user.username}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <FiMail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  {user.staff_email}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="px-6 py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              <FiEdit2 className="inline mr-2" />
              Edit Profile
            </h3>

            {/* Status Messages */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleUserProfileEdit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={profileUserName}
                  onChange={(e) => setProfileUserName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter new username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || (!profileUserName && !password)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;