import { useState, useEffect } from 'react';
import api from '../../services/api';
import Swipe from '../../components/swipe/Swipe';
import Styles from './Feed.module.css';

const Feed = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSwipeAction = (direction) => {
        // Remove the user from the list if swiped left or right
        const newUserList = users.slice(1);
        setUsers(newUserList);

        // Log the swipe action for debugging purposes
        console.log(`${users[0].username} was ${direction === 'right' ? 'liked' : 'passed'}`);
    };

    return (
        <div className={Styles.feed}>
            <h2>Find your Buddy</h2>
            <div className={Styles.swipeContainer}>
                {users.length > 0 ? (
                    <Swipe
                        key={users[0].id}
                        user={users[0]}
                        onSwipe={handleSwipeAction}
                    />
                ) : (
                    <p>No more users to display</p>
                )}
            </div>
        </div>
    );
};

export default Feed;
