import { FaClock, FaUser } from "react-icons/fa";

type RecentSearchProps = {
  users: string[];
  onClick: (username: string) => void;
};

function RecentSearches({ users, onClick }: RecentSearchProps) {
  return (
    <div className="recent-searches">
      <div className="recent-header">
        <FaClock />
        <h3>Recent Searches</h3>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button
              onClick={() => onClick(user)}
            >
              <FaUser className="user-icon"/>
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentSearches