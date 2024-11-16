import React, { useState } from "react";
import { chatSession } from "../gemini";
import { AI_PROMPT } from "../constant";


export function App() {
  const [amplitude, setAmplitude] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    if (!amplitude) {
      console.log("Please enter an amplitude value.");
      return;
    }

    // Replace {amplitude} in the AI_PROMPT
    const updatedPrompt = AI_PROMPT.replace("{amplitude}", amplitude);
    setGeneratedPrompt(updatedPrompt);
    console.log("Generated Prompt:", updatedPrompt);

    setLoading(true);
    try {
      // Send the prompt to the Gemini chat session
      const result = await chatSession.sendMessage({
        role: "user",
        parts: [{ text: updatedPrompt }],
      });

      // Process the response
      const responseText = await result.response.text(); // Extract the raw response text
      setResult(responseText);
      console.log("Model Response:", responseText);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200">
      <header className="text-center py-6 bg-[#F73B52] text-white">
        <h1 className="text-3xl font-bold">Withdrawal Status Predictor</h1>
      </header>

      <div className="flex flex-col items-center justify-center mt-10 gap-6 px-6">
        <div className="text-center text-gray-800 max-w-2xl">
          <h2 className="font-bold text-2xl tracking-wide">
            Enter Amplitude Value to Predict Withdrawal Status
          </h2>
          <p className="mt-2 text-gray-600">
            Provide an amplitude value (in millivolts) and get a "Yes" or "No"
            response indicating withdrawal status.
          </p>
        </div>

        {/* Input Field for Amplitude */}
        <div className="w-full max-w-sm mt-6">
          <input
            type="text"
            value={amplitude}
            onChange={(e) => setAmplitude(e.target.value)}
            placeholder="Enter amplitude value (mV)"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
          />
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
      </div>
    </div>
  );
}
export default App;