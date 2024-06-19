import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Styles from './Register.module.css'; 
import { Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    location: '',
    games: '',
    platforms: '',
    skill_level: '',
    profile_picture: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({...formData, [name]: files[0] });
    } else {
      setFormData({...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       console.log(formData)
    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      // Log the form data key-value pairs for debugging
      for (const pair of formDataObj.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await api.register(formDataObj);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={Styles.registerForm}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="bio" placeholder="Bio" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} />
        <input type="text" name="games" placeholder="Games" onChange={handleChange} />
        <input type="text" name="platforms" placeholder="Platforms" onChange={handleChange} />
        <input type="text" name="skill_level" placeholder="Skill Level" onChange={handleChange} />
        <input type="file" name="profile_picture" onChange={handleChange} />
        <button type="submit">Register</button>
        <p>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'underline', color: 'blue' }}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
