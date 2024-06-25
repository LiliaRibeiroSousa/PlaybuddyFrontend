import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Swipe from '../../components/swipe/Swipe';
import Styles from './Feed.module.css';

const Feed = ({ currentUser }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.getUsers();
                const data =  response.data;
                console.log(data)
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
        console.log(users);
    }, []);

    const handleSwipeAction = async (direction) => {
        if (!currentUser || !currentUser.id) {
            console.error('currentUser is null or undefined');
            return;
        }

        const swipedUser = users[0];

        try {
            const formData = new FormData();
            formData.append('user_id', currentUser.id);
            formData.append('swiped_on_id', swipedUser.id);
            formData.append('direction', direction);
            formData.append('time', new Date().toISOString());

            const swipeResponse = await api.createSwipe(formData);
            console.log('Swipe response:', swipeResponse);

            const matchCheckResponse = await api.checkMatch(currentUser.id, swipedUser.id);
            console.log('Match check response:', matchCheckResponse);

            if (matchCheckResponse.data.match) {
                const matchFormData = new FormData();
                matchFormData.append('userid1', currentUser.id);
                matchFormData.append('userid2', swipedUser.id);
                matchFormData.append('time', new Date().toISOString());

                const matchResponse = await api.createMatch(matchFormData);
                console.log('Match response:', matchResponse);

                alert(`You matched with ${swipedUser.username}!`);
            }
        } catch (error) {
            console.error('Error creating swipe or match:', error.response ? error.response.data : error.message);
        }

        const newUserList = users.slice(1);
        setUsers(newUserList);

        console.log(`${swipedUser.username} was ${direction === 'right' ? 'liked' : 'passed'}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={Styles.feed}>
            <h2>Find your Buddy</h2>
            <div className={Styles.swipeContainer}>
                {users.length > 0 && currentUser ? (
                    <Swipe key={users[0].id} user={users[0]} onSwipe={handleSwipeAction} />
                ) : (
                    <p>No more users to display</p>
                )}
            </div>
            <div className={Styles.buttonContainer}>
                <Link to="/matches" className={Styles.matchesLink}>
                    Go to Matches
                </Link>
            </div>
        </div>
    );
};

Feed.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default Feed;
