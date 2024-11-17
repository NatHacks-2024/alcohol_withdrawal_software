# **Alcohol Withdrawal Monitoring System**

## **Project Overview**
Alcohol withdrawal syndrome poses a significant challenge in clinical settings, with tremors being one of the most recognizable symptoms. However, many patients fake hand tremors, leading to unnecessary sedative use. Our innovative system addresses this gap by objectively monitoring chin/tongue tremors using **OpenBCI** technology and leveraging the **Gemini LLM** for predictive analysis.

---

## **Features**
### **1. Tremor Detection**
- Monitors involuntary chin/tongue tremors to provide an objective measure of alcohol withdrawal severity.

### **2. Data Analysis**
- Extracts tremor data, calculates medians, and identifies trends using advanced signal processing techniques.

### **3. Predictive Analytics**
- Integrates the **Gemini LLM** to analyze tremor data and predict withdrawal severity using the **CIWA scale** (Clinical Institute Withdrawal Assessment for Alcohol).

### **4. UI Visualization**
- Displays:
  - Tremor plots.
  - CIWA scale predictions.
  - Recommended actions for treatment.

---

## **How It Works**
### **Step 1: Data Collection**
- OpenBCI sensors capture tremor activity and store it in `.csv` format for analysis.

### **Step 2: Signal Processing**
- The system processes the second column of raw tremor data:
  - Calculates the **median value**.
  - Visualizes the tremor activity in a graph.

### **Step 3: Prediction and Recommendation**
- The Gemini LLM uses the processed median to predict tremor severity based on the CIWA scale.
- The UI suggests **recommended actions** tailored to patient needs.

---

## **Setup Instructions**

### **1. Prerequisites**
- Ensure the following are installed:
  - Python 3.9+
  - Node.js 16+
  - React + Vite for frontend
  - **Gemini LLM** API access.

### **2. Backend Setup**

   ```bash
   git clone https://github.com/NatHacks-2024/alcohol_withdrawal_software.git
   cd alcohol_withdrawal_software/backend
   pip install -r requirements.txt
   python src/data_stream.py
```

### **3. Frotnend Setup**

   ```bash
	cd ../frontend
	npm install
	npm run dev
```

### **Project Structure**
![CleanShot 2024-11-17 at 00 45 12](https://github.com/user-attachments/assets/eafeb428-ed54-4297-9761-196daf98812a)

---

## **Future Enhancements**
1. **Real-Time Analysis**:
   - Implement live-streamed tremor data visualization directly in the UI.
   
2. **Enhanced Predictive Modeling**:
   - Incorporate additional patient metrics for more accurate CIWA scale predictions.

3. **Mobile Compatibility**:
   - Develop a mobile app for easier monitoring by healthcare providers.

4. **AI Improvements**:
   - Upgrade to advanced LLM models for better interpretability and accuracy.
     
---

## **Acknowledgements**

We would like to extend our gratitude to the following:

- **OpenBCI** - For providing open-source brain-computer interface technology used in this project.
- **Gemini LLM** - For enabling predictive analytics and advanced decision-making processes.
- **NatHacks 2024 Organizers** - For the opportunity to innovate and collaborate during this hackathon.
- **Team Members** - For their hard work, dedication, and innovation in bringing this project to life.

---

## **License**

This project is licensed under the **MIT License**.

