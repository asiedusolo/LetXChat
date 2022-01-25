import "./message.css";
import {format} from 'timeago.js'

const Message = ({ ownMessage, text, senderUsername, createdAt }) => {
  console.log(senderUsername)
  return (
    <div className={ownMessage ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt=""
        />
        <p className="messageText">{text}</p>
        <p>{senderUsername}</p>
      </div>
      <div className="messageBottom">{format(createdAt)}</div>
    </div>
  );
};

export default Message;
