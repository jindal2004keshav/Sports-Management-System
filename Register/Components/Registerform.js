import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../Shared/Components/Button";
import Modal from "../../Shared/Components/Modal";

import IncludedSportsList from "./IncludedSportsList";
import "./Registerform.css";

const Registerform = (props) => {
  const navigate = useNavigate();
  const evtid = useParams().evtid;
  //   console.log(evtid);

  function formatDate(dateString) {
    const parts = dateString.split("-");
    if (parts.length !== 3) return ""; // Invalid date format
    const [year, month, day] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  function concatenateNameAndTeam(name, teamName) {
    if (teamName === "") {
        return name;
      } else {
        return `${name} (${teamName})`;
      }
  }

  const [selectedsport, setselectedsport] = useState("");
  const [selectedsporterror, setselectedsporterror] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [teamname, setTeamName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumberError, setRollNumberError] = useState("");
  const [nameError, setNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Event handlers to update state variables and error messages
  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(""); // Clear previous error message
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
    // setName(concatenateNameAndTeam(name, teamname));
    // setNameError(""); 
  };

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
    setRollNumberError(""); // Clear previous error message
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

  const handleSportsSelected = (event) => {
    setselectedsport(event.target.value);
    setselectedsporterror("");
  };
  

  const validateInputs = () => {
    let isValid = true;
    if (selectedsport.trim() === "") {
      setselectedsporterror("Sport Cannot be Empty");
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

  const handleRegisterSubmit = () => {
    if (validateInputs()) {
        const fullname = concatenateNameAndTeam(name, teamname);
      adddata(
        selectedsport,
        evtid,
        rollNumber,
        fullname,
        dob,
        gender,
        mobile,
        email
      );
      navigate(`/`);
    }
  };

  const adddata = (
    sportsId,
    tournamentId,
    rollNumber,
    name,
    dob,
    gender,
    mobile,
    email
  ) => {
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
        EMAIL: email,
      },
    })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setdatasport(result);
    //     console.log(result);
    //   })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const [sportslist, setsportslist] = useState([]);
  const fetchsport = (evtid) => {
    fetch("http://localhost/dbms/src/backend/fetchincludedsport.php", {
      method: "GET",
      headers: {
        EVENT: evtid,
        "X-REQUESTED-FROM": "Register",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setsportslist(result);
        // console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchsport(evtid);
  }, [evtid]);

  const openRegisterHandler = () => {
    if (validateInputs()) {
      setShowRegisterModal(true);
    }
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
        header={<p>Register Yourself</p>}
        footer={
          <div>
            <Button onClick={handleRegisterSubmit}>Register</Button>
            <Button onClick={closeRegisterHandler}>CANCEL</Button>
          </div>
        }
      >
        <h2>Are you sure you want to Register for {selectedsport}?</h2>
      </Modal>

      <div className="edit-event-data">
        <div className="edit-event-card">
          <a className="edit-event-heading">Register</a>

          <div className="inputBox">
            <select
              required
              className="register-select-sport"
              value={selectedsport}
              onChange={handleSportsSelected}
            >
              <option></option>
              {sportslist.map((sports) => (
                <IncludedSportsList key={sports.sid} sports={sports.sid} />
              ))}
            </select>
            <span className="user">Sports</span>
            {selectedsporterror && (
              <p className="edit-event-error">{selectedsporterror}</p>
            )}
          </div>

          <div className="inputBox">
            <input
              type="number"
              required
              value={rollNumber}
              onChange={handleRollNumberChange}
            />
            <span className="user">Roll Number</span>
            {rollNumberError && (
              <p className="edit-event-error">{rollNumberError}</p>
            )}
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
              value={teamname}
              onChange={handleTeamNameChange}
              placeholder="For Team Sports Only"
            />
            <span className="user">Team Name</span>
            {/* {nameError && <p className="edit-event-error">{nameError}</p>} */}
          </div>

          <div className="inputBox">
            <input
              type="text"
              required
              value={dob}
              onChange={handleDobChange}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
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
            <button className="enter" onClick={openRegisterHandler}>
              Register
            </button>
            {/* <button className="enter" >DELETE PLAYER</button> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Registerform;
