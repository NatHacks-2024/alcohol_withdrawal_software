import React, { useState, useEffect } from "react";
import { chatSession } from "../gemini";
import { AI_PROMPT } from "../constant";

export function App() {
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [medianValue, setMedianValue] = useState("0");
  const [feedback, setFeedback] = useState("");

  const generatePrompt = async () => {
    const updatedPrompt = AI_PROMPT.replace("{amplitude}", medianValue);
    setGeneratedPrompt(updatedPrompt);
    console.log("Generated Prompt:", updatedPrompt);

    setLoading(true);
    try {
      const response = await chatSession.sendMessage(updatedPrompt);
      const responseText = await response.response.text();
      const responseData = JSON.parse(responseText);

      const prediction =
        responseData.predictions && responseData.predictions[0]
          ? responseData.predictions[0].output
          : "Error: Unable to get prediction";

      setResult(prediction);
      console.log("Prediction Output:", prediction);

      // Generate feedback based on the result and median value
      generateFeedback(prediction, parseFloat(medianValue));
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateFeedback = (prediction, amplitude) => {
    let feedbackText = "";

    if (prediction === "Yes") {
      if (amplitude >= 3.0) {
        feedbackText =
          "Severe withdrawal symptoms detected. Immediate medical attention is required. Administer benzodiazepines and monitor for complications like seizures or delirium tremens 🚨🚨🚨";
      } else if (amplitude >= 1.5) {
        feedbackText =
          "Moderate withdrawal symptoms detected. Medication may be necessary. Monitor closely and ensure the patient is in a safe environment 🚨";
      } else {
        feedbackText =
          "Mild withdrawal symptoms detected. Non-pharmacological interventions and observation may suffice ";
      }
    } else {
      feedbackText = "No significant withdrawal symptoms detected. Continue monitoring as needed.";
    }

    setFeedback(feedbackText);
  };

  useEffect(() => {
    fetch("/median_value.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setMedianValue(data.trim());
        console.log("Median Value Loaded:", data.trim());
      })
      .catch((error) => console.error("Error fetching median_value.txt:", error));
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200">
      <header className="text-center py-6 bg-[#F73B52] text-white">
        <h1 className="text-3xl font-bold">Withdrawal Status Predictor </h1>
      </header>

      <div className="flex flex-col items-center justify-center mt-10 gap-6 px-6">
        <div className="text-center text-gray-800 max-w-2xl">
          <h2 className="font-bold text-2xl tracking-wide">
            Predict Withdrawal Status Based on Median Amplitude
          </h2>
          <p className="mt-2 text-gray-600">
            Analyze withdrawal symptoms based on sensor data and receive tailored feedback.
          </p>

          <h1 className="text-bold ">
            MEDIAN VALUE OF AMPLITUDE IN MVs = {medianValue}
          </h1>
        </div>
        

        {/* Generate Prediction Button */}
        <div className="mt-4">
          <button
            onClick={generatePrompt}
            disabled={loading}
            className={`rounded-xl p-4 text-white font-semibold bg-gradient-to-r from-[#F73B52] to-red-600 shadow-xl transform transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {loading ? "Predicting..." : "Generate Prediction"}
          </button>
        </div>

        {/* Display Result */}
        <div className="mt-6">
          {result && (
            <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50 max-w-lg text-center">
              <p className="text-gray-800">
                <strong>Prediction:</strong> {result}
              </p>
            </div>
          )}
        </div>
        <div className="mt-6">
          {result && (
            <img src ="/selected_range_plot.png">
              
            </img>
          )}
          </div>


        {/* Display Feedback */}
        {feedback && (
          <div className="mt-6 p-6 border border-green-300 rounded-lg shadow-md bg-green-50 max-w-lg text-center">
            <p className="text-green-800 font-semibold">
              <strong>Feedback:</strong> {feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
