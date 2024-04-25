import React, { useState, useEffect }from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./CreateEvent.css"


const CreateEvent = ({ events, setEvents }) => {
    const {user, isAuthenticated} = useAuth0();
    const [formData, setFormData] = useState({
        event_type: "",
        date: "",
        user_id: "",
        application_user_id: isAuthenticated ? user.sub : "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isAuthenticated || !user ) {
            console.log("User is not authenticated. Cannot create event.")
            return;
        }

        const newEvent = {
            event_type: formData.event_type,
            date: formData.date,
            user_id: formData.user_id,
            application_user_id: user.sub,
        };

        try {
            const response = await fetch("https://deliver-greeting-cards.herokuapp.com/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok){
                //  Get the created event object from the response
                const createdEvent = await response.json();
                // Update local state witht he new event including its returned itd
                setEvents([...events, createdEvent]);
                // Reset form state after successful event creation
                setFormData({
                    event_type: "",
                    date: "",
                    user_id: "",
                    application_user_id: "",
                });

                // Clear the input fields after successful submission
                const inputFields = document.querySelectorAll('input[type="text"]');
                inputFields.forEach((input) => (input.value = ""));
            } else {
                // Hanlde non-successful API response
                // console.error("Failed to create event: ", response.statusText);
                throw new Error(`Failed to create event: ${response.statusText}`);
            }

        } catch (error) {
            console.error("Error creating event: ", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }
    
    return (
        <div className="postEvent">
            <h2>Create Event Test</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Type: 
                        <input
                            type="text"
                            name="event_type"
                            value={formData.event_type}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>Date: 
                        <input 
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>User ID:
                        <input 
                            type="text"
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {isAuthenticated ? (<button type="submit">Add Event</button>) : 
                ( <p>Pleass sign in to Create Event. </p> )}
            </form>
        </div>
    );

};

export default CreateEvent;