console.log("Token (from import.meta.env):", import.meta.env.VITE_GITHUB_TOKEN);

const token = import.meta.env.VITE_GITHUB_TOKEN;

const searchGithub = async () => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    console.log("GitHub Token:", token);

    const headers = {
      Authorization: `token ${token}`, // ✅ Use `token`, not Bearer
    };
    console.log("Request Headers:", headers);

    const response = await fetch("https://api.github.com/users?since=1", {
      headers,
    });

    console.log("Response:", response);
    const data = await response.json();

    if (!response.ok) {
      console.error("Error Response:", response);
      throw new Error(`Error ${response.status}: ${data.message}`);
    }

    console.log("GitHub users fetched successfully:", data);
    return data;
  } catch (err) {
    console.error("Error fetching GitHub users:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}`, // ✅ Same here
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data.message}`);
    }

    return data;
  } catch (err) {
    console.error("Error fetching GitHub user:", err);
    return {};
  }
};

export { searchGithub, searchGithubUser };