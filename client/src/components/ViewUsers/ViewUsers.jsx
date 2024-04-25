import "./ViewUsers.css";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ViewUsers = ({ users, setUsers }) => {
  // const [users, setUsers] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (isAuthenticated && user) {
          const application_user_id = user.sub;
          const response = await fetch(
            "https://deliver-greeting-cards.herokuapp.com/api/users",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          const data = await response.json();
          const filteredUsers = data.filter(
            (user) => user.application_user_id === application_user_id
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [isAuthenticated, user, setUsers]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://deliver-greeting-cards.herokuapp.com/api/users/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user", err.message);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div>
        <div className="header">
          <div className="home">
            <table>
              <thead>
                <tr>
                  <th className="header-cell">Name</th>
                  <th className="header-cell">Address ID</th>
                  <th className="header-cell">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name ? user.name : "Unknown"}</td>
                    <td>{user.address_id || "N/A"}</td>
                    <td>
                      <button onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return(
      <div>
        <p>Sign in Please</p>
      </div>
    );
  }
  
};

export default ViewUsers;
