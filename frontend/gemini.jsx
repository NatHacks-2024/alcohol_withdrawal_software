//
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace this with your actual API Key
const API_KEY = "AIzaSyDRB9kQ_xub75Z8G3QMm-qlikShfyyxMT8";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Predict the Withdrawal Status based on amplitude values in millivolts (mV). 
          
          Input an amplitude value and output a "Yes" or "No" indicating if withdrawal symptoms are present. 
          
          Follow this structure strictly:
          {
            "input": "amplitude_value_mV",
            "output": "Yes or No"
          } 
          
          Ensure responses are accurate and concise. Provide a few sample predictions to validate output quality:
          
          - Input: 2.49, Output: Yes
          - Input: 0.37, Output: No
          - Input: 4.21, Output: Yes
          - Input: 0.1, Output: No`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
  "predictions": [
    {
      "input": "2.49",
      "output": "Yes"
    },
    {
      "input": "0.37",
      "output": "No"
    },
    {
      "input": "4.21",
      "output": "Yes"
    },
    {
      "input": "0.1",
      "output": "No"
    }
  ]
}`,
        },
      ],
    },
  ],
});
