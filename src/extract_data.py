import os
import pandas as pd

# Paths
recordings_folder = "/Users/francinemagno/documents/openbci_gui/recordings"
output_folder = "/Users/francinemagno/alcohol_withdrawal_software/sensor_data"
frontend_folder = "/Users/francinemagno/alcohol_withdrawal_software/frontend/src"

# Ensure the output and frontend folders exist
os.makedirs(output_folder, exist_ok=True)
os.makedirs(frontend_folder, exist_ok=True)

# Find the most recent session folder
session_folders = [
    os.path.join(recordings_folder, d) for d in os.listdir(recordings_folder) if os.path.isdir(os.path.join(recordings_folder, d))
]
most_recent_folder = max(session_folders, key=os.path.getmtime)
print(f"Most recent session folder: {most_recent_folder}")

# Find the BrainFlow CSV file
csv_files = [f for f in os.listdir(most_recent_folder) if f.startswith("BrainFlow") and f.endswith(".csv")]
if not csv_files:
    print("No BrainFlow CSV file found in the most recent session folder.")
    exit()

brainflow_csv_path = os.path.join(most_recent_folder, csv_files[0])
print(f"Processing file: {brainflow_csv_path}")

# Read the CSV file
try:
    # Read the CSV file (adjust delimiter if needed)
    data = pd.read_csv(brainflow_csv_path, delimiter="\t", header=None)
    print(data.head())  # Debugging: Print the first few rows of the dataframe

    # Extract the second column (Index 1)
    second_column = data.iloc[:, 1]  # Select the second column by index
    print(second_column.head())  # Debugging: Print the first few rows of the second column

    # Calculate the median of the second column
    median_value = second_column.median() / 1000  # Divide the median by 1000
    print(f"Median of second column (divided by 1000): {median_value}")

    # Save the extracted column to a new CSV file
    output_file_path = os.path.join(output_folder, "extracted_second_column.csv")
    second_column.to_csv(output_file_path, index=False, header=False)
    print(f"Extracted column saved to: {output_file_path}")

    # Save the median to a text file in the frontend folder
    median_file_path = os.path.join(frontend_folder, "median_value.txt")
    with open(median_file_path, "w") as median_file:
        median_file.write(f"{median_value}\n")
    print(f"Median saved to: {median_file_path}")

except Exception as e:
    print(f"An error occurred while processing {brainflow_csv_path}: {e}")