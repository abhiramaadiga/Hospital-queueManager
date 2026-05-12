const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/patientController');

router.post('/', ctrl.addPatient);
router.get('/queue', ctrl.getQueue);
router.put('/serve', ctrl.servePatient);
router.get('/history', ctrl.getHistory);
router.get('/analytics', ctrl.getAnalytics);

module.exports = router;