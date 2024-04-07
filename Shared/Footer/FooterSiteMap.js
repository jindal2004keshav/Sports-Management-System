import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth-context"; 
import { FaInstagram } from "react-icons/fa";
import "./FooterSiteMap.css";

const FooterSiteMap = () => {
  const auth = useContext(AuthContext);
  if(auth.isLoggedIn){
    return (
      <div className="footer-site-map">
        <div className="footer-social-media footer-map-col">
          <h5>Social Media</h5>
          <Link to="https://www.instagram.com/iiit_guwahati_sports/">
            <FaInstagram />
          </Link>
        </div>
        <div className="footer-sports footer-map-col">
          <Link to="/sports/list">
            <h5>Sports</h5>
          </Link>
          <Link to="/sport/Badminton">
          <p>Badminton</p>
          </Link>
          <Link to="/sport/Cricket">
          <p>Cricket</p>
          </Link>
          <Link to="/sport/Chess">
          <p>Chess</p>
          </Link>
          <Link to="/sport/Volleyball">
          <p>volleyball</p>
          </Link>
          <Link to="/sport/Carrom">
          <p>Carrom</p>
          </Link>
          <Link to="/sport/Ath">
          <p>Athletics</p>
          </Link>
        </div>
        <div className="footer-events footer-map-col">
          <Link to="/event/list">
            <h5>Events</h5>
          </Link>
          <Link to="/event/list">
          <p>IIITG Carnivals</p>
          </Link>
          <Link to="/event/list">
          <p>IIT Spirit</p>
          </Link>
          <Link to="/event/list">
          <p>Inter IIIT</p>
          </Link>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="footer-site-map">
        <div className="footer-social-media footer-map-col">
          <h5>Social Media</h5>
          <Link to="https://www.instagram.com/iiit_guwahati_sports/">
            <FaInstagram />
          </Link>
        </div>
        <div className="footer-sports footer-map-col">
          <Link to="/auth">
            <h5>Sports</h5>
          </Link>
          <Link to="/auth">
          <p>Badminton</p>
          </Link>
          <Link to="/auth">
          <p>Cricket</p>
          </Link>
          <Link to="/auth">
          <p>Chess</p>
          </Link>
          <Link to="/auth">
          <p>volleyball</p>
          </Link>
          <Link to="/auth">
          <p>Carrom</p>
          </Link>
          <Link to="/auth">
          <p>Athletics</p>
          </Link>
        </div>
        <div className="footer-events footer-map-col">
          <Link to="/auth">
            <h5>Events</h5>
          </Link>
          <Link to="/auth">
          <p>IIITG Carnivals</p>
          </Link>
          <Link to="/auth">
          <p>IIT Spirit</p>
          </Link>
          <Link to="/auth">
          <p>Inter IIIT</p>
          </Link>
        </div>
      </div>
    );
  }
  
};

export default FooterSiteMap;
