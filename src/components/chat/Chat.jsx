import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../../services/api';
import Styles from './Chat.module.css';

const Chat = () => {
  const { matchId } = useParams();
  const location = useLocation();
  const { currentUser, matchedUserId } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState();
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.getMessagesBetween(currentUser.id, matchedUserId);
        setMessages(response.data);
        console.log('Fetched messages:', response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Error fetching messages.');
      }
    };

    const fetchOtherUser = async () => {
      try {
        const response = await api.getUserById(matchedUserId);
        if (response.data) {
          setOtherUser(response.data);
          console.log('Other user:', response.data);
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
  }, [currentUser, matchedUserId, matchId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatDate = (date) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formatTime = (date) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${hours}:${minutes}`;
  };

  const handleSendMessage = async () => {
    const formData = new FormData();
    formData.append('sender_id', currentUser.id);
    formData.append('recipient_id', matchedUserId);
    formData.append('message', newMessage);
    formData.append('time', formatDate(new Date()));

    try {
      const response = await api.sendMessage(formData);
      const data = response.data;
      console.log('Message sent:', data);

      // Add the new message to the messages state
      setMessages([...messages, data]);
      setNewMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message.');
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
            className={`${Styles.messageContainer} ${message.sender_id === currentUser.id ? Styles.sentContainer : Styles.receivedContainer}`}
          >
            {message.sender_id !== currentUser.id && (
              <img
                src={otherUser?.profile_picture}
                alt="profile"
                className={Styles.profilePic}
              />
            )}
            <div className={`${Styles.message} ${message.sender_id === currentUser.id ? Styles.sent : Styles.received}`}>
              <span className={Styles.messageText}>{message.message}</span>
              <span className={Styles.timestamp}>{formatTime(new Date(message.time))}</span>
            </div>
            {message.sender_id === currentUser.id && (
              <img
                src={currentUser.profile_picture}
                alt="profile"
                className={Styles.profilePic}
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
