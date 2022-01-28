import "./message.css";
import TimeAgo from "react-timeago";

const Message = ({ ownMessage, text, senderUsername, createdAt }) => {
  console.log(senderUsername);
  return (
    <div className={ownMessage ? "message own" : "message"}>
      <div className="messageTop">
        <div className="userDetails">
          <img
            className="messageImg"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt=""
          />
          <p>{senderUsername}</p>
        </div>

        <TimeAgo className="messageBottom" date={createdAt} />
      </div>
      <div className="messageContent">
        <p className="messageText">{text}</p>
      </div>
    </div>
  );
};

export default Message;
