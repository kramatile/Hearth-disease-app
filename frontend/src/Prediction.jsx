// Prediction component
import "./Prediction.css";
const Prediction = ({ model, prediction, onStartNew }) => {
  return (
    <div className="prediction-container">
      <h3>Prediction Results</h3>
      <div>
        <p>Selected Model: {model}</p>
        <p>
          Prediction : <br />
          {prediction == 1
            ? "cardiovascular disease detected ! "
            : "no signs for cardiovascular disease ! "}
        </p>
        <button id="new-predict" onClick={onStartNew}>
          Start New Prediction
        </button>{" "}
      </div>{" "}
    </div>
  );
};
export default Prediction;
