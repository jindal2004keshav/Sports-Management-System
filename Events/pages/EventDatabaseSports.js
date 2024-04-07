import React from "react";

const EventDatabaseSports = props => {
    const uniqueSports = Array.from(new Set(props.sport));
    return <option name="select"><button>{props.sport}</button></option>
};


export default EventDatabaseSports;