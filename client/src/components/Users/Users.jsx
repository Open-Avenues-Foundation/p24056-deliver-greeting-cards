import React, { useState } from "react";
import CreateUser from "../CreateUser/CreateUser";
import ViewUsers from "../ViewUsers/ViewUsers";
import "./Users.css";


const Users = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className="Users">
      <div className="CreateUserContainer">
        <CreateUser users={users} setUsers={setUsers}/>
      </div>
      <div className="ViewUsersContainer">
        <ViewUsers users={users} setUsers={setUsers}/>
      </div>
    </div>
  );
};

export default Users;

