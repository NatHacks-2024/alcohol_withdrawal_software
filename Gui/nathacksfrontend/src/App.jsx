import React, { useState } from "react";

const App = () => {
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = async () => {
    try {
      const response = await fetch("http://localhost:5000/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        alert(data.message);
        setIsStreaming(true);
      } else {
        console.error(data.error);
        alert(data.error || "Failed to start the stream.");
      }
    } catch (error) {
      console.error("Error starting the stream:", error);
      alert("Error starting the stream. Check the backend connection.");
    }
  };

  const stopStream = async () => {
    try {
      const response = await fetch("http://localhost:5000/stop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        alert(data.message);
        setIsStreaming(false);
      } else {
        console.error(data.error);
        alert(data.error || "Failed to stop the stream.");
      }
    } catch (error) {
      console.error("Error stopping the stream:", error);
      alert("Error stopping the stream. Check the backend connection.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        OpenBCI Data Stream Control
      </h1>
      <div className="space-x-4">
        <button
          onClick={startStream}
          className={`px-6 py-3 text-white font-semibold rounded ${
            isStreaming ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={isStreaming}
        >
          Start Data Stream
        </button>
        <button
          onClick={stopStream}
          className={`px-6 py-3 text-white font-semibold rounded ${
            !isStreaming ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
          disabled={!isStreaming}
        >
          Stop Data Stream
        </button>
      </div>
    </div>
  );
};

export default App;
