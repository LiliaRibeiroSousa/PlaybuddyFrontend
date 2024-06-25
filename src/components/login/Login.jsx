import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Styles from './Login.module.css';
import { Link } from 'react-router-dom';
import tetrisheart from '../../assets/tetris-heart.jpg';

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submission
    try {
      const formDataObj = new FormData();
      formDataObj.append('usernameOrEmail', formData.usernameOrEmail);
      formDataObj.append('password', formData.password);

      const response = await api.login(formDataObj);

      // Assuming response.data contains necessary fields: token, user_id, username, profile_picture, email
      const { token, user_id, username, profile_picture, email } = response.data;

      // Store user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user_id.toString()); // Convert user_id to string if needed
      localStorage.setItem('username', username);
      localStorage.setItem('profilePicture', profile_picture);
      localStorage.setItem('email', email);

      // Update current user state
      onLogin({
        token,
        userId: user_id,
        username,
        profilePicture: profile_picture,
        email,
      });

      // Redirect to feed page or another relevant page
      navigate('/feed');
    } catch (error) {
      console.error('Login error', error);
      if (error.response) {
        setError(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('Login error. Please check your network connection.');
      }
    }
  };

  return (
    <div className={Styles.loginForm}>
      <img src={tetrisheart} alt="Tetris Heart" />
      <h2>Login</h2>
      {error && <p className={Styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="usernameOrEmail">Username or Email</label>
        <input
          id="usernameOrEmail"
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        No account?{' '}
        <Link to="/register" style={{ textDecoration: 'underline', color: 'blue' }}>
          Register here
        </Link>
      </p>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
