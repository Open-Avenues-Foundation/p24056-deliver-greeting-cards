import React from "react";
import axios from "axios";
import LoginButton from "./hooks/LoginButton";
import Profile from "./hooks/Profile";
import "./LoginComponent.css";
import LogoutButton from "./logout.jsx";
export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], // This will hold the fetched user data
    };
  }

  fetchUsers = () => {
    axios
      .get("https://deliver-greeting-cards.herokuapp.com/api/auth_users")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  render() {
    // Directly displaying fetched user data as text
    return (
      <div>
        <div className="Profile Display">
          <Profile />
        </div>

        <div className="loginbutton">
          <LoginButton />{" "}
        </div>
        <div className="loginbutton">
          <LogoutButton />{" "}
        </div>

        {this.state.users.map((user) => (
          <div key={user.id}>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
          </div>
        ))}
      </div>
    );
  }
}
