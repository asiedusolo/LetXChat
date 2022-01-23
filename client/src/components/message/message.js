import "./message.css";

const Message = ({ownMessage}) => {
  return (
    <div className={ownMessage ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="" />
        <p className="messageText">Hello this is a message. Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur
        . Lorem ipsum dolor sit amet, consectetur</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
};

export default Message;
