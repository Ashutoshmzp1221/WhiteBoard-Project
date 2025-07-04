Collaborative Whiteboard Application
A real-time collaborative whiteboard application built with the MERN stack and Socket.io, enabling users to draw and interact together in shared virtual rooms.

🚀 Features
This application provides the following core functionalities:

Room Management:

  - Users can join existing whiteboard rooms by entering a simple 6-8 character alphanumeric room code.
  - New rooms are dynamically created if a non-existing room code is entered.
  - No authentication or user registration is required, allowing for quick access.
  - Users enter a temporary username upon joining a room.
  - Drawing Functionality:
  - Single Tool: A versatile pencil/pen tool for freehand drawing.
  - Smooth Lines: Ensures a fluid and natural drawing experience.
  - Adjustable Stroke Width: A simple slider allows users to control the thickness of their lines.
  - Basic Color Selection: Choose from black, red, blue, and green.
  - Clear Canvas: An option to instantly clear all drawings from the whiteboard.
  - HTML5 Canvas: Utilizes the HTML5 Canvas element for drawing operations.
  - Live Collaboration:
  - Real-time Cursor Tracking: See the live cursor positions of all connected users in the room, with their usernames displayed next to their cursors.
  - Live Drawing Synchronization: All drawing actions (strokes, color changes, width adjustments, clear canvas) are instantly synchronized across all connected clients in the same room.
  - User Presence: A real-time display shows the number of active users currently in the room.
  - Connection Status: Visual indicator for WebSocket connection status.

🛠️ Technology Stack
The project is built using the following technologies:

Frontend:

  React.js: A JavaScript library for building user interfaces.
  Styled Components: For writing CSS-in-JS, enabling component-scoped and dynamic styling.
  react-icons: For easily integrating popular icon libraries.
  socket.io-client: The client-side library for WebSocket communication.

Backend:

  Node.js: A JavaScript runtime environment.
  Express.js: A fast, unopinionated, minimalist web framework for Node.js.
  Socket.io: A library that enables real-time, bidirectional, event-based communication.
  Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
  cors: Node.js middleware for providing a Connect/Express middleware that can be used to enable CORS with various options.
  dotenv: To load environment variables from a .env file.

Database:

MongoDB: A NoSQL, document-oriented database.

🚀 Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Before you begin, ensure you have the following installed:
    
  Node.js (v18 or higher recommended)
  npm (Node Package Manager, comes with Node.js) or Yarn
  MongoDB (Community Server Edition) - Ensure your MongoDB instance is running.

Installation Steps
Clone the repository:

git clone https://github.com/Ashutoshmzp1221/WhiteBoard-Project.git
cd whiteboard-app

Backend Setup:

  Navigate to the server directory:
  cd server
  nstall backend dependencies:
  
      npm install
      # or
      yarn install

Create a .env file in the server directory and add your environment variables:

      MONGO_URI=mongodb://localhost:27017/whiteboardDB
      PORT=5000
      CLIENT_URL=http://localhost:3000

