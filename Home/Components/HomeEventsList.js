import React, {useContext} from "react";

import HomeEventsItems from "./HomeEventsItems";
import { AuthContext } from "../../Shared/context/auth-context"; 
import "./HomeEventsList.css";

const HomeEventsList = (props) => {
  const auth = useContext(AuthContext);
  if(!auth.isLoggedIn){
    return <div className="No-news-event-home"><h2>Login to view Event List</h2></div>
  }
  if (props.items.length === 0) {
    return <div className="No-news-event-home"><h2>No Events Found</h2></div>;
  }
  else{
    return (
      <ul className="home-event-list">
        {props.items.map((event) => (
          <HomeEventsItems
            key={event.tid}
            id={event.tid}
            eventname={event.tname}
            category={event.place}
            date={event.date}
          />
        ))}
      </ul>
    );
  }
};

export default HomeEventsList;
