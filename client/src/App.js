import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import ChatPage from "./pages/chatPage/chatPage";
import Profile from "./pages/profile/profile";
import { useContext } from "react";
import {AuthContext} from "./contexts/auth/authcontext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/chatroom" /> : <Login />}
          {/* <Login /> */}
        </Route>
        <Route path="/chatroom">
          {user ? <ChatPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
