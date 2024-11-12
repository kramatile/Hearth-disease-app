import React, { useState } from "react";
import LabeledInput from "./LabeledInput/LabeledInput";
import { continuous_columns, categorical_columns } from "./features"; // Adjust the import path accordingly
import "./form.css";
import Prediction from "./Prediction";

function Form() {
  const [formData, setFormData] = useState({});
  const [displayPredict, setDisplayPredict] = useState(false);
  const [selectedModel, setSelectedModel] = useState(""); // State for selected model
  const [predictionResult, setPredictionResult] = useState(""); // State for prediction result

  const handleInputChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value); // Update the selected model
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Make the AJAX request to the backend
    try {
      const response = await fetch("http://localhost:3001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();
      console.log(data.prediction);
      setPredictionResult(`${data.prediction}`);
      console.log(predictionResult); // Assuming backend returns { prediction: "some result" }
      setDisplayPredict(true); // Set state to show prediction component
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStartNew = () => {
    setDisplayPredict(false); // Reset to show the form
    // setFormData({}); // Clear the form data
    setSelectedModel(""); // Reset selected model
    setPredictionResult(""); // Clear prediction result
  };
  const handleReset = () => {
    setFormData({});
  };
  return (
    <>
      {!displayPredict ? (
        <form>
          {categorical_columns.map((column, index) => (
            <LabeledInput
              key={index}
              id={column}
              label={column.charAt(0).toUpperCase() + column.slice(1)} // Capitalize first letter
              value={formData[column] || ""}
              onChange={handleInputChange}
              info={"Enter value for " + column}
              unit={"unit: N/A"} // Adjust unit as necessary
            />
          ))}
          {continuous_columns.map((column, index) => (
            <LabeledInput
              key={index}
              id={column}
              label={column.charAt(0).toUpperCase() + column.slice(1)} // Capitalize first letter
              value={formData[column] || ""}
              onChange={handleInputChange}
              info={"Enter value for " + column}
              unit={"unit: N/A"} // Adjust unit as necessary
            />
          ))}
          <div className="buttons">
            <div className="model-selection">
              <select
                id="model"
                value={selectedModel}
                onChange={handleModelChange}
              >
                <option value="">Select a model</option>
                <option value="knn">KNN</option>
                <option value="logistic_regression">Logistic Regression</option>
                <option value="svm">SVM</option>

                <option value="bayes">Naive Bayes</option>
              </select>
            </div>
            <button id="predict-btn" onClick={handleSubmit}>
              Predict
            </button>
            <button onClick={handleReset}>reset</button>
          </div>
        </form>
      ) : (
        <Prediction
          model={selectedModel}
          prediction={predictionResult || "Prediction not available"}
          onStartNew={handleStartNew}
        />
      )}
    </>
  );
}

export default Form;
