import { useState, useEffect } from "react";
import api from "../../services/api";
import Swipe from "../../components/swipe/Swipe";
import Styles from "./Feed.module.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matchMessage, setMatchMessage] = useState('');
  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const user1 = parseInt(localStorage.getItem("userId"), 10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getUsers();
        const data = response.data;
        const swipedUsers = await api.getSwipeById(user1);
        const SwipedIds = swipedUsers.data.map((swipe) => swipe.swiped_on_id);
        const remainingUsers = data.filter(
          (user) => !SwipedIds.includes(user.id)
        );
        const FinalUsers = remainingUsers.filter((user) => user.id !== user1);
        console.log(FinalUsers);
        setUsers(FinalUsers);
        setCurrentUser(FinalUsers[0] || null); // Set the first user from remaining users as the currentUser, or null if no users left
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user1]);

  const handleSwipeAction = async (direction) => {
    if (!currentUser || !currentUser.id) {
      console.error("currentUser is null or undefined");
      return;
    }

    const swipedUser = users[0];

    try {
      const formData = new FormData();
      formData.append("user_id", user1);
      formData.append("swiped_on_id", swipedUser.id);
      formData.append("direction", direction);
      formData.append("time", moment().format("YYYY-MM-DD HH:mm:ss"));

      const swipeResponse = await api.createMatch(formData);
      console.log("Swipe response:", swipeResponse);

      if (swipeResponse.data.status === "No match")  {
        console.log("No match");
      } else {
        console.log("Match");
        setMatchMessage(`It's a match with ${swipedUser.username}!`);
        setShowMatchPopup(true);
        setTimeout(() => setShowMatchPopup(false), 2000); // Hide pop-up after 2 seconds
      }
    } catch (error) {
      console.error(
        "Error creating swipe or match:",
        error.response ? error.response.data : error.message
      );
    }

    const newUserList = users.slice(1);
    setUsers(newUserList);
    setCurrentUser(newUserList[0] || null); // Set the next user as the currentUser, or null if no users left

    console.log(
      `${swipedUser.username} was ${direction === "right" ? "liked" : "passed"}`
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={Styles.feed}>
      <h2>Find your Buddy</h2>
      <div className={Styles.swipeContainer}>
        {users.length > 0 && currentUser ? (
          <Swipe
            key={currentUser.id}
            user={currentUser}
            onSwipe={handleSwipeAction}
          />
        ) : (
          <p>No more users to display</p>
        )}
      </div>
      <div className={Styles.buttonContainer}>
        <button onClick={() => navigate(`/matches/${user1}`, { state: { currentUser } })}>View Matches</button>
      </div>
      {showMatchPopup && (
        <div className={Styles.matchPopup}>
          {matchMessage}
        </div>
      )}
    </div>
  );
};

export default Feed;
