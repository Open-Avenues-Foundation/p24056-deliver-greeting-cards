import React, { useState, useEffect }from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./ViewEvents.css"


const ViewEvents = ({ events, setEvents }) => {
    // Destructure user and isAuthenticated from the useAuth0 hook
    const {user, isAuthenticated} = useAuth0();

    // Fetch events data from API when component mounts or auth status changes
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                 // Check if user is authenticated before proceeding
                if (isAuthenticated && user)  {
                    // Get the authenticated user's ID
                    const application_user_id = user.sub;
                    const response = await fetch("https://deliver-greeting-cards.herokuapp.com/api/events", 
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to fetch events");
                    }

                    const data = await response.json();
                    // Filter events to show only those belonging to the authenticated user
                    const filteredEvents = data.filter(
                        (event) => event.application_user_id === application_user_id
                    );
                    setEvents(filteredEvents);
                }
            } catch (error) {
                console.error("Error fetching events: ", error);
            }
        };
        fetchEvents();
    }, [isAuthenticated, setEvents]);

    // Handle event deletion
    const handleDelete = async (id) => {
        try {
            // Delete event via API
            const response = await fetch(
                `https://deliver-greeting-cards.herokuapp.com/api/events/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type" : "application/json",
                    }
                }
            );

            // Update local events state after successful deletion
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        } catch (err) {
            console.error("Error deleting event: ", err.message);
        }
    };

    // Render events table if user is authenticated
    if (user && isAuthenticated) {
        return (
          <div className="header">
            <div className="home">
              <table>
                <thead>
                  <tr>
                    <th className="header-cell">ID</th>
                    <th className="header-cell">Type</th>
                    <th className="header-cell">Date</th>
                    <th className="header-cell">UserId</th>
                    <th className="header-cell">Actions</th>
                  </tr>
                </thead>
                <tbody> 
                    {/* Map through events array to display event data */}
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.event_type || "Unknown Event"}</td>
                            <td>{event.date || "Unknown Date"}</td>
                            <td>{event.user_id || "Unknown UserId"}</td>
                            <td>
                                {/* Button to delete an event */}
                                <button onClick={() => handleDelete(event.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        );
    } else {
        // Render sign-in message if user is not authenticated
        return (
            <div>
                <p>Please Sign In</p>
            </div>
        );
    }

};

export default ViewEvents; // Export ViewEvents component as default