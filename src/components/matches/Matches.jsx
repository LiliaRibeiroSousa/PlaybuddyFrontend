import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Styles from './Matches.module.css';

const Matches = ({ currentUser }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await api.getMatches();
                const userMatches = response.data.filter(
                    match => match.userid1 === currentUser.id || match.userid2 === currentUser.id
                );
                setMatches(userMatches);
            } catch (error) {
                console.error('Error fetching matches', error);
            }
        };

        fetchMatches();
    }, [currentUser.id]);

    return (
        <div className={Styles.matchesContainer}>
            <div className={Styles.matchList}>
                <h2>Your matches</h2>
                {matches.map(match => (
                    <div key={match.id}>
                        <Link to={`/chat/${match.id}`}>
                            <img src={match.profile_picture} alt={match.username} />
                            <p>{match.username}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

Matches.propTypes = {
    currentUser: PropTypes.object.isRequired, 
};

export default Matches;
