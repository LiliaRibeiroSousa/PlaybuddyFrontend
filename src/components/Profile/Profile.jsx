import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Styles from './Profile.module.css';
import ProfileCard from './ProfileCard';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    location: '',
    games: '',
    platforms: '',
    skill_level: '',
    profile_picture: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getUserById(userId);
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          bio: response.data.bio,
          location: response.data.location,
          games: response.data.games,
          platforms: response.data.platforms,
          skill_level: response.data.skill_level,
          profile_picture: response.data.profile_picture,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      await api.updateUser(userId, formDataObj);
      setUser({ ...user, ...formData });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteUser(userId);
      navigate('/'); // Redirect to homepage or another route after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={Styles.profileContainer}>
      {user ? (
        <ProfileCard
          user={user}
          editMode={editMode}
          formData={formData}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      ) : (
        <p>Loading...</p>
      )}
      <div className={Styles.buttonContainer}>
        <button
          className={Styles.editProfileButton}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
        {editMode && (
          <>
            <button className={Styles.saveButton} onClick={handleSave}>Save</button>
            <button className={Styles.deleteButton} onClick={handleDelete}>
              Delete Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