(Adjust MONGO_URI if your MongoDB runs on a different port or host. CLIENT_URL should match your React app's development URL.)

Frontend Setup:

Navigate back to the project root and then into the client directory:

      cd ../client

Install frontend dependencies:

      npm install
      # or
      yarn install

Running the Application
Start the Backend Server:

In your terminal, navigate to the server directory.

Run:

      npm start
      # or
      node server.js

You should see output indicating "MongoDB Connected" and "Server running on port 5000".

Start the Frontend Development Server:

Open a new terminal window.

Navigate to the client directory.

Run:

      npm start
      # or
      yarn start

This will open the application in your default web browser at http://localhost:3000.

🎨 Usage
Join/Create Room:

Upon opening the application, you'll be prompted to enter a Username and a Room Code.

Enter your desired username (e.g., "Artist1").

Enter a room code (e.g., "ROOM123"). If the room doesn't exist, it will be created automatically.

Click "Go to Whiteboard".

Collaborate:

Open another browser tab or window, or have a friend open the URL on their device.

Enter a different username (e.g., "Designer2") but the same room code ("ROOM123").

Now, you can draw on the canvas, and your drawings will appear in real-time on the other connected client(s).

Observe other users' cursors moving around the canvas, each with their respective username.

Use the toolbar at the top to adjust pen size, change drawing color, or clear the entire canvas.

The user count at the bottom right will update as users join and leave.

📂 Project Structure
The project is organized into client and server directories, each with its own specific structure:

        project-root/
        ├── client/                     # React frontend application
        │   ├── public/                 # Static assets
        │   ├── src/
        │   │   ├── components/         # Reusable React components (RoomJoin, Whiteboard, DrawingCanvas, Toolbar, UserCursors)
        │   │   ├── styles/             # Styled Components definitions for each component
        │   │   │   ├── RoomJoinStyles.js
        │   │   │   ├── ToolbarStyles.js
        │   │   │   ├── UserCursorsStyles.js
        │   │   │   └── WhiteboardStyles.js
        │   │   ├── App.js              # Main application component, handles routing between join/whiteboard
        │   │   └── index.js            # React entry point, global CSS import
        │   └── package.json
        ├── server/                     # Node.js backend application
        │   ├── config/                 # Configuration files
        │   │   └── db.js               # MongoDB connection logic
        │   ├── models/
        │   │   └── Room.js             # Mongoose schema for Room data
        │   ├── routes/
        │   │   └── roomRoutes.js       # Express API routes (placeholder, main logic is Socket.io)
        │   ├── socket/
        │   │   └── index.js            # Socket.io event handling logic
        │   ├── .env                    # Environment variables
        │   ├── package.json
        │   └── server.js               # Main Express and Socket.io server entry point
        └── README.md                   # Project README (this file)

🔌 API Documentation
Backend REST Endpoints (Express.js)
While most real-time interactions are handled by Socket.io, a minimal Express setup exists:
    GET /: Returns a simple "Whiteboard Server is running!" message to confirm server status.
    POST /api/rooms/join: (Currently not used by frontend, Socket.io handles join) - Could be used for more complex room validation or initial data fetching if needed.
    GET /api/rooms/:roomId: (Currently not used by frontend) - Could be used to fetch specific room information.

Socket.io Events
All real-time communication between clients and the server occurs via Socket.io events.
Client Emits (Frontend to Backend)
'join-room'
    Purpose: Informs the server that a user wants to join or create a specific room.
    Data: { roomId: string, username: string }
    roomId: The alphanumeric code of the room.
    username: The user's chosen display name.


'cursor-move'
    Purpose: Sends the current cursor position of the user.
    Data: { x: number, y: number, user: string }
    x: X-coordinate of the cursor on the canvas.
    y: Y-coordinate of the cursor on the canvas.
    user: The username of the user moving the cursor.

'draw-start'
    Purpose: Signals the beginning of a new drawing stroke.
    Data: { x: number, y: number, color: string, width: number }
    x, y: Starting coordinates of the stroke.
    color: Hex code of the stroke color.
    width: Width of the stroke.

'draw-move'
    Purpose: Sends incremental path data as the user draws.
    Data: { x: number, y: number }
    x, y: Current coordinates of the drawing path.

'draw-end'
    Purpose: Signals the end of a drawing stroke. The complete stroke data is sent for persistence.
    Data: { drawingCommand: { type: 'stroke', data: { path: [{ x: number, y: number }], color: string, width: number }, timestamp: Date } }
    drawingCommand: An object representing the completed stroke.
    type: Always 'stroke' for drawing.
    data: Contains the full path of points, color, and width.
    timestamp: When the stroke was completed.

'clear-canvas'
    Purpose: Requests to clear the entire canvas for all users in the room.
    Data: (none)
    Server Emits (Backend to Frontend)
    
'load-drawing'
    Purpose: Sent to a newly joined user to load the existing drawing data for the room.
    Data: Array<DrawingCommandSchema> (an array of stored drawing commands)

'cursor-move'
    Purpose: Broadcasts a remote user's cursor movement to all other clients in the room.
    Data: { id: string, x: number, y: number, user: string }
    id: Socket ID of the user whose cursor moved.
    x, y: Cursor coordinates.
    user: Username of the user.

'draw-start'
    Purpose: Broadcasts the start of a remote drawing stroke.
    Data: { id: string, x: number, y: number, color: string, width: number }
    id: Socket ID of the user who started drawing.
    x, y, color, width: Details of the stroke.

'draw-move'
    Purpose: Broadcasts incremental path data of a remote drawing stroke.
    Data: { id: string, x: number, y: number }
    id: Socket ID of the user drawing.
    x, y: Current drawing coordinates.

'draw-end'
    Purpose: Broadcasts the end of a remote drawing stroke.
    Data: { id: string, drawingCommand: { ... } }
    id: Socket ID of the user who finished drawing.
    drawingCommand: The full drawing command object (same structure as client emits).

'clear-canvas'
    Purpose: Informs all clients in a room to clear their canvas.
    Data: (none)
    
'user-count-update'
    Purpose: Informs clients about the current number of active users in the room.
    Data: number (the count of users)

🏛️ Architecture Overview
The application follows a client-server architecture with real-time capabilities powered by WebSockets:

Frontend (React.js):

  Handles the user interface, drawing canvas rendering, and user input (mouse/touch events).
  Communicates with the backend primarily via Socket.io for real-time updates (drawing, cursors, user count).
  Manages local drawing state and sends incremental updates to the server.
  Receives drawing and cursor updates from other clients via the server.

Backend (Node.js/Express.js):

  Manages Socket.io connections and rooms.
  Receives real-time events from clients (e.g., draw-move, cursor-move).
  Broadcasts these events to other clients in the same room.
  Interacts with MongoDB for data persistence (storing completed drawing strokes).
  Handles room creation and initial loading of drawing data for new users.

Database (MongoDB):
  Stores Room documents, each containing a roomId and an array of drawingData (representing all completed strokes in that room). This ensures drawings persist even if all users leave.

Data Flow:

  Joining a Room: Client sends join-room event with roomId and username. Server creates/joins room, stores username on socket, sends load-drawing (if any) to client, and broadcasts user-count-update.
  Drawing: Client captures mouse/touch events, draws locally, and sends draw-start, draw-move, draw-end events to the server. Server broadcasts these to other clients in the room. draw-end also triggers persistence to MongoDB.
  Cursor Tracking: Client sends throttled cursor-move events. Server broadcasts these to other clients.
  Clear Canvas: Client sends clear-canvas event. Server broadcasts to all clients and clears data in MongoDB.

⚡ Performance Considerations
    Cursor Throttling: Cursor position updates are throttled on the client-side (to ~60fps) to prevent overwhelming the server with excessive events.
    Incremental Drawing Updates: Drawing data is sent as small, incremental updates (draw-move) rather than sending the entire canvas state, minimizing network payload. Complete strokes are persisted only on draw-end.
    Database Cleanup: (Future/Server-side task) Implement a mechanism to clean up old room data (e.g., rooms inactive for 24+ hours) to manage database size.

✨ User Experience (UI/UX) Highlights
    Clean & Minimal Interface: The design focuses on the core whiteboard functionality, keeping controls simple and unobtrusive.
    Intuitive Room Join: A prominent, easy-to-use input for room codes and usernames.
    Responsive Design: The application is designed to be fully responsive, ensuring optimal viewing and usability on both desktop and tablet devices.
    Real-time Visual Feedback:
    Immediate visual feedback for all drawing actions on the canvas.
    Smooth, animated cursor movements for remote users, enhancing the sense of real-time collaboration.
    Clear connection status indicator and active user count display.
    

Developed by: Your Name / Ashutosh Dwivedi (as per the path in your error messages)
