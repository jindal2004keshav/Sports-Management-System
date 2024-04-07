import React from "react";
import { Link } from "react-router-dom"; 

import './IITSpirit.css';

const IITSpirit = (props) => {

    function formatDate(inputDate) {
        // Split the input date string into year, month, and day
        const [year, month, day] = inputDate.split('-');
      
        // Create a Date object using the input date
        const dateObj = new Date(year, month - 1, day);
      
        // Get the month name from the Date object
        const monthName = dateObj.toLocaleString('en-US', { month: 'long' });
      
        // Concatenate the month name and year
        const formattedDate = `${monthName} ${year}`;
      
        return formattedDate;
      }

    return <li className="home-event-item">
        <Link to={`/event/${props.eventid}`}>
        <div className="home-event-item-info">
                    <div>
                    <h2>{props.eventname}</h2>
                    <h4>{props.category}</h4>
                    </div>
                    <p>{formatDate(props.date)}</p>
                </div>
    </Link>
</li>
};

export default IITSpirit;