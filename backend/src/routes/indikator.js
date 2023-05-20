const express = require('express');

const IndikatorController = require('../controller/indikator.js');

const router = express.Router();

// READ - GET
router.get('/', IndikatorController.getAllIndikator);
router.post('/add', IndikatorController.insertIndikator);
router.post('/update', IndikatorController.updateIndikator);
router.post('/delete', IndikatorController.deleteIndikator);

module.exports = router;