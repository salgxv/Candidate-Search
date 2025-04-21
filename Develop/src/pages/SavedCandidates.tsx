import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import CandidateCard from "../components/CandidateCard";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedCandidates");
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates.</p>
      ) : (
        savedCandidates.map((candidate, index) => (
          <CandidateCard key={index} candidate={candidate} />
        ))
      )}
    </div>
  );
};

export default SavedCandidates;