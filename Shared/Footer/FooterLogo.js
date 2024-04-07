import React from "react";

import Avatar from '../Components/Avatar';
import './FooterLogo.css';

const FooterLogo = props => {
    return <div className="footer-logo">
        <div className="footer-logo-image">
        <Avatar image={props.image} alt={props.alt}/>
    </div>
    <h2 className="footer-logo-title">IIIT Guwahati Sports</h2>
    <p>Copyright 2024 DBMS Project team IIITG!!
         Hamari choriya chore se kaam hai ke</p>
    </div>;
};

export default FooterLogo;