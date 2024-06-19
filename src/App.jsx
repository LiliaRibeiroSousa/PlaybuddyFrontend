import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Homepage from './pages/Homepage';
import Feed from './pages/feed/Feed';


function App() {
  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    // You can also perform additional actions such as updating state or context
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/feed" element={<Feed/>} />
      </Routes>
    </Router>
  );
}

export default App;
