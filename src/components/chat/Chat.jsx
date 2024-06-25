/* import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import Styles from './Chat.module.css';

const Chat = ({ currentUser }) => {
    const { matchId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.getMessagesBetween(currentUser.id, matchId);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };

        fetchMessages();
    }, [currentUser.id, matchId]);

    const handleSendMessage = async () => {
        try {
            await api.sendMessage({
                sender_id: currentUser.id,
                recipient_id: matchId,
                message: newMessage,
                time: new Date().toISOString()
            });
            setMessages([...messages, { text: newMessage, sender: 'me' }]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <div className={Styles.chatContainer}>
            <div className={Styles.messages}>
                {messages.map((msg, index) => (
                    <div key={index} className={Styles.message}>
                        <span className={msg.sender === 'me' ? Styles.myMessage : Styles.theirMessage}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

Chat.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default Chat;
 */