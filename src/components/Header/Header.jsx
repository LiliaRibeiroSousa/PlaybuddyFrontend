import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import Styles from './Header.module.css';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!userId) return;

      try {
        const response = await api.getUserById(userId);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/')
  }

  return (
    <div className={Styles.sidebar}>
      <div className={Styles.titleSection}>
        <h1>Playbuddy</h1>
      </div>
      {currentUser && (
        <div className={Styles.profile}>
          <img
            src={currentUser.profile_picture}
            alt={`${currentUser.username}'s profile`}
            className={Styles.profilePicture}
          />
          <p className={Styles.username}>{currentUser.username}</p>
        </div>
      )}
      <nav className={Styles.nav}>
        <Link 
          to="/feed" 
          className={`${Styles.navLink} ${location.pathname === '/feed' ? Styles.active : ''}`}>
          <i className="fas fa-home"></i> <span>Home</span>
        </Link>
        
        <Link 
          to={`/matches/${userId}`} 
          className={`${Styles.navLink} ${location.pathname === `/matches/${userId}` ? Styles.active : ''}`}>
          <i className="fas fa-comments"></i> <span>Chat</span>
        </Link>
        {currentUser && (
          <Link 
            to={`/profile/${userId}`} 
            className={`${Styles.navLink} ${location.pathname === `/profile/${userId}` ? Styles.active : ''}`}>
            <i className="fas fa-user-circle"></i> <span>Profile</span>
          </Link>
        )}
        <div 
          className={`${Styles.navLink} ${Styles.logoutIcon}`} 
          onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
