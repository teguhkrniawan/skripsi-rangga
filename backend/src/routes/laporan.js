const express = require('express');

const LaporanController = require('../controller/laporan.js');

const router = express.Router();

// READ - GET
router.post('/add', LaporanController.insertLaporan);
router.get('/all', LaporanController.getAllLaporan);
router.get('/byopd', LaporanController.getLaporanByOpd);
router.get('/export', LaporanController.getExportLaporan);
router.get('/export2', LaporanController.getLaporanBelum);

module.exports = router;