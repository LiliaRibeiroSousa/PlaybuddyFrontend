import { useState } from 'react';
import PropTypes from 'prop-types';
import TinderCard from 'react-tinder-card';
import Styles from './Swipe.module.css'; // Ensure you import your CSS module correctly

const Swipe = ({ user, onSwipe }) => {
    const [isSwiping, setIsSwiping] = useState(false);

    const handleSwipe = (direction) => {
        setIsSwiping(false); // Reset swiping state
        onSwipe(direction);
    };

    return (
        <TinderCard
            className={`swipe ${isSwiping ? 'swiping' : ''}`}
            onSwipe={(direction) => handleSwipe(direction)}
        >
            <div className={Styles.card}>
                <img src={user.profile_picture} alt={user.username} className={Styles.profilePicture} />
                <h3>{user.username}</h3>
                <p>{user.bio}</p>
                <p>{user.games}</p>
            </div>
        </TinderCard>
    );
};

Swipe.propTypes = {
    user: PropTypes.object.isRequired,
    onSwipe: PropTypes.func.isRequired,
};

export default Swipe;
