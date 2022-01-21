import React from "react";
import "./topbar.css"


const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div>
          <div >
            <img
              src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Fkritchanut%2Fkritchanut1406%2Fkritchanut140600093%2F29213195-male-silhouette-avatar-profile-picture.jpg&imgrefurl=https%3A%2F%2Fwww.123rf.com%2Fphoto_29213195_male-silhouette-avatar-profile-picture.html&tbnid=BJGkF8iyujvTDM&vet=12ahUKEwjepOn8icP1AhU4XvEDHei7ApwQMygMegUIARD-AQ..i&docid=mKadYBOkjP6bnM&w=1300&h=1300&q=profile%20avatar&ved=2ahUKEwjepOn8icP1AhU4XvEDHei7ApwQMygMegUIARD-AQ"
              alt="profilePicture"
            />
          </div>
          <h4>username</h4>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
