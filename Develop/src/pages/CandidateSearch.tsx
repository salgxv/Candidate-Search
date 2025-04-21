import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithub, searchGithubUser } from "../api/API";
import { useState, useEffect } from "react";
import CandidateCard from "../components/CandidateCard";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const users = await searchGithub();

      const formatted = await Promise.all(
        users.slice(0, 10).map(async (user: any) => {
          const fullUser = await searchGithubUser(user.login);
          return {
            name: fullUser.name || fullUser.login,
            username: fullUser.login,
            location: fullUser.location || "N/A",
            avatar_url: fullUser.avatar_url,
            email: fullUser.email || "N/A",
            html_url: fullUser.html_url,
            company: fullUser.company || "N/A",
          };
        })
      );

      setCandidates(formatted);
    };

    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    saved.push(candidates[index]);
    localStorage.setItem("savedCandidates", JSON.stringify(saved));
    setIndex((prev: number) => prev + 1);
  };

  const skipCandidate = () => {
    setIndex((prev: number) => prev + 1);
  };

  if (index >= candidates.length) {
    return <h2>No more candidates available.</h2>;
  }

  return (
    <CandidateCard
      candidate={candidates[index]}
      onAdd={saveCandidate}
      onIgnore={skipCandidate}
    />
  );
};

export default CandidateSearch;