import React from 'react';
import Styles from './ProfileCard.module.css';

const ProfileCard = ({ user, editMode, formData, handleChange, handleSave }) => {
  return (
    <div className={Styles.profileCard}>
      <img
        src={user.profile_picture || formData.profile_picture}
        alt={`${user.username}'s profile`}
        className={Styles.profilePicture}
      />
      <h2>{user.username}</h2>
      {editMode ? (
        <div className={Styles.editForm}>
          <div className={Styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Bio:</label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Games:</label>
            <input
              type="text"
              name="games"
              value={formData.games}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Platforms:</label>
            <input
              type="text"
              name="platforms"
              value={formData.platforms}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Skill Level:</label>
            <input
              type="text"
              name="skill_level"
              value={formData.skill_level}
              onChange={handleChange}
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Profile Picture:</label>
            <input
              type="file"
              name="profile_picture"
              onChange={handleChange}
            />
          </div>
          
        </div>
      ) : (
        <div className={Styles.profileDetails}>
          
          <p className={Styles.bio}>{user.bio}</p>
          <p className={Styles.location}><strong>Location: </strong>{user.location}</p>
          <p className={Styles.games}><strong>Games: </strong>{user.games}</p>
          <p className={Styles.platforms}><strong>Platforms: </strong>{user.platforms}</p>
          <p className={Styles.skill_level}><strong>Skill Level: </strong>{user.skill_level}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
