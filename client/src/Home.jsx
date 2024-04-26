import React, { useState, useEffect } from "react";
import Postcard from "./components/Postcard";

const Home = () => {
  const [postcards, updatePostcards] = useState();

  useEffect(() => {
    //fetch to GET req
    const fetchData = async () => {
      try {
        const cards = await fetch(
          "https://deliver-greeting-cards.herokuapp.com/api/postcards",
        );
        const data = await cards.json(); // converts to json
        updatePostcards(data.data); // Log data inside the async function
        console.log(data.data);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the fetchData function
  }, []);

  return (
    <div className="home">
      {postcards
        ? postcards.map((data) => {
            return <Postcard data={data} key={data.id} />;
          })
        : ""}

      <Postcard />
    </div>
  );
};

export default Home;

/* fixed how to fetch the data @ Home.js ... 
i was so confused at first because but turns out i just need 
to check for nulls / undefined. 
 */
