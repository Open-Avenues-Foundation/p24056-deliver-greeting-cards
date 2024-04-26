import React, { useState, useEffect } from 'react';
import "./Postcard.css";

const Postcard = ({ data }) => {
    if (!data || !data.id) {
        return null; 
    }

    //hindi ko alam anong ginawa ni chatgpt but it worked
    //console.log(data);
    return (
        <div className="postcardBox">
            <div className="items">
                <div><h1>data id: {data.id}</h1></div>
                <div><img src={data.thumbnails[0].small} alt="Thumbnail"></img></div>
                <div><h1>Send To: {data.to.name}</h1></div>
                <div><h1>Where To: {data.to.description}</h1></div>
                <div><h1>From: lmao idk if this prints</h1></div> 
                <div><h1>Date Created: {data.date_created}</h1></div>
                <div><h1>Tracking Status: {data.tracking_events[data.tracking_events.length - 1]?.name}</h1></div>
            </div>
        </div>
    );
}


export default Postcard;

/* PLANS 
- probably separate the title and stick it to the postcardBox itself, rather than on each data...
- from might be : data.from.name 
*/

/* SUMMARY
- this is a really rough draft...
- i had a real hard time debugging... i had trouble connecting stuff from the psotcard api thingy
- i'm just trusting the process really... 
- basically i spent most of my time fetching data from db and then analyzed db schema... ---> made compnent that parses object and displays the data kekeke

*/

