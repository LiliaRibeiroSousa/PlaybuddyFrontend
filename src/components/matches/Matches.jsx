// src/components/matches/Matches.js

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from './Matches.module.css';
import api from '../../services/api';

const Matches = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"), 10);

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

  useEffect(() => {
    const fetchMatches = async () => {
      if (!currentUser?.id) return;

      try {
        const response = await api.getMatches();
        console.log('Fetched matches:', response.data);

        // Fetch user data for each match
        const userMatches = await Promise.all(response.data.map(async match => {
          const matchedUserId = match.user_1_id === currentUser.id ? match.user_2_id : match.user_1_id;
          try {
            const userResponse = await api.getUserById(matchedUserId);
            return {
              id: match.id,
              profile_picture: userResponse.data.profile_picture,
              username: userResponse.data.username, matchedUserId
            };
          } catch (error) {
            console.error('Error fetching matched user:', error);
            return null;
          }
        }));

        setMatches(userMatches.filter(match => match !== null));
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, [currentUser?.id]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={Styles.matchesContainer}>
      <div className={Styles.matchList}>
        <h2>Your matches</h2>
        {matches.length > 0 ? (
          matches.map(match => (
            <div key={match.id} className={Styles.matchItem}>
             <Link to={`/chat/${match.id}`} state={{ currentUser, matchedUserId: match.matchedUserId }} className={Styles.matchLink}>
                <img src={match.profile_picture} alt={match.username} className={Styles.profilePicture} />
                <span className={Styles.username}>{match.username}</span>
              </Link>
            </div>
          ))
        ) : (
          <p>No matches found</p>
        )}
      </div>
    </div>
  );
};

export default Matches;
