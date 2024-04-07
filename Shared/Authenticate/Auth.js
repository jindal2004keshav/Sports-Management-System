import React, { useState, useContext } from "react";
 
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import { IsOperator } from "../context/auth-context";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const opr = useContext(IsOperator);

  function formatDate(dateString) {
    const parts = dateString.split("-");
    if (parts.length !== 3) return ""; // Invalid date format
    const [year, month, day] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [rollNumberError, setRollNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dobError, setDobError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [datainfo, setdatainfo] = useState([]);
  const [loginerror, setloginerror] = useState("");
  const [istouched, setIstouched] = useState(false);

  const SignUpHandler = () => {
    if (signUp) {
      setSignUp(false);
    } else {
      setSignUp(true);
    }
  };


  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
    setRollNumberError(""); // Clear previous error message
    setloginerror("");
  };

  const handleDobChange = (event) => {
    const selectedDate = event.target.value;
    const formattedDate = formatDate(selectedDate);
    setDob(formattedDate);
    setDobError(""); // Clear previous error message
    setloginerror("");
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setGenderError(""); // Clear previous error message
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
    setMobileError(""); // Clear previous error message
    setloginerror("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(""); // Clear previous error message
    setloginerror("");
    setIstouched(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(""); // Clear previous error message
    setloginerror("");
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
    setloginerror("");
  };

  const checkHandler = (email) => {
    checkdata(email);
  };

  const checkdata = (email) => {
    fetch("http://localhost/dbms/src/backend/checklogin.php", {
      method: "GET",
      headers: {
        EMAIL: email,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setdatainfo(result);
        console.log(result);
        console.log(datainfo);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const adduser = (name, roll, email, password, mobile, gender, dob) => {
    fetch("http://localhost/dbms/src/backend/addlogin.php", {
      method: "GET",
      headers: {
        EMAIL: email,
        NAME: name,
        ROLL: roll,
        PASS: password,
        MOBILE: mobile,
        GENDER: gender,
        DOB: dob,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setdatainfo(result);
        // console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (datainfo.length > 0) {
      const user = datainfo[0];
      if (istouched && user.email === "") {
        setloginerror("The email entered does not exist");
      } else if (user.password !== password) {
        setloginerror("The Password Do not match");
      } else {
        auth.login();
        if (user.operator === "yes") {
          opr.operator();
        }
        navigate("/");
      }
    } else if (istouched) {
      setloginerror("No data found for the email entered");
    }
  }, [datainfo]);// This effect depends on the datainfo state

  const authSubmitHandler = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    console.log(event.target.innerText);
    console.log(email);
    if (validateInputs()) {
      if (event.target.innerText === "LOGIN") {
        checkHandler(email); // No need for await here
      } else {
        adduser(name, rollNumber, email, password, mobile, gender, dob);
        auth.login();
        navigate("/");
      }
    }
  };
  
  

  const validateInputs = () => {
    let isValid = true;
    if (signUp) {
      if (name.trim() === "") {
        setNameError("Name cannot be empty");
        isValid = false;
      }
      if (rollNumber.trim() === "") {
        setRollNumberError("Roll Number cannot be empty");
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
      } else if (!/^\d{10}$/.test(mobile)) {
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
      if (password.trim() === "") {
        setPasswordError("Password cannot be empty");
        isValid = false;
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
        isValid = false;
      }
    } else {
      if (email.trim() === "") {
        setEmailError("Email cannot be empty");
        isValid = false;
      } else if (!email.trim().endsWith("@iiitg.ac.in")) {
        setEmailError("Email must end with @iiitg.ac.in");
        isValid = false;
      }
      if (password.trim() === "") {
        setPasswordError("Password cannot be empty");
        isValid = false;
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
        isValid = false;
      }
    }
    return isValid;
  };

  return (
    <React.Fragment>
      <div className="edit-event-data">
        <div className="edit-event-card">
          <a className="edit-event-heading">
            {signUp ? "Signup" : "Login"}
            {loginerror && <p className="edit-event-error">{loginerror}</p>}
          </a>

          {signUp && (
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
          )}

          {signUp && (
            <div className="inputBox">
              <input
                type="number"
                required
                value={rollNumber}
                onChange={handleRollNumberChange}
              />
              <span className="user">Roll No</span>
              {rollNumberError && (
                <p className="edit-event-error">{rollNumberError}</p>
              )}
            </div>
          )}

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

          <div className="inputBox">
            <input
              type="password"
              required
              value={password}
              onChange={passwordChange}
            />
            <span className="user">Password</span>
            {passwordError && (
              <p className="edit-event-error">{passwordError}</p>
            )}
          </div>

          {signUp && (
            <div className="inputBox">
              <input
                type="number"
                required
                value={mobile}
                onChange={handleMobileChange}
              />
              <span className="user">Mobile</span>
              {mobileError && <p className="edit-event-error">{mobileError}</p>}
            </div>
          )}

          {signUp && (
            <div className="inputBox">
              <input
                type="text"
                required
                value={gender}
                onChange={handleGenderChange}
              />
              <span className="user">Gender</span>
              {genderError && <p className="edit-event-error">{genderError}</p>}
            </div>
          )}

          {signUp && (
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
          )}

          <div className="edit-event-buttons">
            <button className="enter" onClick={authSubmitHandler}>
              {signUp ? "Signup" : "Login"}
            </button>
            <button className="enter" onClick={SignUpHandler}>
              Switch
            </button>
            {/* <button className="enter" >DELETE PLAYER</button> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
