// src/components/MatchPage/MatchPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Styles from "./MatchPage.module.css";
import heartIcon from "../../assets/pinkheart1.jpeg"; // Add a heart icon image in your assets folder

const MatchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { matchUser } = location.state || {};
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!matchUser) {
    return <div>No match data found</div>;
  }

  const handleContinueSwiping = () => {
    navigate("/feed");
  };

  const handleChat = () => {
    navigate(`/chat/${matchUser.id}`);
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
        <button onClick={handleContinueSwiping}>Continue Swiping</button>
        <button onClick={handleChat}>Chat Now</button>
      </div>
    </div>
  );
};

export default MatchPage;
