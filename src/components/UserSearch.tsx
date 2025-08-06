import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "../api/github";
import UserCard from "./UserCard";

function UserSearch() {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    // Assign a query key, and a variable to run the queryFn on change
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
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
        <UserCard user={data} />
      ) : null}
    </>
  )
}

export default UserSearch