import React, {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../Shared/Components/Modal";
import Button from "../../Shared/Components/Button";
import { Navigate } from "react-router-dom";
import { IsOperator } from "../../Shared/context/auth-context";

import "./LiveEventsList.css";

const LiveEventsList = (props) => {
  const opr = useContext(IsOperator);
    const navigate = useNavigate();

    const [showRegisterModal, setShowRegisterModal] = useState(false);


    const handleRegisterSubmit = () => {
          removelive(
            props.evtid
          );
          navigate(`/`);
      };

      const removelive = (
        tournamentId
      ) => {
        fetch("http://localhost/dbms/src/backend/eventlistmanager.php", {
          method: "GET",
          headers: {
            TOURID: tournamentId,
            "X-REQUESTED-FROM": "RemoveLive",
          },
        })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };
    


    const openRegisterHandler = () => {
          setShowRegisterModal(true);
      };
    
      const closeRegisterHandler = () => {
        setShowRegisterModal(false);
      };

  return (
    <React.Fragment>

<Modal
        contentClass="modal-events-list edit-event-model"
        show={showRegisterModal}
        onCancel={closeRegisterHandler}
        header={<p>Remove Live</p>}
        footer={
          <div>
            <Button onClick={handleRegisterSubmit}>REMOVE</Button>
            <Button onClick={closeRegisterHandler}>CANCEL</Button>
          </div>
        }
      >
        <h2>Are you sure you want to Remove as Live Event?</h2>
      </Modal>

    <div className="live-events-list-container">
      <h1>{props.evtname}</h1>
      <div className="buttons-container">
      {opr.isOperator && (<button className="live-button-data" onClick={openRegisterHandler}>Remove Live</button>)}
      
      <Link to={`/register/${props.evtid}`}>
      <button className="live-button-data">Register</button>
      </Link>
      </div>
    </div>
    </React.Fragment>
  );
};

export default LiveEventsList;
