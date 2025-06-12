import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import ChatPage from "./pages/chatPage/chatPage";
import Profile from "./pages/profile/profile";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth/authcontext";
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/chatroom" replace /> : <Login />} 
        />
        <Route 
          path="/chatroom" 
          element={user ? <ChatPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/profile/:username" 
          element={user ? <Profile /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;