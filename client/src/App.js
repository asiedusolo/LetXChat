import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom'
import LandingPage from './pages/landingPage/landingPage';
import Register from './pages/register/register';
import Login from './pages/login/login';
import ChatPage from './pages/chatPage/chatPage';
import Profile from './pages/profile/profile'

function App() {
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
          <Login />
        </Route>
        <Route path="/chatroom">
          <ChatPage />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
