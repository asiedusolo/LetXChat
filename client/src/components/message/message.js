import "./message.css";
import TimeAgo from "react-timeago";

const Message = ({ ownMessage, text, senderUsername, createdAt }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const mediaTypes = ["image", "audio", "video"];

  if (text && text.startsWith(mediaTypes[0])) {
    return (
      <div className={ownMessage ? "message own" : "message"}>
        <div className="messageTop">
          <div className="userDetails">
            <p>{senderUsername}</p>
          </div>

          <TimeAgo className="messageBottom" date={createdAt} />
        </div>
        <div className="messageContent">
          <img alt="imageMessage" src={PF + text} className="messageImage" />
        </div>
      </div>
    );
  } else if (text && text.startsWith(mediaTypes[1])) {
    return (
      <div className={ownMessage ? "message own" : "message"}>
        <div className="messageTop">
          <div className="userDetails">
            <p>{senderUsername}</p>
          </div>

          <TimeAgo className="messageBottom" date={createdAt} />
        </div>
        <div className="messageContent">
          <video controls name="media" className="messgeAudio">
            <source src={PF + text} />
          </video>
        </div>
      </div>
    );
  } else if (text && text.startsWith(mediaTypes[2])) {
    return (
      <div className={ownMessage ? "message own" : "message"}>
        <div className="messageTop">
          <div className="userDetails">
            <p>{senderUsername}</p>
          </div>

          <TimeAgo className="messageBottom" date={createdAt} />
        </div>
        <div className="messageContent">
          <video controls name="media" className="messageVideo">
            <source src={PF + text} />
          </video>
        </div>
      </div>
    );
  }
  return (
    <div className={ownMessage ? "message own" : "message"}>
      <div className="messageTop">
        <div className="userDetails">
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
