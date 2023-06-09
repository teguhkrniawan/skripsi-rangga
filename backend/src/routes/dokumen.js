const express = require('express');

const DokumenController = require('../controller/dokumen.js');

const router = express.Router();

// READ - GET
router.get('/', DokumenController.getAllDokumen);
router.post('/add', DokumenController.insertDokumen);
router.post('/update', DokumenController.updateDokumen);
router.post('/delete', DokumenController.deleteDokumen);
router.post('/upload', DokumenController.uploadDokumen);
router.get('/mydokumen', DokumenController.getMyDokumen);

module.exports = router;