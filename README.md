# Socket.IO Node.js Server with Servo and LED Control

## Overview

This project is a Node.js server that facilitates real-time communication between connected clients via Socket.IO. The server interacts with two servo motors (or LEDs) connected to a Raspberry Pi or similar hardware, allowing clients to control the servos remotely by sending specific commands.

### Features:
- Real-time communication using Socket.IO.
- Servo motor control through custom class methods.
- Client connection and disconnection logging.
- Handles multiple clients simultaneously.
- Simple web interface that serves static files and can receive commands.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Socket.IO Events](#socketio-events)
- [Hardware Requirements](#hardware-requirements)
- [License](#license)

## Installation

### Prerequisites:
- Node.js (>= v12)
- NPM (Node Package Manager)
- Hardware: Raspberry Pi (or similar) with connected servos or LEDs.

### Steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Ensure you have the necessary hardware setup, such as the servos connected to GPIO pins.

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://<server-ip>:8000/`.

## Usage

Once the server is up and running, clients can connect via a web interface served by the app. Socket.IO handles real-time communication, and commands can be sent from the client to control the connected hardware (servo motors).

### Example commands:
- `!PlantOne` - Moves both servo motors to position 0.
- `!PlantTwo` - Moves the first servo motor to position 1.
- `!PlantThree` - Moves the first servo motor to position 2.
- `!PlantFour` - Moves both servo motors to different positions.

## Project Structure

```
project-directory/
│
├── src/
│   ├── classes/
│   │   ├── LED.js          # Controls LED (currently unused in this version)
│   │   └── Servo.js        # Class for controlling Servo motors
│   └── index.html          # Web interface for client interaction
│
├── app.js                  # Main application logic
├── package.json            # Project metadata and dependencies
└── README.md               # This readme file
```

## Socket.IO Events

### Server-Side Events:

- **`connection`**: Triggered when a new client connects. Adds the client to a list of active clients.
- **`disconnect`**: Handles client disconnection and removes the client from the active list.
- **`client`**: Receives messages from the connected client and executes servo control commands based on the received input.
- **`server`**: Sends a welcome message to newly connected clients.

### Client-Side Commands:
- `!PlantOne`: Moves both servo motors to position 0.
- `!PlantTwo`: Moves the first servo motor to position 1.
- `!PlantThree`: Moves the first servo motor to position 2.
- `!PlantFour`: Moves both servos to preset positions.

## Hardware Requirements

- **Servo Motors**: The server interacts with two servo motors connected to GPIO pins (9 and 10 in this example).
- **LED**: Although an LED class is present, it is commented out and not used in the current implementation.
  
### Servo Connections:
- Servo 1 on GPIO pin 10.
- Servo 2 on GPIO pin 9.

## License

This project is licensed under the MIT License.
