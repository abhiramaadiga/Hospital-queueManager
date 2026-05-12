const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {type: String , require: true},
    age: { type: Number , required: true},
    complaint: { type: String, required: true},
    severity: { 
        type: String,
        enum: ['Critical', 'Moderate', 'Mild' ],
        required: true
    },

    priorityScore: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['Waiting', 'Served'],
        default: 'Waiting'
    },
    
    arrivedAt: {type: Date, default: Date.now},
    servedAt: {type: Date}
});

module.exports = mongoose.model('Patient', patientSchema);