import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import "./App.css"
import moment from 'moment';
import Navbar from './Navbar.js'; 
import CardBox from './CardBox.js'
import Textarea from './Textarea';
// import requests
// feature a
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
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <CardBox/>
      <Textarea />
    </div>
    {/* <div> 
      <Navbar> </Navbar>
        <CardBox/>
       
      </div>
    */}
    
    </>
  );
}

export default App;
