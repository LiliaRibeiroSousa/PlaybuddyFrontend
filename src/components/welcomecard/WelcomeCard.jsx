import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomeCard = () => {
  const navigate = useNavigate();
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeInOut" } },
    hover: { scale: 1.1 },
  };


    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover="hover" // Add hover animation
        style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
        padding: '20px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'rgb(245, 79, 123)',
        width: '80%',
        maxWidth: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h1>Welcome to PlayBuddy!</h1>
      <p>Looking for your Player 2? </p>
      <p>Join us now and find your perfect match!</p>
    
      
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <button onClick={() => navigate('/login')}
          style={{
            backgroundColor: 'rgb(245, 79, 123)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            outline: 'none',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            flex: 1,
          }}>Login</button>
        <button onClick={() => navigate('/register')}
          style={{
            backgroundColor: '#009596',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            outline: 'none',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            flex: 1,
          }}>Register</button>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
