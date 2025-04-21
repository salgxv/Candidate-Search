import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithub, searchGithubUser } from "../api/API";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const users = await searchGithub();

      // Get detailed user info
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
    setIndex((prev) => prev + 1);
  };

  const skipCandidate = () => {
    setIndex((prev) => prev + 1);
  };

  if (index >= candidates.length) {
    return <h2>No more candidates available.</h2>;
  }

  const current = candidates[index];

  return (
    <div>
      <img src={current.avatar_url} width="100" />
      <h2>{current.name}</h2>
      <p>Username: {current.username}</p>
      <p>Email: {current.email}</p>
      <p>Location: {current.location}</p>
      <p>Company: {current.company}</p>
      <a href={current.html_url} target="_blank">GitHub Profile</a>
      <div>
        <button onClick={skipCandidate}>-</button>
        <button onClick={saveCandidate}>+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;