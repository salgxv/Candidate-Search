import { Candidate } from "../interfaces/Candidate.interface";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface CandidateCardProps {
  candidate: Candidate;
  onAdd?: () => void;       
  onIgnore?: () => void;    
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onAdd, onIgnore }) => {
  return (
    <div className="candidate-card">
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        <img src={candidate.avatar_url} alt={candidate.username} />
      </a>
      <h2>{candidate.name} ({candidate.username})</h2>
      <p>Location: {candidate.location}</p>
      <p>Email: <a href={`mailto:${candidate.email}`}>{candidate.email}</a></p>
      <p>Company: {candidate.company}</p>

      {/* Only show buttons if functions are provided */}
      {(onAdd || onIgnore) && (
        <div className="candidate-actions">
          {onIgnore && <FaMinusCircle className="redButton" onClick={onIgnore} />}
          {onAdd && <FaPlusCircle className="greenButton" onClick={onAdd} />}
        </div>
      )}
    </div>
  );
};

export default CandidateCard;