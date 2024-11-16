from flask import Flask, jsonify, request
from flask_cors import CORS
import socket
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure the IP and port to match the OpenBCI GUI configuration
UDP_IP = "127.0.0.1"  # Use 'localhost' if Flask is on the same machine as the GUI
UDP_PORT = 12345      # Port number you configured in the GUI

is_listening = False
udp_socket = None

def listen_for_udp():
    global udp_socket
    udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    udp_socket.bind((UDP_IP, UDP_PORT))
    print(f"Listening for UDP data on {UDP_IP}:{UDP_PORT}...")
    
    while is_listening:
        try:
            data, addr = udp_socket.recvfrom(1024)
            print(f"Received message: {data.decode()}")
        except Exception as e:
            print(f"Error receiving UDP data: {e}")
            break

@app.route('/start', methods=['POST'])
def start_udp_stream():
    global is_listening
    if is_listening:
        return jsonify({"message": "UDP stream is already running"}), 400

    is_listening = True
    threading.Thread(target=listen_for_udp, daemon=True).start()
    return jsonify({"message": "UDP stream started successfully"}), 200

@app.route('/stop', methods=['POST'])
def stop_udp_stream():
    global is_listening, udp_socket
    if not is_listening:
        return jsonify({"message": "UDP stream is not running"}), 400

    is_listening = False
    if udp_socket:
        udp_socket.close()
    return jsonify({"message": "UDP stream stopped successfully"}), 200

@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({"is_listening": is_listening})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5174)
