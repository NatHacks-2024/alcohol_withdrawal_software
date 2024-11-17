import React, { useState, useEffect } from "react";
import { chatSession } from "../gemini";
import { AI_PROMPT } from "../constant";

export function App() {
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [medianValue, setMedianValue] = useState("0");

  const generatePrompt = async () => {
    // Replace {amplitude} in the AI_PROMPT
    const updatedPrompt = AI_PROMPT.replace("{amplitude}", medianValue);
    setGeneratedPrompt(updatedPrompt);
    console.log("Generated Prompt:", updatedPrompt);
    console.log("Median Value:", medianValue);

    setLoading(true);
    try {
      // Send the prompt to the Gemini chat session
      const result = await chatSession.sendMessage(updatedPrompt);

      // Process the response
      const responseText = await result.response.text(); // Extract the raw response text
      const responseData = JSON.parse(responseText); // Parse the JSON response

      // Extract the first prediction's output (Yes or No)
      const prediction =
        responseData.predictions && responseData.predictions[0]
          ? responseData.predictions[0].output
          : "Error: Unable to get prediction";

      setResult(prediction);
      console.log("Prediction Output:", prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the median value from the `public` folder
    const loadMedianValue = async () => {
      try {
        const response = await fetch("/median_value.txt");
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.status}`);
        }
        const data = await response.text();
        setMedianValue(data.trim()); // Remove any extra whitespace
        console.log("Median Value Loaded:", data.trim());
      } catch (error) {
        console.error("Error fetching median_value.txt:", error);
      }
    };

    loadMedianValue();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200">
      <header className="text-center py-6 bg-[#F73B52] text-white">
        <h1 className="text-3xl font-bold">Withdrawal Status Predictor</h1>
      </header>

      <div className="flex flex-col items-center justify-center mt-10 gap-6 px-6">
        <div className="text-center text-gray-800 max-w-2xl">
          <h2 className="font-bold text-2xl tracking-wide">
            Predict Withdrawal Status Automatically
          </h2>
          <p className="mt-2 text-gray-600">
            The system will use the median amplitude value from the file and
            generate a "Yes" or "No" prediction indicating withdrawal status.
          </p>
          <p className="mt-2 text-gray-700 font-semibold">
            Median Amplitude: {medianValue} mV
          </p>
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
      </div>
    </div>
  );
}

export default App;
