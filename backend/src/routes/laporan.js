const express = require('express');

const LaporanController = require('../controller/laporan.js');

const router = express.Router();

// READ - GET
router.post('/add', LaporanController.insertLaporan);

module.exports = router;