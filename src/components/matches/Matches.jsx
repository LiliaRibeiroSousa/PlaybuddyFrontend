// src/components/matches/Matches.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from './Matches.module.css';
import api from '../../services/api';

const Matches = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = parseInt(localStorage.getItem("userId"), 10);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!userId) return;

      try {
        const response = await api.getUserById(userId);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setError('Failed to fetch current user.');
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

        // Fetch user data and last message for each match
        const userMatches = await Promise.all(response.data.map(async match => {
          const matchedUserId = match.user_1_id === currentUser.id ? match.user_2_id : match.user_1_id;
          try {
            const userResponse = await api.getUserById(matchedUserId);
            const messagesResponse = await api.getMessagesBetween(currentUser.id, matchedUserId);

            // Get the last message
            const lastMessage = messagesResponse.data.length > 0 ? messagesResponse.data[messagesResponse.data.length - 1] : null;

            return {
              id: match.id,
              profile_picture: userResponse.data.profile_picture,
              username: userResponse.data.username,
              lastMessage,
              matchedUserId
            };
          } catch (error) {
            console.error('Error fetching matched user or messages:', error);
            return null;
          }
        }));

        setMatches(userMatches.filter(match => match !== null));
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Failed to fetch matches.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [currentUser?.id]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
                <div className={Styles.matchInfo}>
                  <span className={Styles.username}>{match.username}</span>
                  {match.lastMessage && (
                    <div className={Styles.messagePreview}>
                      <span className={Styles.lastMessage}>{match.lastMessage.message}</span>
                      <span className={Styles.messageTime}>{formatTime(match.lastMessage.time)}</span>
                    </div>
                  )}
                </div>
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
// src/pages