import { Candidate } from "../interfaces/Candidate.interface";
import { useState, useEffect } from "react";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("savedCandidates");
    if (data) {
      setSavedCandidates(JSON.parse(data));
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted yet.</p>
      ) : (
        <ul style={styles.list}>
          {savedCandidates.map((candidate, index) => (
            <li key={index} style={styles.card}>
              <img
                src={candidate.avatar_url}
                alt={candidate.name}
                width="80"
                style={styles.avatar}
              />
              <div>
                <h2>{candidate.name}</h2>
                <p><strong>Username:</strong> {candidate.username}</p>
                <p><strong>Email:</strong> {candidate.email}</p>
                <p><strong>Location:</strong> {candidate.location}</p>
                <p><strong>Company:</strong> {candidate.company}</p>
                <a href={candidate.html_url} target="_blank" rel="noreferrer">
                  GitHub Profile
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "1rem",
    marginBottom: "1rem",
  },
  avatar: {
    borderRadius: "50%",
  },
};

export default SavedCandidates;