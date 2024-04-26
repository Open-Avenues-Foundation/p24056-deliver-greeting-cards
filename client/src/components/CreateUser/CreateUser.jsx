import React from "react";
import axios from "axios";
import "./CreateUser.css";
import { withAuth0 } from "@auth0/auth0-react";
class CreateUser extends React.Component {
  state = {
    name: "",
    address_id: "",
    events: [],
    application_user_id: "", // To be set from Auth0 user info
  };
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleAddressChange = (event) => {
    this.setState({ address_id: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      address_id: this.state.address_id,
      application_user_id: this.state.application_user_id,
    };

    axios
      .post("https://deliver-greeting-cards.herokuapp.com/api/users", data)
      .then((response) => {
        console.log("ADDED!!");
        console.log(response);
        console.log(response.data);
        // Reloading the page
        window.location.reload();
        this.setState((prevState) => ({
          events: [...prevState.events, response.data],
        }));
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address_id: "",
      events: [],
      application_user_id: "", // To be set from Auth0 user info
    };
  }

  componentDidMount() {
    const { user, isAuthenticated } = this.props.auth0;
    if (isAuthenticated && user) {
      this.setState({ application_user_id: user.sub });
    }
    axios
      .get("https://deliver-greeting-cards.herokuapp.com/api/events")
      .then((res) => {
        const events = res.data;
        this.setState({ events });
        this.setState({ events: res.data });
      });
  }

  render() {
    return (
      <div className="postUser">
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleNameChange} />
          </label>
          <label>
            Address ID:
            <input
              type="text"
              name="address_id"
              onChange={this.handleAddressChange}
            />
          </label>
          <button type="submit">Add User</button>
        </form>
      </div>
    );
  }
}
export default withAuth0(CreateUser);
