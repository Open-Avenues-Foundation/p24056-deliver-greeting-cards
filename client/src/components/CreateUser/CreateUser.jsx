import "./CreateUser.css"
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const CreateUser = ({ users, setUsers }) => {
  // Destructure user and isAuthenticated from the useAuth0 hook
  const { user, isAuthenticated } = useAuth0();

  // State to manage form data for creating a new user
  const [formData, setFormData] = useState({
    name: "",
    address_id: "",
    events: [], // Initalize events as en empty array
    application_user_id: isAuthenticated ? user.sub : "", // Set application_user_id if authenticated
  });

  // Handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission when creating a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only continue the functionality of submission if user is authenticated
    if (!isAuthenticated || !user) {
      console.log("User is not authenticated. Cannot create user.");
      return;
    }

    // Construct the user data object for the API request
    const newUser = {
      name: formData.name,
      address_id: formData.address_id,
      events: formData.events, // Include events from formData
      application_user_id: user.sub, // Set application_user_id to authenticated user's sub
    };

    try {
      // Send POST request to API to create a new user
      const response = await fetch("https://deliver-greeting-cards.herokuapp.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser), // Convert newUser object to JSON string
      });

      if (response.ok) {

        const createdUser = await response.json(); // Get the created user object from response

        // Update local state with the new user including its returned id
        setUsers([...users, createdUser]);


        // Reset form state after successful user creation
        setFormData({
          name: "",
          address_id: "",
          events: [],
          application_user_id: isAuthenticated ? user.sub : "",
        });
      } else {
        // Handle non-successful API response (e.g., server error)
        console.error("Failed to create user:", response.statusText);
      }
    } catch (error) {
      // Handle fetch or network error
      console.error("Error creating user:", error);
    }
  };


  return (
    <div className="postUser">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: 
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>Address ID: 
            <input
              type="text"
              name="address_id"
              value={formData.address_id}
              onChange={handleInputChange}
            />
          </label>
        </div>
        {/* Conditionally render button based on authentication status */}
        {isAuthenticated ? (
          <button type="submit">Add User</button>
        ) : (
          <p>Please sign in to create a user.</p>
        )}
      </form>
    </div>
  );
};

export default CreateUser; // Export CreateUser component as default
