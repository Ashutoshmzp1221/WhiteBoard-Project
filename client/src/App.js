import React, { useState, useEffect } from 'react';
import RoomJoin from './components/RoomJoin';
import Whiteboard from './components/Whiteboard';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
    const [roomId, setRoomId] = useState(null);
    const [username, setUsername] = useState(null); 

    const handleJoinRoom = (code, user) => { 
        setRoomId(code);
        setUsername(user); 
        socket.emit('join-room', { roomId: code, username: user });
    };

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
            if (roomId && username) { 
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
    }, [roomId, username]);


    return (
        <div className="App">
            {!roomId ? (
                <RoomJoin onJoinRoom={handleJoinRoom} />
            ) : (
                
                <Whiteboard roomId={roomId} socket={socket} username={username} />
            )}
        </div>
    );
}

export default App;