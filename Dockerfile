# Use an official Python image
FROM python:3.11-slim

# Install necessary system dependencies for bluepy and OpenBCI
RUN apt-get update && apt-get install -y \
    build-essential \
    libglib2.0-dev \
    bluetooth \
    bluez \
    python3-pip \
    git && \
    apt-get clean

# Install Python dependencies
RUN pip install numpy pyserial bitstring xmltodict requests pyOpenBCI bluepy

# Set the working directory inside the container
WORKDIR /app

# Copy your local project files into the container
COPY . .

# Run your application
CMD ["python", "data_stream.py"]