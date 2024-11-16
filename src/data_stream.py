from brainflow.board_shim import BoardShim, BrainFlowInputParams, LogLevels

# Enable BrainFlow logging for debugging
BoardShim.enable_dev_board_logger()

# Set up BrainFlowInputParams
params = BrainFlowInputParams()
params.mac_address = "f5:f7:0f:42:32:06"  # Your board's MAC address
params.serial_port = "/dev/tty.usbmodem11"  # Update with your actual port

# Initialize Ganglion board (board ID is 1)
board = BoardShim(1, params)

try:
    # Prepare session and start streaming
    board.prepare_session()
    board.start_stream()
    print("Streaming data...")

    # Collect data for 10 seconds
    import time
    time.sleep(10)

    # Stop the stream and get data
    board.stop_stream()
    data = board.get_board_data()
    print("Data collected:", data)

except Exception as e:
    print("Error:", e)

finally:
    # Ensure the session is released
    board.release_session()