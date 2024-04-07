import React from "react";
import { Link } from "react-router-dom"; 

import './InterIIIT.css';

const InterIIIT = (props) => {
    return <li className="home-event-item">
        <Link to={`/event/${props.eventid}`}>
    <div>
        <h2>{props.eventname}</h2>
        <h4>{props.category}</h4>
    </div>
    </Link>
</li>;
};

export default InterIIIT;