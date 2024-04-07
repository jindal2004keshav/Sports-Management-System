import React from "react";

import NewsItems from "./NewsItems";
import "./NewsList.css";

const NewsList = (props) => {
  if (props.items.length === 0) {
    return <div className="No-news-event-home">No Events Found</div>;
  }
  return (
    <ul className="news-list">
      {props.items.map((newz) => (
        <NewsItems
          key={newz.newsid}
          newsTitle={newz.newsTitle}
          newsinfo={newz.newsinfo}
        />
      ))}
    </ul>
  );
};

export default NewsList;
