import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

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
        <ul>
          {savedCandidates.map((c, index) => (
            <li key={index}>
              <img src={c.avatar_url} alt={c.name} width="50" />
              <strong>{c.name}</strong> ({c.username}) - {c.company}
              <a href={c.html_url} target="_blank"> GitHub</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;