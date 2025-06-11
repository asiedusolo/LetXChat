import TimeAgo from "react-timeago";
// import "./message.css";

const Message = ({ ownMessage, text, senderUsername, createdAt }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const mediaTypes = ["image", "audio", "video"];

  const messageContainerClasses = `flex flex-col mt-5 ${
    ownMessage ? "items-end" : "items-start"
  }`;

  const messageContentClasses = `max-w-xs rounded-lg p-3 ${
    ownMessage
      ? "bg-teal-500 text-white"
      : "bg-white bg-opacity-20 text-white"
  }`;

  const renderMediaMessage = (type) => {
    const mediaClasses = {
      image: "w-full max-w-xs h-40 object-cover rounded-lg",
      audio: "w-full max-w-3xl h-12",
      video: "w-full max-w-xs h-40 object-cover rounded-lg"
    };

    return (
      <div className={messageContainerClasses}>
        <div className="flex items-center justify-between w-full max-w-xs mb-1">
          <p className="text-sm font-medium text-white opacity-80">
            {senderUsername}
          </p>
          <TimeAgo 
            className="text-xs text-white opacity-60" 
            date={createdAt} 
          />
        </div>
        <div className={messageContentClasses}>
          {type === "image" && (
            <img 
              alt="imageMessage" 
              src={text} 
              className={mediaClasses.image} 
            />
            
          )}
          {type === "video" && (
            <video 
              controls 
              name="media" 
              className={mediaClasses.video}
            >
              <source src={text} />
            </video>
          )}
          {type === "audio" && (
            <video 
            controls 
            name="media" 
            className={mediaClasses.audio}
          >
            <source src={text} />
          </video>
          )}
        </div>
      </div>
    );
  };

  if (text && text.includes('image')) {
    return renderMediaMessage("image");
  } else if (text && text.includes('audio')) {
    return renderMediaMessage("audio");
  } else if (text && text.includes('video')) {
    return renderMediaMessage("video");
  }

  return (
    <div className={messageContainerClasses}>
      <div className="flex items-center justify-between w-full max-w-xs mb-1">
        <p className="text-sm font-medium text-white opacity-80">
          {senderUsername}
        </p>
        <TimeAgo 
          className="text-xs text-white opacity-60" 
          date={createdAt} 
        />
      </div>
      <div className={messageContentClasses}>
        <p className="text-white">{text}</p>
      </div>
    </div>
  );
};

export default Message;
