import React, {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../Shared/Components/Button";
import Modal from "../../Shared/Components/Modal";

import './AddPlayer.css';

const AddPlayer = () => {
    const navigate = useNavigate();
  const evtid = useParams().evtid;

  function formatDate(dateString) {
    const parts = dateString.split('-');
    if (parts.length !== 3) return ''; // Invalid date format
    const [year, month, day] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // State variables to hold input values and error messages
  const [sportsId, setSportsId] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [sportsIdError, setSportsIdError] = useState("");
  const [tournamentIdError, setTournamentIdError] = useState("");
  const [rollNumberError, setRollNumberError] = useState("");
  const [nameError, setNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Event handlers to update state variables and error messages
  const handleSportsIdChange = (event) => {
    setSportsId(event.target.value);
    setSportsIdError(""); // Clear previous error message
  };

  const handleTournamentIdChange = (event) => {
    setTournamentId(event.target.value);
    setTournamentIdError(""); // Clear previous error message
  };

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
    setRollNumberError(""); // Clear previous error message
  };

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
    if (sportsId.trim() === "") {
      setSportsIdError("Sports Id cannot be empty");
      isValid = false;
    }
    if (tournamentId.trim() === "") {
      setTournamentIdError("Tournament Id cannot be empty");
      isValid = false;
    }
    if (rollNumber.trim() === "") {
      setRollNumberError("Roll Number cannot be empty");
      isValid = false;
    }
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
  const handleAddSubmit = () => {
    if (validateInputs()) {
      adddata(sportsId, tournamentId, rollNumber, name, dob, gender, mobile, email);
    //   console.log(sportsId);
    //   console.log(rollNumber);
    //   console.log(name);
    //   console.log(dob);
    //   console.log(gender);
    //   console.log(mobile);
    //   console.log(email);
      navigate(`/`);
    }
  };


  const adddata = (sportsId, tournamentId, rollNumber, name, dob, gender, mobile, email) => {
    fetch("http://localhost/dbms/src/backend/addeventplayer.php", {
      method: "GET",
      headers: {
        SPORTSID: sportsId,
        TOURID: tournamentId,
        ROLLNO: rollNumber,
        NAME: name,
        DOB: dob,
        GENDER: gender,
        MOBILE: mobile,
        EMAIL: email
      },
    }).then((res) => res.json())
    .then((result) => {
      // setdatasport(result);
      console.log(result);
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };


  // Function to open the modal
  const openAddHandler = () => {
    if (validateInputs()) {
      setShowAddModal(true);
    }
  };

  // Function to close the modal
  const closeAddHandler = () => {
    setShowAddModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        contentClass="modal-events-list edit-event-model"
        show={showAddModal}
        onCancel={closeAddHandler}
        header={<p>Add Player</p>}
        footer={<div><Button onClick={handleAddSubmit}>ADD</Button><Button onClick={closeAddHandler}>CANCEL</Button></div>}
      >
        <h2>Are you sure you want to Add Player?</h2>
      </Modal>

      <div className="edit-event-data">
        <div className="edit-event-card">
          <a className="edit-event-heading">Add Player</a>

          <div className="inputBox">
            <input
              type="text"
              required
              value={sportsId}
              onChange={handleSportsIdChange}
            />
            <span className="user">Sports Id</span>
            {sportsIdError && <p className="edit-event-error">{sportsIdError}</p>}
          </div>

          <div className="inputBox">
            <input
              type="text"
              required
              value={tournamentId}
              onChange={handleTournamentIdChange}
            />
            <span className="user">Tournament Id</span>
            {tournamentIdError && <p className="edit-event-error">{tournamentIdError}</p>}
          </div>

          <div className="inputBox">
            <input
              type="number"
              required
              value={rollNumber}
              onChange={handleRollNumberChange}
            />
            <span className="user">Roll Number</span>
            {rollNumberError && <p className="edit-event-error">{rollNumberError}</p>}
          </div>
          
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
            <button className="enter"  onClick={openAddHandler}>ADD PLAYER</button>
            {/* <button className="enter"  onClick={openDeleteHandler}>DELETE PLAYER</button> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddPlayer;
