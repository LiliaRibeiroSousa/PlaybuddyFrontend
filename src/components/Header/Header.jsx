
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './Header.module.css';


const Header = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
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
            src={currentUser.profilePicture}
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
          to={`/matches/${currentUser.userId}`} 
          className={`${Styles.navLink} ${location.pathname === `/matches/${currentUser.userId}` ? Styles.active : ''}`}>
          <i className="fas fa-comments"></i> <span>Chat</span>
        </Link>
        <Link 
          to={`/profile/${currentUser.userId}`} 
          className={`${Styles.navLink} ${location.pathname === `/profile/${currentUser.userId}` ? Styles.active : ''}`}>
          <i className="fas fa-user-circle"></i> <span>Profile</span>
        </Link>
        <div 
          className={`${Styles.navLink} ${Styles.logoutIcon}`} 
          onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
