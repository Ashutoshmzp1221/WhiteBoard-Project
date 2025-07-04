

import React, { useState } from 'react';
import { RoomJoinContainer, JoinBox, Title, Input, Button, ErrorText } from '../styles/RoomJoinStyles';

function RoomJoin({ onJoinRoom }) {
    const [roomCode, setRoomCode] = useState('');
    const [username, setUsername] = useState(''); 
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!roomCode.match(/^[a-zA-Z0-9]{6,8}$/)) {
            setError('Room code must be 6-8 alphanumeric characters.');
            return;
        }
        if (username.trim() === '') {
            setError('Please enter a username.');
            return;
        }
        setError('');
        onJoinRoom(roomCode.toUpperCase(), username.trim());
    };

    return (
        <RoomJoinContainer>
            <JoinBox>
                <Title>Join or Create Whiteboard</Title>
                <Input
                    type="text"
                    placeholder="Enter Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={20} 
                />
                <Input
                    type="text"
                    placeholder="Enter Room Code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    maxLength={8}
                />
                <Button onClick={handleSubmit}>Go to Whiteboard</Button>
                {error && <ErrorText>{error}</ErrorText>}
            </JoinBox>
        </RoomJoinContainer>
    );
}

export default RoomJoin;