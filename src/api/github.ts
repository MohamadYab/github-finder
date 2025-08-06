const API_URL = import.meta.env.VITE_GITHUB_API_URL;

export async function fetchGithubUser(username: string) {
  const response = await fetch(`${API_URL}/users/${username}`);
  if (!response.ok) throw new Error("User not found");
  const data = await response.json();
  return data;
}