const Room = require('../models/Room');

const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('join-room', async ({ roomId, username }) => {
            let room = await Room.findOne({ roomId });
            if (!room) {
                room = new Room({ roomId, drawingData: [] });
                await room.save();
                console.log(`Created new room: ${roomId}`);
            }
            socket.join(roomId);
            socket.roomId = roomId;
            socket.username = username;
            console.log(`${socket.id} (${username}) joined room: ${roomId}`);

            if (room.drawingData && room.drawingData.length > 0) {
                socket.emit('load-drawing', room.drawingData);
            }

            const clientsInRoom = io.sockets.adapter.rooms.get(roomId);
            const numUsers = clientsInRoom ? clientsInRoom.size : 0;
            io.to(roomId).emit('user-count-update', numUsers);
        });

        socket.on('cursor-move', (data) => {
            socket.to(socket.roomId).emit('cursor-move', {
                id: socket.id,
                x: data.x,
                y: data.y,
                user: socket.username
            });
        });

        socket.on('draw-start', (data) => {
            socket.to(socket.roomId).emit('draw-start', { id: socket.id, ...data });
        });

        socket.on('draw-move', (data) => {
            socket.to(socket.roomId).emit('draw-move', { id: socket.id, ...data });
        });

        socket.on('draw-end', (data) => {
            socket.to(socket.roomId).emit('draw-end', { id: socket.id, ...data });
            if (socket.roomId && data.drawingCommand) {
                data.drawingCommand.data.drawnBy = socket.username;
                Room.findOneAndUpdate(
                    { roomId: socket.roomId },
                    { $push: { drawingData: data.drawingCommand }, lastActivity: new Date() },
                    { new: true }
                ).catch(err => console.error("Error saving drawing data:", err));
            }
        });

        socket.on('clear-canvas', async () => {
            io.to(socket.roomId).emit('clear-canvas');
            if (socket.roomId) {
                await Room.findOneAndUpdate(
                    { roomId: socket.roomId },
                    { drawingData: [], lastActivity: new Date() }
                );
            }
        });

        socket.on('disconnect', async () => {
            console.log(`User disconnected: ${socket.id} (${socket.username || 'unknown'})`);
            if (socket.roomId) {
                setTimeout(() => {
                    const clientsInRoom = io.sockets.adapter.rooms.get(socket.roomId);
                    const numUsers = clientsInRoom ? clientsInRoom.size : 0;
                    io.to(socket.roomId).emit('user-count-update', numUsers);
                }, 100);
            }
        });
    });
};

module.exports = initializeSocket;