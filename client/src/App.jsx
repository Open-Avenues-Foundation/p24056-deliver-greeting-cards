import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import CreateUser from "./components/CreateUser/CreateUser";
import ViewUsers from "./components/ViewUsers/ViewUsers";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import ViewEvents from "./components/ViewEvents/ViewEvents";
import Events from "./components/Events/Event";
import Users from "./components/Users/Users";
import Login from "./components/LoginComponent";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/postuser" element={<CreateUser />} />
          <Route path="/getusers" element={<ViewUsers />} />
          <Route path="/postevent" element={<CreateEvent />} />
          <Route path="/getevents" element={<ViewEvents />} />
          <Route path="/events" element={<Events />} />
          <Route path="/users" element={<Users />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
