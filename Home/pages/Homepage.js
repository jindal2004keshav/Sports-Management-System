import React from "react";

import HomeEvents from '../Components/HomeEvents';
import News from '../Components/News';
import HomePhotos from "../Components/HomePhotos";
import './Homepage.css';

const Homepage = () => {
    return <div className="test homepage">
        <div className="homeEvents-news-container">
        <HomeEvents />
        <News />
        </div>
        <div className="home-photos">
            <HomePhotos />
        </div>
    </div>;
};

export default Homepage;