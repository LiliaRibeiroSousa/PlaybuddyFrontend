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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submission
    try {
      //console.log(formData)
      const formDataObj = new FormData();
      formDataObj.append('usernameOrEmail', formData.usernameOrEmail);
      formDataObj.append('password', formData.password);

      const response = await api.login(formDataObj);
      onLogin(response.data);
      
      navigate('/feed');
    } catch (error) {
      console.error('Login error', error);
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setError(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Login error. Please check your network connection.');
      }
    }
  };

  return (
    
    <div className={Styles.loginForm}>
      <img src={tetrisheart}></img>
      <h2>Login</h2>
      {error && <p className={Styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
