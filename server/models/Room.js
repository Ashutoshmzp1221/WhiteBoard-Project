const mongoose = require('mongoose');

const DrawingCommandSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true 
    },
    data: { 
        type: Object, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

const RoomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        uppercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActivity: {
        type: Date,
        default: Date.now
    },
    drawingData: [DrawingCommandSchema]
});

module.exports = mongoose.model('Room', RoomSchema);