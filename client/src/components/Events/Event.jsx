import React from "react";
import "./Event.css";
import ViewEvents from "../ViewEvents/ViewEvents";
import CreateEvent from "../CreateEvent/CreateEvent";

export default class Events extends React.Component {
  render() {
    return (
      <div clasName="Users">
        <div className="CreateUserContainer">
          <CreateEvent />
        </div>
        <div className="ViewUsersContainer">
          <ViewEvents />
        </div>
      </div>
    );
  }
}
