import React, { useState } from "react";

const ExtractSports = (props) => {
    const [datasport, setdatatable] = useState([]);
  const fetchData = () => {
    fetch("http://localhost/dbms/src/backend/fetchincludedsport.php", {
      method: "GET",
      headers: {
        SPORT: "Badminton",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setdatatable(result);
        props.onDataFetched(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  fetchData();

  return datasport;
}


  export default ExtractSports;