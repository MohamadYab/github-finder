import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaGithubAlt } from "react-icons/fa";

const API_URL = import.meta.env.VITE_GITHUB_API_URL;

function UserSearch() {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users/${submittedUsername}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      return data;
    },
    enabled: !!submittedUsername,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedUsername(username.trim());
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="form"
      >
        <input
          type="text"
          placeholder="Enter GitHub Username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      { isLoading ? (
        <p className="status">Loading...</p>
      ) : isError ? (
        <p className="status error">{error.message}</p>
      ) : data ? (
        <div className="user-card">
          <img
            src={data.avatar_url}
            alt={data.name}
            className="avatar"
          />
          <h2>{data.name || data.login}</h2>
          <p className="bio">{data.bio}</p>
          <a
            href={data.html_url}
            className="profile-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithubAlt /> View GitHub Profile
          </a>
        </div>
      ) : null}
    </>
  )
}

export default UserSearch