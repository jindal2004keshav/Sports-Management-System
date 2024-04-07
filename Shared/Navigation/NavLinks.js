import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context"; 
import { IsOperator } from "../context/auth-context";
import "./NavLinks.css";

const NavLinks = () => {
  const opr = useContext(IsOperator);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const logouthandler = () => {
    auth.logout()
    opr.notOperator()
    navigate("/")
  }
  return (
    <ul className="nav-links">
      {auth.isLoggedIn && (<li>
        <NavLink to="/event/list">EVENTS</NavLink>
      </li>)}
      {auth.isLoggedIn && (
        <li>
        <NavLink to="/register">REGISTER</NavLink>
      </li>
      )}
      {auth.isLoggedIn && (
        <li>
        <NavLink to="/sports/list">SPORTS</NavLink>
      </li>
      )}
      {!auth.isLoggedIn && (
        <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
      )}
      {auth.isLoggedIn && (
        <li>
        <button onClick={logouthandler}>LOGOUT</button>
        </li>
      )}

    </ul>
  );
};

export default NavLinks;
