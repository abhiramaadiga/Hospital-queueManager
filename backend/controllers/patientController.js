const Patient = require('../models/Patient');

// Map severity to a numeric score for heap sorting
const severityScore = { Critical: 3 , Moderate: 2, Mild: 1};

// Add new patient to queue
exports.addPatient = async (req, res) => {
    try {
        const { name, age, complaint, severity} = req.body;
        const patient = new Patient({
            name , age , complaint, severity,
            priorityScore: severityScore[severity]

        });
        await patient.save();
        res.status(201).json(patient);
        } catch (err){
            res.status(500).json({error: err.message});
        }
};

// Get all WaITING patients sorted by priority(MAX Heap)
exports.getQueue = async (req, res) => {
    try {
        const queue = await Patient
             .find({ status: 'Waiting'})
             .sort({ priorityScore: -1, arrivedAt: 1});
              //Higher priority first ,then arrival time

              res.json(queue);
    } catch (err) {
        res.status(500).json({ error: err.message});

    }
};

// Serving the next patient 
exports.servePatient = async (req, res) => {
    try {
        const patient = await Patient
            .findOne({ status: 'Waiting'})
            .sort({priorityScore: -1, arrivedAt: 1});

        if (!patient) return res.status(404).json({ message: 'Queue is empty '});
        patient.status = 'Served';
        patient.servedAt = new Date();
        await patient.save();
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all served patient (history log)
exports.getHistory = async (req, res ) => {
    try {
        const history = await Patient
            .find({ status: 'Served'})
            .sort({ servedAt: -1});
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message});

    }

};

// Analytics data
exports.getAnalytics = async (req, res) => {
    try {
        const total = await Patient.countDocuments();
        const critical = await Patient.countDocuments({ severity: 'Critical'});
        const moderate = await Patient.countDocuments({ severity: 'Moderate'});
        const mild = await Patient.countDocuments({ severity: 'Mild'});
        const served = await Patient.countDocuments({ status: 'Served'});

        res.json ({ total, critical, moderate, mild, served });

    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

