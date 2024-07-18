import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Homepage from './pages/Homepage';
import Feed from './pages/feed/Feed';
import { useState, useEffect } from 'react';
import Chat from './components/chat/Chat';
import Matches from './components/matches/Matches';
import Sidebar from './components/Header/Header';
import Profile from './components/Profile/Profile';
import MatchPage from './components/MatchPage/MatchPage';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('currentUser'); 
      }
    } 
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData); 
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  return (
    <Router>
      {currentUser && <Sidebar currentUser={currentUser} />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/feed" element={<Feed currentUser={currentUser} />} />
        <Route path="/matches/:userId" element={<Matches />} />
        <Route path="/chat/:matchId" element={<Chat />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
