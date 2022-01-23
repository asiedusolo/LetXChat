import React from 'react';
import './chatDetails.css'

const ChatDetails = () => {
    const membersTempArray = [
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
        {
            avatarUrl: "",
            name: "Kofi Nketsiah"
        },
    ];
    return <div className="chatDetails">
        <div className="chatRoomMeta">
            <h2>Full Stack</h2>
            <div className="metaRight">
                <h3>Created By:</h3>
                <p>Solomon Asiedu</p>
                <h3>Date Created:</h3>
                <p>20th Jan, 2022</p>
            </div>
        </div>
        <div className="memberList">
            <h2>Chat Members</h2>
            {membersTempArray.map((member, index) => {
                return <div key={index} className="member">
                    <img className="memberImg" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="" />
                    <p className="memberName">{member.name}</p>
                </div>
            })}
        </div>
  </div>;
};



export default ChatDetails;
