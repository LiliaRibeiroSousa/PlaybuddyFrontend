import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import styles from './WelcomeCard.module.css';


const WelcomeCard = () => {

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '20px',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'hotpink',
        textTransform: 'uppercase'
      }}
    >
      Welcome to Playbuddy!<br />Ready to play?<br /><br />
      
      <button onClick={() => navigate('/login')}
          style={{
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer',
          outline: 'none', 
          textTransform: 'uppercase',
          fontWeight: 'bold'
      }}>Get Started</button>
    </motion.div>
  );
};

export default WelcomeCard;
