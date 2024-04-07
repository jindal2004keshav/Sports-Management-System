import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import EventDatabaseItem from "./EventDatabaseItem";
import EventDatabaseSports from "./EventDatabaseSports";
import { IsOperator } from "../../Shared/context/auth-context";
import "./EventDatabase.css";

const EventDatabse = (props) => {
  const opr = useContext(IsOperator);
  const evtid = useParams().evtid;
  const match = evtid.match(/^([A-Za-z]+)(\d+)([A-Za-z])$/);
  const match2 = evtid.match(/^([A-Za-z]+)(\d+)$/);
  const resultArray = [];

  if (match) {
    const [, letters, numbers, character] = match;
    resultArray.push(letters, numbers, character);
  } else if (match2) {
    const [, letters, numbers] = match2;
    resultArray.push(letters, numbers);
  }
  if (resultArray[0] === "IISM") {
    resultArray[0] = "Inter IIIT Sports Meet";
  } else if (resultArray[0] === "IGSM") {
    resultArray[0] = "IIT Guwahati Sports Meet";
  } else if (resultArray[0] === "IGSC") {
    resultArray[0] = "IIIT Guwahati Sports Carnival";
  }

  // console.log(resultArray);

  const [rollSearchValue, setRollSearchValue] = useState("");
  const handleRollChange = (event) => {
    setRollSearchValue(event.target.value);
  };
  const [nameSearchValue, setnameSearchValue] = useState("");
  const handlenameChange = (event) => {
    setnameSearchValue(event.target.value);
  };

  const [sortSearchValue, setsortSearchValue] = useState("");
  const handlesortChange = (event) => {
    setsortSearchValue(event.target.value);
  };
  // console.log(sortSearchValue);

  const [selectedSport, setSelectedSport] = useState("");

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const [datatable, setdatatable] = useState([]);
  const fetchData = (
    selectedSport,
    evtid,
    rollSearchValue,
    nameSearchValue,
    sortSearchValue
  ) => {
    fetch("http://localhost/dbms/src/backend/eventdatabase.php", {
      method: "GET",
      headers: {
        SPORT: selectedSport,
        EVTID: evtid,
        ROLL: rollSearchValue,
        NAME: nameSearchValue,
        SORT: sortSearchValue,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setdatatable(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData(
      selectedSport,
      evtid,
      rollSearchValue,
      nameSearchValue,
      sortSearchValue
    );
  }, [selectedSport, evtid, rollSearchValue, nameSearchValue, sortSearchValue]);

  const [datasport, setdatasport] = useState([]);
  const fetchsport = (evtid) => {
    fetch("http://localhost/dbms/src/backend/fetchincludedsport.php", {
      method: "GET",
      headers: {
        EVENT: evtid,
        "X-REQUESTED-FROM": "Events",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setdatasport(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchsport(evtid);
  }, [evtid]);

  const uniqueSportsSet = new Set(datatable.map((data) => data.sname));
  const uniqueSportsArray = Array.from(uniqueSportsSet);

  return (
    <div>
      <div className="eventdatabase-container">
        <main className="eventdatabase-table">
          <section className="eventdatabase-table-header">
            <h1>{resultArray.join(" ")} DATA</h1>
            <select
              className="eventdata-sortselect"
              onChange={handlesortChange}
            >
              <option selected value="">
                Sort By...
              </option>
              <option value="ORDER BY sports.sname ASC">
                Sort by Sports Asc
              </option>
              <option value="ORDER BY sports.sname DESC">
                Sort by Sports Desc
              </option>
              <option value="ORDER BY participated.pid ASC">
                Sort By Roll Asc
              </option>
              <option value="ORDER BY participated.pid DESC">
                Sort By Roll Desc
              </option>
              <option value="ORDER BY player.pname ASC">
                Sort By Player Asc
              </option>
              <option value="ORDER BY player.pname DESC">
                Sort By Player Desc
              </option>
            </select>
          </section>
          <section className="eventdatabase-table-body">
            <table>
              <thead>
                <tr>
                {opr.isOperator && (<th></th>)}
                  
                  <th>
                    <select
                      className="eventdata-sportselect"
                      value={selectedSport}
                      onChange={handleSportChange}
                    >
                      <option selected>Sports</option>
                      {datasport.map((sport) => (
                        <EventDatabaseSports
                          key={sport.sname}
                          sport={sport.sname}
                        />
                      ))}
                    </select>
                  </th>
                  <th> Roll No </th>
                  <th>Name</th>
                  <th> Date of Birth </th>
                  <th> Gender </th>
                  <th> Mobile </th>
                  <th> E-Mail </th>
                </tr>
                <tr className="eventdata-searchrow">
                  
                {opr.isOperator && (<th></th>)}
                  <th></th>
                  
                  <th>
                    <div className="eventdata-nameColumn">
                      <input
                        className="eventdata-searchByName"
                        type="text"
                        autocomplete="off"
                        name="eventNameSearch"
                        class="input"
                        placeholder="Search By Roll..."
                        value={rollSearchValue}
                        onChange={handleRollChange}
                      ></input>
                    </div>
                  </th>
                  <th>
                    <div className="eventdata-nameColumn">
                      <input
                        className="eventdata-searchByName"
                        type="text"
                        autocomplete="off"
                        name="eventNameSearch"
                        class="input"
                        placeholder="Search By Name..."
                        value={nameSearchValue}
                        onChange={handlenameChange}
                      ></input>
                    </div>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                {opr.isOperator && (<tr>
                  <th colspan="3">
                    <Link to={`/event/add/player`}>
                      <button className="add-player-event">Add Player</button>
                    </Link>
                  </th>
                  <th colSpan="5"></th>
                </tr>)}
                
              </thead>
              <tbody>
                {datatable.map((data) => (
                  <EventDatabaseItem
                    key={data.pid}
                    sport={data.sname}
                    rollno={data.pid}
                    name={data.pname}
                    dob={data.DOB}
                    gender={data.gender}
                    mobile={data.mobile_no}
                    email={data.email}
                    eventid={evtid}
                    sportid={data.sid}
                  />
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default EventDatabse;
