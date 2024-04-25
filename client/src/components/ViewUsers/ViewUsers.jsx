import "./ViewUsers.css";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ViewUsers = ({ users, setUsers }) => {
  //Destructure user and isAuthenticated from the useAuth0 hook
  const { user, isAuthenticated } = useAuth0();

  // Fetch users data from API when component mounts or auth status changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Check if user is authenticated before proceeding
        if (isAuthenticated && user) {
          // Get the authenticated user's ID
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
          // Filter users to show only those belonging to the authenticated user
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

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      // Delete user via API
      const response = await fetch(
        `https://deliver-greeting-cards.herokuapp.com/api/users/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      // Update local users state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user", err.message);
    }
  };

  // Render users table if user is authenticated
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
                {/* Map through users array to display users data */}
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name ? user.name : "Unknown"}</td>
                    <td>{user.address_id || "N/A"}</td>
                    <td>
                      {/* Button to delete a user */}
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
    // Render sign-in message if user is not authenticated
    return(
      <div>
        <p>Sign in Please</p>
      </div>
    );
  }
  
};

export default ViewUsers; // Export ViewUsers component as default
