import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/Predict.css';

const Predict = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  const [inputValue, setInputValue] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/classify/", {
        news: inputValue,
      });
      // Handle the response from the API
      setPredictionResult(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div className="predict-container">
      <div className="predict-content">
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your input here"
          className="input-textarea"
        ></textarea>
        <button
          onClick={handlePredict}
          className="predict-button"
        >
          Predict
        </button>
        {predictionResult && (
          <div className="prediction-result-box">
            <div className="prediction-result">
              <p>Input News: {predictionResult.input_news}</p>
              {/* <p>Preprocessed News: {predictionResult.preprocessed_news}</p> */}
              <p>Is Disaster Related: {predictionResult.is_disaster_related}</p>
              {predictionResult.is_disaster_related === 0 && (
                <p>No disaster-related information found.</p>
              )}
              {predictionResult.is_disaster_related === 1 && (
                <p>Class: {predictionResult.class}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
