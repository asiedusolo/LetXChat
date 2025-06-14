import TimeAgo from "react-timeago";

const Message = ({ ownMessage, text, senderUsername, createdAt }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const REACT_APP_ENV = process.env.REACT_APP_ENV

  console.log({REACT_APP_ENV})
  console.log({text})
  const messageContainerClasses = `flex ${ownMessage ? 'justify-end' : 'justify-start'} mb-4`;

  const messageContentClasses = `max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
    ownMessage ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
  }`;

  const renderMediaMessage = (type) => {
    return (
      <div className={messageContainerClasses}>
        <div className={messageContentClasses}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">
              {!ownMessage && senderUsername}
            </span>
            <TimeAgo 
              className="text-xs opacity-70" 
              date={createdAt} 
            />
          </div>
          
          {type === "image" && (
            <div className="mt-2">
              <img 
                src={REACT_APP_ENV === 'development' ? PF + text : text} 
                alt="Shared content" 
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
          
          {type === "video" && (
            <div className="mt-2">
              <video 
                controls
                className="max-w-full h-auto rounded-md"
              >
                <source src={REACT_APP_ENV === 'development' ? PF + text : text} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          
          {type === "audio" && (
            <div className="mt-2">
              <audio 
                controls
                className="w-full"
              >
                <source src={REACT_APP_ENV === 'development' ? PF + text : text} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (text?.includes('image')) return renderMediaMessage("image");
  if (text?.includes('video')) return renderMediaMessage("video");
  if (text?.includes('audio')) return renderMediaMessage("audio");

  return (
    <div className={messageContainerClasses}>
      <div className={messageContentClasses}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium">
            {!ownMessage && senderUsername}
          </span>
          <TimeAgo 
            className="text-xs opacity-70" 
            date={createdAt} 
          />
        </div>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Message;