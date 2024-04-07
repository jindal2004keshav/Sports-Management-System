import React, {useState, useEffect} from "react";

// import { useEffect } from "react";

import LiveEventsList from "../Components/LiveEventsList";
// import { IsOperator } from "../../Shared/context/auth-context";
import "./Register.css";
import { json } from "react-router-dom";

const Register = () => {
  // const opr = useContext(IsOperator);
  
  const [event, setEvent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/dbms/src/backend/eventlist.php', {
          method: "GET",
          headers: {
            "X-Requested-From": "Register"
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

  return <div className="liveeventdatabase-container-parent">
    <div className="liveeventdatabase-container">
  <div className="register-container">
    <h1 className="register-event-heading">Live Events List</h1>
    {event.map((event) => {
        return(
            <LiveEventsList
            key={event.tid}
            evtid={event.tid}
            evtname = {event.tname}
            date = {event.date}
            place = {event.place}/>
        );
    })}
  </div>
  </div>
  </div>;
};

export default Register;
