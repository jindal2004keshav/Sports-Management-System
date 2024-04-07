import React from "react";

import "./NewsItems.css";

const NewsItems = (props) => {
  return (
    <li className="news-item">
      <div>
        <h2>{props.newsTitle}</h2>
        <h4>{props.newsinfo}</h4>
      </div>
    </li>
  );
};

export default NewsItems;
