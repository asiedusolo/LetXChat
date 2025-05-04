import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
import { FiArrowRight } from "react-icons/fi";

// const LandingPage = () => {
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

//   return (
//     <div className="landingPage">
//       <div className="landingImageLogoSection">
//         <div className="landingPageImageWrapper">
//           <h1 className="landingLogo">
//             Let<span className="landingDescPart">X</span>Chat
//           </h1>
//           <img
//             src="https://media.istockphoto.com/id/1142207515/photo/smiling-african-american-woman-chatting-on-smartphone-modern-technology-app.webp?b=1&s=170667a&w=0&k=20&c=HV2kHRP5nv3KXd-AlbCFLe8FOLGYpNDJareJ0OrvcNA="
//             alt="landingPicture"
//             className="landingPageImage"
//           />
//         </div>
//       </div>
//       <div className="landingConnectSection">
//         <div className="landingDescription">
//           <p className="landingConnect">Connect</p>
//           <p className="landingShareWith">
//             and <span className="landingShare">share</span> with
//           </p>
//           <p className="landingColleagues">colleagues</p>
//         </div>
//         <p className="landingBriefInfo">
//           LetXChat is an instant group messaging app. A user can visit the site
//           to create and have an account on LetXChat. The user can then login to
//           acccess chat groups that he has been assigned to. User can send and
//           receive text, pictures, audio and video to and from chat groups.
//         </p>
//         <div className="landing-btns-container">
//           <button className="landingSignup">
//             <Link className="landingRegLink" to="/register">
//               Sign up
//             </Link>
//           </button>
//           <button className="landingLogin">
//             <Link className="landingRegLogin" to="/login">
//               Login
//             </Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500 to-emerald-600 font-sans">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between min-h-[90vh]">
        {/* Left Column - Image */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
            <img
              src="https://media.istockphoto.com/id/1142207515/photo/smiling-african-american-woman-chatting-on-smartphone-modern-technology-app.webp?b=1&s=170667a&w=0&k=20&c=HV2kHRP5nv3KXd-AlbCFLe8FOLGYpNDJareJ0OrvcNA="
              alt="People chatting on LetXChat"
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>

        {/* Right Column - Text Content */}
        <div className="w-full lg:w-1/2 lg:pl-8 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Let<span className="text-emerald-100">X</span>Chat
          </h1>

          <div className="mb-8">
            <p className="text-4xl md:text-5xl font-bold mb-2">Connect</p>
            <p className="text-2xl md:text-3xl mb-2">
              and <span className="font-semibold text-emerald-100">share</span> with
            </p>
            <p className="text-3xl md:text-4xl font-bold">colleagues</p>
          </div>

          <p className="text-lg md:text-xl mb-10 leading-relaxed">
            LetXChat is an instant group messaging app where you can connect with your team.
            Create an account, join your groups, and exchange messages, photos,
            audio, and videos seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Get Started <FiArrowRight className="inline" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="fill-current text-white w-full h-16 md:h-24"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;
