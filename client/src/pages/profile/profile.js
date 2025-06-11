import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
// import "./profile.css";


const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [fileData, setFileData] = useState();
  const [userPicture, setUserPicture] = useState("");
  const [profileUserName, setProfileUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `/api/user?username=${username}`
      );
      setUser(response.data);
      setUserPicture(response.data.picture_avatar);
    };
    fetchUser();
  }, [username]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", fileData);
    try {
      const response = await axios.post(
        "/api/upload",
        data
      );
      const updates = {
        picture_avatar: response.data.url
      };
      try {
        const userResponse = await axios.put(
          `/api/user/${user._id}`,
          updates
        );
        setUserPicture(userResponse.data.picture_avatar);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const handleUserProfileEdit = async (e) => {
    e.preventDefault();
    let updates;
    if (password && password === confirmPassword && username) {
      updates = {
        username: profileUserName,
        password: password
      };
    } else if (password && password === confirmPassword && !username) {
      updates = {
        password: password
      };
    } else if (username && !password) {
      updates = {
        username: profileUserName
      };
    }

    try {
      const response = await axios.put(
        `/api/user/${user._id}`,
        updates
      );
      setNewUsername(response.data.username);
      setProfileUserName("");
      alert("Details updated successfully");
    } catch (error) {
      console.log(error);
      alert("Username already exists or password mismatch");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-400 p-4 md:p-8">
      {/* Wave Divider at Top (Matches Other Pages) */}
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

      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 max-w-6xl mx-auto mt-12">
        {/* Profile Data Section */}
        <div className="w-full lg:w-1/2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-6 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-white mb-4">{user.name}</h3>
          
          <img
            alt="profilePic"
            src={
              user && user.picture_avatar
                ? PF + `${userPicture ? userPicture : user.picture_avatar}`
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
            className="h-64 w-64 rounded-full object-cover border-4 border-white border-opacity-30 mb-4"
          />
          
          <h3 className="text-xl font-semibold text-white mb-2">
            @{newUsername ? newUsername : user.username}
          </h3>
          
          <h3 className="text-lg text-white mb-6">{user.staff_email}</h3>
          
          <form onSubmit={onSubmitHandler} className="w-full max-w-xs">
            <div className="mb-4">
              <input
                type="file"
                name="picturePicture"
                onChange={fileChangeHandler}
                className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-teal-600 hover:file:bg-gray-100"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-white text-teal-600 hover:bg-gray-100 font-bold py-2 px-4 rounded-full transition duration-200 shadow-md hover:shadow-lg"
            >
              Change Profile Picture
            </button>
          </form>
        </div>

        {/* Profile Edit Section */}
        <div className="w-full lg:w-1/2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Profile</h2>
          
          <form onSubmit={handleUserProfileEdit} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="New Username"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-yellow-300 placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                value={profileUserName}
                onChange={(e) => setProfileUserName(e.target.value)}
              />
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-yellow-300 placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-yellow-300 placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-white text-teal-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
