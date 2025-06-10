import "./message.css";
import TimeAgo from "react-timeago";

// const Message = ({ ownMessage, text, senderUsername, createdAt }) => {
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const mediaTypes = ["image", "audio", "video"];

//   if (text && text.startsWith(mediaTypes[0])) {
//     return (
//       <div className={ownMessage ? "message own" : "message"}>
//         <div className="messageTop">
//           <div className="userDetails">
//             <p>{senderUsername}</p>
//           </div>

//           <TimeAgo className="messageBottom" date={createdAt} />
//         </div>
//         <div className="messageContent">
//           <img alt="imageMessage" src={PF + text} className="messageImage" />
//         </div>
//       </div>
//     );
//   } else if (text && text.startsWith(mediaTypes[1])) {
//     return (
//       <div className={ownMessage ? "message own" : "message"}>
//         <div className="messageTop">
//           <div className="userDetails">
//             <p>{senderUsername}</p>
//           </div>

//           <TimeAgo className="messageBottom" date={createdAt} />
//         </div>
//         <div className="messageContent">
//           <video controls name="media" className="messgeAudio">
//             <source src={PF + text} />
//           </video>
//         </div>
//       </div>
//     );
//   } else if (text && text.startsWith(mediaTypes[2])) {
//     return (
//       <div className={ownMessage ? "message own" : "message"}>
//         <div className="messageTop">
//           <div className="userDetails">
//             <p>{senderUsername}</p>
//           </div>

//           <TimeAgo className="messageBottom" date={createdAt} />
//         </div>
//         <div className="messageContent">
//           <video controls name="media" className="messageVideo">
//             <source src={PF + text} />
//           </video>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className={ownMessage ? "message own" : "message"}>
//       <div className="messageTop">
//         <div className="userDetails">
//           <p>{senderUsername}</p>
//         </div>

//         <TimeAgo className="messageBottom" date={createdAt} />
//       </div>
//       <div className="messageContent">
//         <p className="messageText">{text}</p>
//       </div>
//     </div>
//   );
// };

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

  if (text && text.startsWith(mediaTypes[0])) {
    return renderMediaMessage("image");
  } else if (text && text.startsWith(mediaTypes[1])) {
    return renderMediaMessage("audio");
  } else if (text && text.startsWith(mediaTypes[2])) {
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
