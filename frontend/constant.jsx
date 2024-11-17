export const AI_PROMPT = `Predict the Withdrawal Status based on  {amplitude} values in millivolts (mV). 
Provide a clear "Yes" or "No" output indicating whether the withdrawal status is positive. 
Ensure the response format strictly follows:

{
  "input": "amplitude_value_mV",
  "output": "Yes or No"
}

Include examples for a variety of amplitude values to validate the model's accuracy. Ensure the model adapts to varying amplitudes effectively and returns an accurate response.`;
