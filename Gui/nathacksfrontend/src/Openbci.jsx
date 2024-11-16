import React, { useState } from "react";
import { OpenBCIWifi } from "@openbci/wifi";


const OpenBCIControl = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [board, setBoard] = useState(null);

  // Function to initialize and connect the OpenBCI board
  const initializeBoard = async () => {
    if (!board) {
      const newBoard = new OpenBCIBoard();
      await newBoard.connect("/dev/ttyUSB0"); // Replace with your device's port
      setBoard(newBoard);
      console.log("Board connected");
    }
  };

  // Function to start the data stream
  const startStream = async () => {
    if (board && !isStreaming) {
      await initializeBoard(); // Ensure board is connected
      board.on("sample", (sample) => {
        console.log("Data:", sample.channelData); // Log channel data
      });
      await board.streamStart();
      setIsStreaming(true);
      console.log("Streaming started");
    }
  };

  // Function to stop the data stream
  const stopStream = async () => {
    if (board && isStreaming) {
      await board.streamStop();
      await board.disconnect();
      setIsStreaming(false);
      console.log("Streaming stopped and board disconnected");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">OpenBCI Control Panel</h1>
      <div className="space-x-4">
        <button
          onClick={startStream}
          disabled={isStreaming}
          className={`px-6 py-2 text-white rounded-md shadow-md transition ${
            isStreaming
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Start Stream
        </button>
        <button
          onClick={stopStream}
          disabled={!isStreaming}
          className={`px-6 py-2 text-white rounded-md shadow-md transition ${
            !isStreaming
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Stop Stream
        </button>
      </div>
    </div>
  );
};

export default OpenBCIControl;
