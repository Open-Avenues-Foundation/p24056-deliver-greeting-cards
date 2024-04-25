import React, { useState } from "react";
import CreateEventTest from "../CreateEvent/CreateEvent";
import ViewEventsTest from "../ViewEvents/ViewEvents";
import "./Event.css";

const Events = () => {
    const [events, setEvents] = useState([]);

    return (
        <div className="Events">
            <div className="CreateEventContainer postEvent">
                <CreateEventTest events={events} setEvents={setEvents} />
            </div>
            <div className="ViewEventsContainer postEvent">
                <ViewEventsTest events={events} setEvents={setEvents} />
            </div>
        </div>
    );
};

export default Events;
