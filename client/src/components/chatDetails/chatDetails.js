import React, { useState, useEffect } from "react";
import axios from "axios";
import "./chatDetails.css";

const ChatDetails = ({ currentChatRoom, currentChatRoomMembers }) => {
  const [chatCreator, setChatCreator] = useState("");
  const [usersInfo, setUsersInfo] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    axios
      .all(
        currentChatRoomMembers.map((member) =>
          axios.get(`http://localhost:5000/api/user?userId=${member}`)
        )
      )
      .then((response) => setUsersInfo(response.map((d) => d.data)));
  }, [currentChatRoomMembers]);
  useEffect(() => {
    const getChatCreator = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/user?userId=${currentChatRoom.creatorId}`
      );
      setChatCreator(response.data);
    };
    getChatCreator();
  }, [currentChatRoom.creatorId]);
  return (
    <div className="chatDetails">
      <div className="chatRoomMeta">
        <h2>{currentChatRoom.chatRoomName}</h2>
        <div className="metaRight">
          <h3>Created By:</h3>
          <p>{chatCreator.name}</p>
          <h3>Date Created:</h3>
          <p>20th Jan, 2022</p>
        </div>
      </div>
      <div className="memberList">
        <div className="memberWrapper">
          <h2>Chat Members</h2>
          {usersInfo.map((member, index) => {
            return (
              <div key={index} className="member">
                <img
                  className="memberImg"
                  src={
                    member.picture_avatar
                      ? PF + member.picture_avatar
                      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  }
                  alt=""
                />
                <p className="memberName">{member.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
