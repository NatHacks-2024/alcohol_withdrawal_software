import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [amplitude, setAmplitude] = useState(""); // Store user input
  const [prediction, setPrediction] = useState(""); // Store the API response
  const [loading, setLoading] = useState(false); // Manage loading state

  // Initialize Gemini API
  const apiKey = "AIzaSyDRB9kQ_xub75Z8G3QMm-qlikShfyyxMT8"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(apiKey);

  // Handle form submission
  const handleSubmit = async () => {
    if (!amplitude) {
      alert("Please enter an amplitude value!");
      return;
    }

    setLoading(true);
    setPrediction(""); // Clear previous prediction

    try {
      // Initialize model
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      // Configuration for the generation
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      // Dynamic input to Gemini API
      const parts = [
        { text: "input: Amplitude_mV" },
        { text: "output: Withdrawal_Status" },
        { text: `input: ${parseFloat(amplitude)}` }, // Use user input here
      ];

      // Call the API
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
      });

      // Update prediction
      setPrediction(result.response.text.trim());
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction("Error generating prediction.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Alcohol Withdrawal Prediction</h1>
      <label>
        Enter Amplitude (mV):
        <input
          type="number"
          value={amplitude}
          onChange={(e) => setAmplitude(e.target.value)}
          placeholder="e.g., 2.49"
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </label>
      <br />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Prediction"}
      </button>
      <h2 style={{ marginTop: "20px" }}>Prediction:</h2>
      <p>{prediction}</p>
    </div>
  );
}

export default App;
