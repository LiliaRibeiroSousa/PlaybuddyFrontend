// src/pages/MatchPage.jsx
import { useNavigate, useLocation } from "react-router-dom";
import Styles from "./MatchPage.module.css";
import heartIcon from "../../assets/pinkheart1.jpeg";

const MatchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { matchUser } = location.state || {};
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { matchId } = location.state || {};

  if (!matchUser) {
    return <div>No match data found</div>;
  }

  const handleContinueSwiping = () => {
    navigate("/feed");
  };

  const handleChat = () => {
    console.log('Navigating to chat with state:', { currentUser, matchedUserId: matchUser.id, matchId });
    navigate(`/chat`, { state: { currentUser, matchedUserId: matchUser.id, matchId } });
  };
  

  return (
    <div className={Styles.matchPage}>
      <h2>It's a match!</h2>
      <div className={Styles.matchContainer}>
        <img src={currentUser.profilePicture} alt="Current User" className={Styles.userImage} />
        <img src={heartIcon} alt="Heart" className={Styles.heartIcon} />
        <img src={matchUser.profile_picture} alt="Matched User" className={Styles.userImage} />
      </div>
      <div className={Styles.buttonContainer}>
        <button className={Styles.continueButton} onClick={handleContinueSwiping}>Continue Swiping</button>
        <button className={Styles.chatNowButton} onClick={handleChat}>Chat Now</button>
      </div>
    </div>
  );
};

export default MatchPage;
