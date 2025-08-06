import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "../api/github";
import UserCard from "./UserCard";
import RecentSearches from "./RecentSearches";

function UserSearch() {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");
  const [recentUsers, setRecentUsers] = useState<string[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    // Assign a query key, and a variable to run the queryFn on change
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setSubmittedUsername(trimmed);
    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((user) => user !== trimmed)];
      return updated.slice(0,5);
    });
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
        <UserCard user={data} />
      ) : null}

      { recentUsers.length > 0 && (
        <RecentSearches
          users={recentUsers}
          onClick={(username) => {
            setUsername(username);
            setSubmittedUsername(username);
          }}
        />
      ) }
    </>
  )
}

export default UserSearch