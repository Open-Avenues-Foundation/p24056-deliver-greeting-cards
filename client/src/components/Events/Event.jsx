import React, { useState } from "react";
import CreateEventTest from "../CreateEvent/CreateEvent";
import ViewEventsTest from "../ViewEvents/ViewEvents";
import "./Event.css";

// Define the Events component
const Events = () => {
    // State to manage the list of events; setEvents is used to update this list
    const [events, setEvents] = useState([]);

    return (
        <div className="Events">
            <div className="CreateEventContainer postEvent">
                {/* Render CreateEvent component with events state and setEvents function as props */}
                <CreateEventTest events={events} setEvents={setEvents} />
            </div>
            <div className="ViewEventsContainer postEvent">
                {/* Render ViewEvents component with events state and setEvents function as props */}
                <ViewEventsTest events={events} setEvents={setEvents} />
            </div>
        </div>
    );
};

export default Events; // Export Events component as default
