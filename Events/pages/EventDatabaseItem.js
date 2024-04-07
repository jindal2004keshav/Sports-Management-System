import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { IsOperator } from "../../Shared/context/auth-context";

import './EventDatabaseItem.css';

const EventDatabaseItem = props => {
    const opr = useContext(IsOperator);
    return <tr>
        {opr.isOperator && (<Link to={`/event/${props.eventid}/edit/${props.rollno}/${props.sportid}`}>
        <td><button className="edit-button-data">edit</button></td>
        </Link>)}
        <td> {props.sport} </td>
        <td> {props.rollno} </td>
        <td> {props.name} </td>
        <td> {props.dob} </td>
        <td> {props.gender} </td>
        <td> {props.mobile} </td>
        <td> {props.email} </td>
    </tr>;
};

export default EventDatabaseItem;