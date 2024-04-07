import React from "react";
import { Link } from "react-router-dom";

import badminton from "./../../images/sportlist/badminton.jpg";
import badmintonbgremove from "./../../images/sportlist/badmintonbgremove.png";
import badmintontext from "./../../images/sportlist/badmintontext.jpg";
import crickettext from "./../../images/sportlist/crickettext.png";
import chesstext from "./../../images/sportlist/chesstext.jpg";
import footballtext from "./../../images/sportlist/footballtext.jpg";
import volleyballtext from "./../../images/sportlist/volleyballtext.jpg";
import carromtext from "./../../images/sportlist/carromtext.jpg";
import tabletennistext from "./../../images/sportlist/tabletennistext.jpg";
import athleticstext from "./../../images/sportlist/athleticstext.jpg";
import cricket from './../../images/sportlist/cricket.jpg';
import cricketbgremove from './../../images/sportlist/cricketbgremove.png';
import chess from './../../images/sportlist/chess.jpg';
import chessremovebg from './../../images/sportlist/chessremovebg.png';
import football from './../../images/sportlist/football.jpg';
import footballremovebg from './../../images/sportlist/footballremovebg.png';
import volleyball from './../../images/sportlist/volleyball.jpg';
import volleyballremovebg from './../../images/sportlist/volleyballremovebg.png';
import carrom from './../../images/sportlist/carrom.jpg';
import carromremovebg from './../../images/sportlist/carromremovebg.png';
import tabletennis from './../../images/sportlist/tabletennis.jpg';
import tabletennisremovebg from './../../images/sportlist/tabeltennisremovebg.png';
import athletics from './../../images/sportlist/athletics.jpg';
import athleticsremovebg from './../../images/sportlist/athleticsremovebg.png';
import "./MainSportList.css";

const MainSportList = () => {
  return (
    <div class="container-sport-list">
      <Link to="/sport/Badminton">
        <div className="scard">
          <div className="wrapper">
            <img src={badminton} className="cover-image" alt="" />
          </div>
          <img src={badmintontext} className="title" alt="" />
          <img src={badmintonbgremove} className="character" alt="" />
        </div>
      </Link>

      <Link to="/sport/Cricket">
        <div className="scard">
          <div className="wrapper">
            <img
              src={cricket}
              className="cover-image"
              alt=""
            />
          </div>
          <img src={crickettext} className="title" alt="" />
          <img
            src={cricketbgremove}
            className="character list-cricket"
            alt=""
          />
        </div>
      </Link>

      <Link to="/sport/Chess">
        <div className="scard">
          <div className="wrapper">
            <img
              src={chess}
              className="cover-image"
              alt=""
            />
          </div>
          <img src={chesstext} className="title" alt="" />
          <img
            src={chessremovebg}
            className="character list-chess"
            alt=""
          />
        </div>
      </Link>

      <Link to="/sport/Football">
        <div className="scard">
          <div className="wrapper">
            <img
              src={football}
              className="cover-image"
              alt=""
            />
          </div>
          <img src={footballtext} className="title" alt="" />
          <img
            src={footballremovebg}
            className="character list-football"
            alt=""
          />
        </div>
      </Link>

      <Link to="/sport/Volleyball">
        <div className="scard">
          <div className="wrapper">
            <img
              src={volleyball}
              className="cover-image"
              alt=""
            />
          </div>
          <img src={volleyballtext} className="title" alt="" />
          <img
            src={volleyballremovebg}
            className="character"
            alt=""
          />
        </div>
      </Link>

      <Link to="/sport/Carrom">
        <div className="scard">
          <div className="wrapper">
            <img
              src={carrom}
              className="cover-image"
              alt=""
            />
          </div>
          <img src={carromtext} className="title" alt="" />
          <img
            src={carromremovebg}
            className="character list-carrom"
            alt=""
          />
        </div>
      </Link>

      <Link to="/sport/TT">
        <div className="scard">
          <div className="wrapper">
            <img
              src={tabletennis}
              className="cover-image"
              alt=""
            />
          </div>
          <img src={tabletennistext} className="title" alt="" />
          <img
            src={tabletennisremovebg}
            className="character list-tt"
            alt=""
          />
        </div>
      </Link>

      <Link to="/sport/Ath">
        <div className="scard">
          <div className="wrapper">
            <img
              src={athletics}
              className="cover-image"
              alt=""
            />
          </div>
          <img src={athleticstext} className="title" alt="" />
          <img
            src={athleticsremovebg}
            className="character list-athletics"
            alt=""
          />
        </div>
      </Link>
    </div>
  );
};

export default MainSportList;
