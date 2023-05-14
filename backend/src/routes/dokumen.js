const express = require('express');

const DokumenController = require('../controller/dokumen.js');

const router = express.Router();

// READ - GET
router.get('/', DokumenController.getAllDokumen);

module.exports = router;