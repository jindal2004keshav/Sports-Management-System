import React from "react";

import './News.css';
import NewsList from "./NewsList";


const News = () => {
    
    const NewsTable = [
        {
            newsid : "n1",
            newsTitle: "IIITG won inter IIIT sports trophy",
            newsinfo: "IIIT Guwahati won the cup of sports campionship tournament held by IIIT Allahbad",
        },
        {
            newsid : "n1",
            newsTitle: "IIITG won inter IIIT sports trophy",
            newsinfo: "IIIT Guwahati won the cup of sports campionship tournament held by IIIT Allahbad",
        },
        {
            newsid : "n1",
            newsTitle: "IIITG won inter IIIT sports trophy",
            newsinfo: "IIIT Guwahati won the cup of sports campionship tournament held by IIIT Allahbad",
        },
        {
            newsid : "n1",
            newsTitle: "IIITG won inter IIIT sports trophy",
            newsinfo: "IIIT Guwahati won the cup of sports campionship tournament held by IIIT Allahbad",
        },
        {
            newsid : "n1",
            newsTitle: "IIITG won inter IIIT sports trophy",
            newsinfo: "IIIT Guwahati won the cup of sports campionship tournament held by IIIT Allahbad",
        },
        {
            newsid : "n1",
            newsTitle: "IIITG won inter IIIT sports trophy",
            newsinfo: "IIIT Guwahati won the cup of sports campionship tournament held by IIIT Allahbad",
        },
        {
            newsid : "n1",
            newsTitle: "IIITG won inter IIIT sports trophy",
            newsinfo: "IIIT Guwahati won the cup of sports campionship tournament held by IIIT Allahbad",
        },
        {
            newsid : "n1",
            newsTitle: "IIITG won inter IIIT sports trophy",
            newsinfo: "IIIT Guwahati won the cup of sports campionship tournament held by IIIT Allahbad",
        },
        {
            newsid : "n1",
            newsTitle: "IIITG won inter IIIT sports trophy",
            newsinfo: "IIIT Guwahati won the cup of sports campionship tournament held by IIIT Allahbad",
        },
        
        
    ];

    return <div className="news">
        <div className="overlay-image2"></div>
        <h3>News</h3>
        <NewsList items={NewsTable}/>
    </div>;
};

export default News;