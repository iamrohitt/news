import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import "./App.css"
import moment from 'moment';
import SearchBar from "./SearchBar.js"
import CardBox from './CardBox.js'
// import requests
function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/related").then((res) => {
      console.log(res);
      setNews(res);
    });
  }, []);
  return (
    <>
    <div>
        <CardBox/>
      </div>
    <div className="searchbar">
     <SearchBar/>
     </div>
      
    
    </>
  );
}

export default App;
