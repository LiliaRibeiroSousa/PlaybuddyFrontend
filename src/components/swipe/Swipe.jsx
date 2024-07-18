import PropTypes from 'prop-types';
import TinderCard from 'react-tinder-card';
import Styles from './Swipe.module.css';
import { FaHeart, FaTimes } from 'react-icons/fa';

const Swipe = ({ user, onSwipe }) => {
    if (!user) {
        return null; // Return null or loading indicator if user is not available
    }

    const handleSwipe = (direction) => {
        onSwipe(direction);
    };

    const handleCardLeftScreen = (direction) => {
        console.log(`${user.username} left the screen to the ${direction}`);
    };

    return (
        <div className={Styles.cardContainer}>
            <TinderCard
                className={Styles.swipe}
                onSwipe={handleSwipe}
                onCardLeftScreen={handleCardLeftScreen}
                preventSwipe={['up', 'down']} // Prevent vertical swipes
            >
                <div className={Styles.card}>
                    <img src={user.profile_picture} alt={user.username} className={Styles.profilePicture} />
                    <div className={Styles.cardContent}>
                        <h3 className={Styles.username}>{user.username}</h3>
                        <p className={Styles.bio}>{user.bio}</p>
                        <p className={Styles.location}><strong>Location:</strong> {user.location}</p>
                        <p className={Styles.games}><strong>Games:</strong> {user.games}</p>
                        <p className={Styles.skill_level}><strong>Skill Level:</strong> {user.skill_level}</p>
                        <p className={Styles.platforms}><strong>Platforms:</strong> {user.platforms}</p>
                    </div>
                    <div className={Styles.overlay}>
                        <button onClick={() => handleSwipe('left')} className={`${Styles.button} ${Styles.dislike}`}>
                            <FaTimes size={24} />
                        </button>
                        <button onClick={() => handleSwipe('right')} className={`${Styles.button} ${Styles.like}`}>
                            <FaHeart size={24} />
                        </button>
                    </div>
                </div>
            </TinderCard>
        </div>
    );
};

Swipe.propTypes = {
    user: PropTypes.object,
    onSwipe: PropTypes.func.isRequired,
};

export default Swipe;
