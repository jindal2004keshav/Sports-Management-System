import React , { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import DataEventList from "../Components/DataEventList";
import SportDatabaseItem from '../Components/SportDatabaseItem';
import { IsOperator } from "../../Shared/context/auth-context";

const SportDatabase = props => {
    const opr = useContext(IsOperator);
    const sportid = useParams().sportid;
    let sportheading = '';

    if (sportid === 'Ath') {
        sportheading = "Athletics";
    } else {
        sportheading = sportid; // If sportid is not 'Ath', just use its value
    }


    const [rollSearchValue, setRollSearchValue] = useState("");
  const handleRollChange = (event) => {
    setRollSearchValue(event.target.value);
  };
  console.log(rollSearchValue);
  const [nameSearchValue, setnameSearchValue] = useState("");
  const handlenameChange = (event) => {
    setnameSearchValue(event.target.value);
  };
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };
console.log(selectedEvent);
  const [sortSearchValue, setsortSearchValue] = useState("");
  const handlesortChange = (event) => {
    setsortSearchValue(event.target.value);
  };
    


    const [datatable, setdatatable] = useState([]);
  const fetchData = (
    selectedEvent,
    sportid,
    rollSearchValue,
    nameSearchValue,
    sortSearchValue
  ) => {
    fetch("http://localhost/dbms/src/backend/sportsdatabase.php", {
      method: "GET",
      headers: {
        EVTID: selectedEvent,
        SPORT: sportid,
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
    fetchData(selectedEvent, sportid, rollSearchValue, nameSearchValue, sortSearchValue);
  }, [selectedEvent, sportid, rollSearchValue, nameSearchValue, sortSearchValue]);



    const [dataevent, setdataevent] = useState([]);
  const fetchsport = (sportid) => {
    fetch("http://localhost/dbms/src/backend/fetchincludedsport.php", {
      method: "GET",
      headers: {
        SPORT: sportid,
        "X-REQUESTED-FROM": "Sports"
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setdataevent(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchsport(sportid);
  }, [sportid]);

  const uniqueSportsSet = new Set(datatable.map((data) => data.sname));
  const uniqueSportsArray = Array.from(uniqueSportsSet);


    return (
        <div>
          <div className="eventdatabase-container">
            <main className="eventdatabase-table">
              <section className="eventdatabase-table-header">
                <h1>{sportheading} DATA</h1>
                <select
                  className="eventdata-sortselect"
                  onChange={handlesortChange}
                >
                  <option selected value="">
                    Sort By...
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
                          value={selectedEvent}
                          onChange={handleEventChange}
                        >
                          <option selected>Events</option>
                          {dataevent.map((event) => (
                            <DataEventList
                              key={event.tid}
                              event={event.tname}
                            />
                          ))}
                        </select>
                      </th>
                      <th> Roll No </th>
                      <th> Player Name </th>
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
                    <tr>
                    {opr.isOperator && (<th colspan="3">
                    <Link to={`/event/add/player`}>
                      <button className="add-player-event">Add Player</button>
                    </Link>
                  </th>)}
                  {opr.isOperator && (<th colSpan="5"></th>)}
                  
                </tr>
                  </thead>
                  <tbody>
                    {datatable.map(data => {
    // console.log("Data being iterated:", data); 
    return (
        <SportDatabaseItem 
            key={data.tid} 
            event={data.tname} 
            rollno={data.pid} 
            name={data.pname} 
            dob={data.DOB} 
            gender={data.gender} 
            mobile={data.mobile_no} 
            email={data.email} 
            eventid={data.tid}
            sportid = {data.sid}
        />
    );
})}
                  </tbody>
                </table>
              </section>
            </main>
          </div>
        </div>
      );
};


export default SportDatabase;