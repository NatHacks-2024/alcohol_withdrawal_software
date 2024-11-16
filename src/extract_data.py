import os
import pandas as pd

# Paths
recordings_folder = "/Users/francinemagno/documents/openbci_gui/recordings"
output_folder = "/Users/francinemagno/alcohol_withdrawal_software/sensor_data"

# Find the most recent session folder
session_folders = [os.path.join(recordings_folder, d) for d in os.listdir(recordings_folder) if os.path.isdir(os.path.join(recordings_folder, d))]
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
    # Adjust the delimiter if needed (default is tab here)
    data = pd.read_csv(brainflow_csv_path, delimiter="\t", header=None)
    print(data.head())  # Debugging: Print the first few rows of the dataframe

    # Extract the second column (Index 1)
    second_column = data.iloc[:, 1]  # Select the second column by index
    print(second_column.head())  # Debugging: Print the first few rows of the second column

    # Divide all values in the second column by 1000
    second_column = second_column / 1000
    print("Second column after division by 1000:\n", second_column.head())

    # Save the modified column to a new CSV file
    output_file_path = os.path.join(output_folder, "extracted_second_column_divided.csv")
    second_column.to_csv(output_file_path, index=False, header=False)
    print(f"Processed column saved to: {output_file_path}")

except Exception as e:
    print(f"An error occurred while processing {brainflow_csv_path}: {e}")