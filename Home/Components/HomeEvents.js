import React, { useState, useEffect } from "react";

import "./HomeEvents.css";
import HomeEventsList from "./HomeEventsList";

const HomeEvents = () => {


  const [event, setEvent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/dbms/src/backend/eventlist.php', {
          method: "GET",
          headers: {
            "X-Requested-From": "HomeEvents"
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setEvent(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="home-events">
      <div className="overlay-image"></div>
      <h3>Events</h3>
      <HomeEventsList items={event} />
    </div>
  );
};

export default HomeEvents;
