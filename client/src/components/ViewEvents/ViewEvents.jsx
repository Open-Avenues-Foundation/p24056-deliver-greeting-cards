import React from "react";
import axios from "axios";
import "./ViewEvents.css";

export default class ViewEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://deliver-greeting-cards.herokuapp.com/api/events")
      .then((res) => {
        const events = res.data;
        console.log("events");
        console.log(events);
        console.log(events);
        this.setState({ events });
      });
  }

  handleDeleteEvent = (id) => {
    axios
      .delete(`https://deliver-greeting-cards.herokuapp.com/api/events/${id}`)
      .then((res) => {
        console.log("DELETED!!");
        console.log(res);
        console.log(res.data);
      });
    const updatedEvents = this.state.events.filter((event) => event.id !== id);
    this.setState({ events: updatedEvents });
  };

  render() {
    return (
      <div className="header">
        <div className="home">
          <h1>ID</h1>
          <table>
            {this.state.events.map((event) => {
              return (
                <tr key={event.id}>
                  <td>{event.id}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="home">
          <h1>Type</h1>
          <table>
            {this.state.events.map((event) => {
              return (
                <tr key={event.id}>
                  <td>{event.event_type}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="home">
          <h1>Date</h1>
          <table>
            {this.state.events.map((event) => {
              return (
                <tr key={event.id}>
                  <td>{event.date}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="home userID">
          <h1>User ID</h1>
          <table>
            {this.state.events.map((event) => {
              return (
                <tr key={event.id}>
                  <td>{event.user_id}</td>
                  <button onClick={() => this.handleDeleteEvent(event.id)}>
                    Delete entry
                  </button>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}
