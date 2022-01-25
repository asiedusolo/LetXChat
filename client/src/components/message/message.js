import "./message.css";

const Message = ({ ownMessage, text, senderUsername }) => {
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
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
};

export default Message;
