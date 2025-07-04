
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { WhiteboardContainer, UserCountDisplay, ConnectionStatus, StatusDot } from '../styles/WhiteboardStyles';
import DrawingCanvas from './DrawingCanvas';
import Toolbar from './Toolbar';
import UserCursors from './UserCursors';

function Whiteboard({ roomId, socket, username }) {
    const canvasRef = useRef(null);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [remoteCursors, setRemoteCursors] = useState({});
    const [userCount, setUserCount] = useState(1);
    const [isConnected, setIsConnected] = useState(socket.connected);

    const drawingContextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            drawingContextRef.current = ctx;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const handleResize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (!socket) return;

        const onConnect = () => setIsConnected(true);
        const onDisconnect = () => setIsConnected(false);
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        socket.on('cursor-move', ({ id, x, y, user }) => { 
            setRemoteCursors((prev) => ({
                ...prev,
                [id]: { x, y, user, lastActivity: Date.now() }, 
            }));
        });

        socket.on('draw-start', ({ id, x, y, color, width }) => {
            const ctx = drawingContextRef.current;
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.strokeStyle = color;
                ctx.lineWidth = width;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
            }
        });

        socket.on('draw-move', ({ id, x, y }) => {
            const ctx = drawingContextRef.current;
            if (ctx) {
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        });

        socket.on('draw-end', () => {
            const ctx = drawingContextRef.current;
            if (ctx) {
                ctx.closePath();
            }
        });

        socket.on('clear-canvas', () => {
            const ctx = drawingContextRef.current;
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        });

        socket.on('load-drawing', (drawingData) => {
            const ctx = drawingContextRef.current;
            if (ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                drawingData.forEach(command => {
                    if (command.type === 'stroke') {
                        ctx.beginPath();
                        ctx.moveTo(command.data.path[0].x, command.data.path[0].y);
                        ctx.strokeStyle = command.data.color;
                        ctx.lineWidth = command.data.width;
                        ctx.lineCap = 'round';
                        ctx.lineJoin = 'round';
                        for (let i = 1; i < command.data.path.length; i++) {
                            ctx.lineTo(command.data.path[i].x, command.data.path[i].y);
                        }
                        ctx.stroke();
                        ctx.closePath();
                    } else if (command.type === 'clear') {
                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    }
                });
            }
        });

        socket.on('user-count-update', (count) => {
            setUserCount(count);
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('cursor-move');
            socket.off('draw-start');
            socket.off('draw-move');
            socket.off('draw-end');
            socket.off('clear-canvas');
            socket.off('load-drawing');
            socket.off('user-count-update');
        };
    }, [socket]);

    const throttledCursorMove = useCallback(
        (e) => {
            if (socket && isConnected) {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                socket.emit('cursor-move', { x, y, user: username });
            }
        },
        [socket, isConnected, username] 
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setRemoteCursors(prev => {
                const newCursors = {};
                for (const id in prev) {
                    if (now - prev[id].lastActivity < 2000) {
                        newCursors[id] = prev[id];
                    }
                }
                return newCursors;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const handleClearCanvas = () => {
        if (socket) {
            socket.emit('clear-canvas', roomId);
        }
    };

    return (
        <WhiteboardContainer onMouseMove={throttledCursorMove}>
            <Toolbar
                strokeWidth={strokeWidth}
                setStrokeWidth={setStrokeWidth}
                strokeColor={strokeColor}
                setStrokeColor={setStrokeColor}
                onClearCanvas={handleClearCanvas}
            />
            <DrawingCanvas
                canvasRef={canvasRef}
                socket={socket}
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                drawingContextRef={drawingContextRef}
            />
            <UserCursors cursors={remoteCursors} currentUserId={socket.id} currentUsername={username} />
            <UserCountDisplay>
                Active Users: {userCount}
            </UserCountDisplay>
            <ConnectionStatus>
                <StatusDot connected={isConnected} />
                {isConnected ? 'Connected' : 'Reconnecting...'}
            </ConnectionStatus>
        </WhiteboardContainer>
    );
}

export default Whiteboard;