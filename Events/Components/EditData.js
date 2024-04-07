import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../Shared/Components/Button";
import Modal from "../../Shared/Components/Modal";
import './EditData.css';

const EditData = () => {
  const navigate = useNavigate();
  const playerid = useParams().pid;
  const evtid = useParams().evtid;
  const sportid = useParams().sportid;

  function formatDate(dateString) {
    const parts = dateString.split('-');
    if (parts.length !== 3) return ''; // Invalid date format
    const [year, month, day] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // State variables to hold input values and error messages
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Event handlers to update state variables and error messages
  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(""); // Clear previous error message
  };

  const handleDobChange = (event) => {
    const selectedDate = event.target.value;
    const formattedDate = formatDate(selectedDate);
    setDob(formattedDate);
    setDobError(""); // Clear previous error message
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setGenderError(""); // Clear previous error message
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
    setMobileError(""); // Clear previous error message
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(""); // Clear previous error message
  };

  // Validation function
  const validateInputs = () => {
    let isValid = true;
    if (name.trim() === "") {
      setNameError("Name cannot be empty");
      isValid = false;
    }
    if (dob.trim() === "") {
      setDobError("Date of Birth cannot be empty");
      isValid = false;
    }
    if (gender.trim() === "") {
      setGenderError("Gender cannot be empty");
      isValid = false;
    } else if (!["Male", "Female"].includes(gender.trim())) {
      setGenderError("Gender must be Male or Female");
      isValid = false;
    }
    if (mobile.trim() === "") {
      setMobileError("Mobile cannot be empty");
      isValid = false;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Mobile must be a 10-digit number");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("Email cannot be empty");
      isValid = false;
    } else if (!email.trim().endsWith("@iiitg.ac.in")) {
      setEmailError("Email must end with @iiitg.ac.in");
      isValid = false;
    }
    return isValid;
  };

  // Function to handle form submission
  const handleEditSubmit = () => {
    if (validateInputs()) {
      editdata(playerid, name, dob, gender, mobile, email);
      navigate(`/event/${evtid}`);
    }
  };

  const handleDeleteSubmit = () => {
      deletedata(playerid, sportid, evtid);
      navigate(`/event/${evtid}`);
  };

  const editdata = (playerid, name, dob, gender, mobile, email) => {
    fetch("http://localhost/dbms/src/backend/editeventdata.php", {
      method: "GET",
      headers: {
        PLAYER: playerid,
        NAME: name,
        DOB: dob,
        GENDER: gender,
        MOBILE: mobile,
        EMAIL: email
      },
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };


  const deletedata = (playerid, sports, event) => {
    fetch("http://localhost/dbms/src/backend/deleteeventdata.php", {
      method: "GET",
      headers: {
        PLAYER: playerid,
        SPORT: sports,
        EVENT: event
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // setdatasport(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Function to open the modal
  const openEditHandler = () => {
    if (validateInputs()) {
      setShowEditModal(true);
    }
  };

  // Function to close the modal
  const closeEditHandler = () => {
    setShowEditModal(false);
  };

  const openDeleteHandler = () => {
      setShowDeleteModal(true);
  };

  // Function to close the modal
  const closeDeleteHandler = () => {
    setShowDeleteModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        contentClass="modal-events-list edit-event-model"
        show={showEditModal}
        onCancel={closeEditHandler}
        header={<p>EDIT PLAYER {playerid}</p>}
        footer={<div><Button onClick={handleEditSubmit}>Edit</Button><Button onClick={closeEditHandler}>CANCEL</Button></div>}
      >
        <h2>Are you sure you want to edit details?</h2>
      </Modal>

      <Modal
        contentClass="modal-events-list edit-event-model"
        show={showDeleteModal}
        onCancel={closeDeleteHandler}
        header={<p>DELETE PLAYER {playerid}</p>}
        footer={<div><Button onClick={handleDeleteSubmit}>DELETE</Button><Button onClick={closeDeleteHandler}>CANCEL</Button></div>}
      >
        <h2>Are you sure you want to DELETE player?</h2>
      </Modal>

      <div className="edit-event-data">
        <div className="edit-event-card">
          <a className="edit-event-heading">Edit {playerid}</a>
          <div className="inputBox">
            <input
              type="text"
              required
              value={name}
              onChange={handleNameChange}
            />
            <span className="user">Name</span>
            {nameError && <p className="edit-event-error">{nameError}</p>}
          </div>

          <div className="inputBox">
            <input
              type="text"
              required
              value={dob}
              onChange={handleDobChange}
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
            />
            <span>DOB</span>
            {dobError && <p className="edit-event-error">{dobError}</p>}
          </div>

          <div className="inputBox">
            <input
              type="text"
              required
              value={gender}
              onChange={handleGenderChange}
            />
            <span>Gender</span>
            {genderError && <p className="edit-event-error">{genderError}</p>}
          </div>

          <div className="inputBox">
            <input
              type="tel"
              required
              value={mobile}
              onChange={handleMobileChange}
            />
            <span>Mobile</span>
            {mobileError && <p className="edit-event-error">{mobileError}</p>}
          </div>

          <div className="inputBox">
            <input
              type="text"
              required
              value={email}
              onChange={handleEmailChange}
            />
            <span>E-Mail</span>
            {emailError && <p className="edit-event-error">{emailError}</p>}
          </div>

          <div className="edit-event-buttons">
            <button className="enter"  onClick={openEditHandler}>EDIT PLAYER</button>
            <button className="enter"  onClick={openDeleteHandler}>DELETE PLAYER</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditData;
