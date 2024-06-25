import PropTypes from 'prop-types';
import TinderCard from 'react-tinder-card';
import Styles from './Swipe.module.css';
import { FaHeart, FaTimes, FaStar } from 'react-icons/fa';

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
                    <h3>{user.username}</h3>
                    <p>{user.bio}</p>
                    <p>{user.games}</p>
                </div>
            </TinderCard>
            <div className={Styles.buttons}>
                <button onClick={() => handleSwipe('left')} className={Styles.dislike}>
                    <FaTimes size={24} />
                </button>
                <button onClick={() => handleSwipe('super')} className={Styles.superLike}>
                    <FaStar size={24} />
                </button>
                <button onClick={() => handleSwipe('right')} className={Styles.like}>
                    <FaHeart size={24} />
                </button>
            </div>
        </div>
    );
};

Swipe.propTypes = {
    user: PropTypes.object,
    onSwipe: PropTypes.func.isRequired,
};

export default Swipe;
