import React from "react";
import axios from "axios";
import CreateUser from "../CreateUser/CreateUser";
import ViewUsers from "../ViewUsers/ViewUsers";

import "./Users.css";

export default class Users extends React.Component {
  // Your class methods and state go here, if needed

  render() {
    return (
      <div className="Users">
        <div className="CreateUserContainer">
          <CreateUser />
        </div>
        <div className="ViewUsersContainer">
          <ViewUsers />
        </div>
      </div>
    );
  }
}
