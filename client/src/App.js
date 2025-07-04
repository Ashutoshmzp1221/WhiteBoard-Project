// client/src/App.js

import React, { useState, useEffect } from 'react';
import RoomJoin from './components/RoomJoin';
import Whiteboard from './components/Whiteboard';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
    const [roomId, setRoomId] = useState(null);
    const [username, setUsername] = useState(null); // New state for username

    const handleJoinRoom = (code, user) => { // Updated to accept username
        setRoomId(code);
        setUsername(user); // Set username state
        // Pass username to the 'join-room' event
        socket.emit('join-room', { roomId: code, username: user });
    };

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
            if (roomId && username) { // If already in a room and has a username
                // Re-join room with username if already in one (e.g., after a reconnect)
                socket.emit('join-room', { roomId: roomId, username: username });
            }
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.io server');
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [roomId, username]); // Add username to dependency array


    return (
        <div className="App">
            {!roomId ? (
                <RoomJoin onJoinRoom={handleJoinRoom} />
            ) : (
                // Pass username to Whiteboard component as well
                <Whiteboard roomId={roomId} socket={socket} username={username} />
            )}
        </div>
    );
}

export default App;