import { PropTypes } from 'prop-types';

function MatchCard({ match }) {
  return (
    <div className="match-card">
      <h3>{match.username}</h3>
      <p>{match.bio}</p>
      {/* Additional match details here */}
    </div>
  );
}

MatchCard.propTypes = {
  match: PropTypes.object.isRequired,
 
};
export default MatchCard;
