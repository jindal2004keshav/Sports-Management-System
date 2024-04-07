import React, { useCallback, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect
} from "react-router-dom";

import MainSportList from "./Sports/Pages/MainSportList";
import Homepage from "./Home/pages/Homepage";
import MainNavigation from "./Shared/Navigation/MainNavigation";
import EventList from "./Events/pages/EventList";
import Auth from "./Shared/Authenticate/Auth";
import Register from "./Register/Pages/Register";
import EventDatabse from "./Events/pages/EventDatabase";
import Footer from "./Shared/Footer/footer";
import SportDatabase from "./Sports/Pages/SportDatabase";
import EditData from "./Events/Components/EditData";
import AddPlayer from "./Events/Components/AddPlayer";
import Registerform from "./Register/Components/Registerform";
import "./App.css";
import { AuthContext } from "./Shared/context/auth-context";
import { IsOperator } from "./Shared/context/auth-context";

const App = () => {
  const auth = useContext(AuthContext);
  const opr = useContext(IsOperator);
  const [isOperator, setIsOperator] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const operator = useCallback(() => {
    setIsOperator(true);
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const notOperator = useCallback(() => {
    setIsOperator(false);
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/event/list" exact element={<EventList />} />
        <Route path="/sports/list" exact element={<MainSportList />} />
        <Route path="/auth" exact element={<Auth />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/event/:evtid" exact element={<EventDatabse />} />
        <Route path="/sport/:sportid" exact element={<SportDatabase />} />
        <Route path="/event/:evtid/edit/:pid/:sportid" exact element={<EditData />} />
        <Route path="/event/add/player" exact element={<AddPlayer />} />
        <Route path="/register/:evtid" exact element={<Registerform />} />
        {/* <Redirect to="/"/> */}
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/auth" exact element={<Auth />} />
        {/* <Redirect to="/auth" /> */}
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <IsOperator.Provider
        value={{ isOperator: isOperator, operator: operator, notOperator: notOperator }}
      >
        <Router>
          <div className="main-body">
            <MainNavigation />
            <div className="main-content">{routes}</div>
            <Footer />
          </div>
        </Router>
      </IsOperator.Provider>
    </AuthContext.Provider>
  );
};

export default App;
