import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../../services/api';
import Styles from './Chat.module.css';

const Chat = () => {
  const { matchId } = useParams();
  const location = useLocation();
  const { currentUser, matchedUserId } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.getMessagesBetween(currentUser.id, matchedUserId);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error.status);
        setError('Error fetching messages.');
      }
    };

    const fetchOtherUser = async () => {
      try {
        const response = await api.getUserById(matchedUserId);
        if (response.data) {
          setOtherUser(response.data);
        } else {
          setError('Other user not found.');
        }
      } catch (error) {
        console.error('Error fetching other user:', error.response?.data || error.message);
        setError('Error fetching other user.');
      }
    };

    if (currentUser && matchedUserId) {
      fetchMessages();
      fetchOtherUser();
    }
  }, [currentUser, matchedUserId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const formData = {
        sender_id: Number(currentUser.id),
        recipient_id: Number(matchedUserId),
        message: newMessage,
        time: new Date().toISOString()
      };

      console.log('Sending message with formData:', formData);

      const response = await api.sendMessage(formData);
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message);

      if (error.response) {
        console.error('Server responded with:', error.response.data);
        setError(`Error sending message: ${error.response.data.message || 'Internal Server Error'}`);
      } else {
        setError('Error sending message.');
      }
    }
  };

  return (
    <div className={Styles.chatContainer}>
      <h2>Chat with {otherUser?.username}</h2>
      {error && <div className={Styles.error}>{error}</div>}
      <div className={Styles.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${Styles.message} ${message.sender_id === currentUser.id ? Styles.sent : Styles.received}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className={Styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
