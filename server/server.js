const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');
const { PORT , CLIENT_URL} = require('./config/serverConfig');
const roomRoutes = require('./routes/roomRoutes');
const initializeSocket = require('./socket/index');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: CLIENT_URL,
        methods: ['GET', 'POST']
    }
});

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/rooms', roomRoutes);
initializeSocket(io);

app.listen(PORT, () => {
    console.log(`Server is started at port ${PORT}`);
})
