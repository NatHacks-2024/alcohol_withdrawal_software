import os
import pandas as pd
import matplotlib.pyplot as plt

# Paths
recordings_folder = "/Users/francinemagno/documents/openbci_gui/recordings"
image_folder = "/Users/francinemagno/alcohol_withdrawal_software/frontend/public"

# Ensure the output folder exists
os.makedirs(image_folder, exist_ok=True)

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

# Read and process the CSV file
try:
    # Read the CSV file with appropriate delimiter (e.g., tab '\t')
    data = pd.read_csv(brainflow_csv_path, delimiter='\t', header=None)
    
    # Select the second column and a specific range (e.g., rows 100 to 200)
    second_column = data.iloc[:, 1]
    range_data = second_column[100:200]  # Adjust the range as needed

    # Plot the selected range
    plt.figure(figsize=(10, 6))
    plt.plot(range_data.index, range_data.values, label="Signal Data", color="blue")
    plt.title("Selected Signal Range")
    plt.xlabel("Index")
    plt.ylabel("Amplitude")
    plt.legend()
    plt.grid()

    # Save the image to the specified folder
    image_path = os.path.join(image_folder, "selected_range_plot.png")
    plt.savefig(image_path)
    plt.close()  # Close the figure to free up resources
    print(f"Plot saved to: {image_path}")

except Exception as e:
    print(f"An error occurred while processing {brainflow_csv_path}: {e}")