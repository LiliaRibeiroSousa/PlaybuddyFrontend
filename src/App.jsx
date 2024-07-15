import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Homepage from './pages/Homepage';
import Feed from './pages/feed/Feed';
import { useState, useEffect } from 'react';
import Chat from './components/chat/Chat';
import Matches from './components/matches/Matches';

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
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/feed" element={<Feed currentUser={currentUser} />} />
        <Route path="/matches/:userId" element={<Matches />} />
        <Route path="/chat/:matchId" element={<Chat/>} />
    
      </Routes>
    </Router>
  );
}

export default App;
