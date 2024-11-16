from brainflow.board_shim import BoardShim, BrainFlowInputParams, LogLevels
import time

# Initialize logger
BoardShim.enable_dev_board_logger()

params = BrainFlowInputParams()
params.mac_address = "f5:f7:0f:42:32:06"  # Your Ganglion MAC address
params.serial_port = "/dev/tty.usbmodem11"  # Adjust to your system's port

board = BoardShim(1, params)

try:
    print("Preparing session...")
    board.prepare_session()
    print("Session prepared. Starting stream...")
    board.start_stream()
    
    print("Streaming data for 10 seconds...")
    time.sleep(10)
    
    print("Stopping stream and retrieving data...")
    board.stop_stream()
    data = board.get_board_data()
    print(f"Data shape: {data.shape}")
    print(f"Sample data:\n{data[:5, :]}")
    
finally:
    print("Releasing session...")
    board.release_session()
    print("Session released.")