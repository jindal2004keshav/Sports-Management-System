import React, { useState } from "react";

import IITSpirit from "../Components/IITSpirit";
import Carnivals from "../Components/Carnivals";
import InterIIIT from "../Components/InterIIIT";
import Button from "../../Shared/Components/Button";
import Modal from "../../Shared/Components/Modal";
import "./EventList.css";

const EventList = () => {
  const [event, setEvent] = useState([]);

  const [showiitModal, setShowiitModal] = useState(false);
  const openiitHandler = () => {
    setShowiitModal(true);
    fetchData("iitspirit");
    console.log(event);
  };
  const closeiitHandler = () => setShowiitModal(false);

  const [showiiitcarnivalModal, setShowiiitcarnivalModal] = useState(false);
  const openiiitcarnivalHandler = () => {
    setShowiiitcarnivalModal(true);
    fetchData("iiitcarnival");
  };
  const closeiiitcarnivalHandler = () => setShowiiitcarnivalModal(false);

  const [showinteriiitModal, setShowinteriiitModal] = useState(false);
  const openinteriiitHandler = () => {
    setShowinteriiitModal(true);
    fetchData("interiiit");
  };
  const closeinteriiitHandler = () => setShowinteriiitModal(false);

  const fetchData = (category) => {
    fetch("http://localhost/dbms/src/backend/eventlist.php", {
    method: "GET",
    headers: {
      "X-Requested-From": category
    }
  })
  .then((res) => res.json())
  .then((result) => {
    setEvent(result);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
  };

  return (
    <React.Fragment>
      <Modal
        contentClass="modal-events-list"
        show={showiitModal}
        onCancel={closeiitHandler}
        header="IIT SPIRIT EVENTS"
        // footerClass="place-item__modal-actions"
        footer={<Button onClick={closeiitHandler}>CANCEL</Button>}
      >
        <ul className="model-event-list">
          {event.map((event) => (
            <IITSpirit
              key={event.tid}
              eventid={event.tid}
              eventname={event.tname}
              date={event.date}
              category={event.place}
            />
          ))}
        </ul>
      </Modal>

      <Modal
        contentClass="modal-events-list"
        show={showiiitcarnivalModal}
        onCancel={closeiiitcarnivalHandler}
        header="IIIT CARNIVAL EVENTS"
        footer={<Button onClick={closeiiitcarnivalHandler}>CANCEL</Button>}
      >
        <ul className="model-event-list">
          {event.map((event) => (
            <Carnivals
            key={event.tid}
            eventid={event.tid}
            eventname={event.tname}
            date={event.date}
            category={event.place}
            />
          ))}
        </ul>
      </Modal>

      <Modal
        contentClass="modal-events-list"
        show={showinteriiitModal}
        onCancel={closeinteriiitHandler}
        header="IIT SPIRIT EVENTS"
        footer={<Button onClick={closeinteriiitHandler}>CANCEL</Button>}
      >
        <ul className="model-event-list">
          {event.map((event) => (
            <InterIIIT
            key={event.tid}
            eventid={event.tid}
            eventname={event.tname}
            date={event.date}
            category={event.place}
            />
          ))}
        </ul>
      </Modal>

      <div className="event-list-container">
        <div className="event-list">
          <div className="event-list-item" onClick={openiitHandler}>
            <h2>IIT SPIRIT</h2>
          </div>
          <div className="event-list-item" onClick={openinteriiitHandler}>
            <h2 to="/event/interiiit">INTER IIIT</h2>
          </div>
          <div className="event-list-item" onClick={openiiitcarnivalHandler}>
            <h2 to="/event/carnivals">IIIT GUWAHATI CARNIVALS</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventList;
