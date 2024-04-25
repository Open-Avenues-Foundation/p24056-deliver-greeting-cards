import React, { useState } from "react";
import CreateUser from "../CreateUser/CreateUser";
import ViewUsers from "../ViewUsers/ViewUsers";
import "./Users.css";


// Define the Users component
const Users = () => {
  // State to manage the list of users; setUsers is used to update this list
  const [users, setUsers] = useState([]);

  return (
    <div className="Users">
      <div className="CreateUserContainer">
        {/* Render CreateUser component with users state and setUsers function as props */}
        <CreateUser users={users} setUsers={setUsers}/>
      </div>
      <div className="ViewUsersContainer">
        {/* Render ViewUsers component with users state and setUsers function as props */}
        <ViewUsers users={users} setUsers={setUsers}/>
      </div>
    </div>
  );
};

export default Users;

