const LaporanModel = require('../models/laporan');


const insertLaporan = async (req, res) => {
    try {
        await LaporanModel.insertLaporan(req.body);
        res.json({
            message: "Laporan sukses di insert"
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

/**
 * untuk ditampilkan di admin
 */
const getAllLaporan = async (req, res) => {
    try {
        const [data] = await LaporanModel.getAllLaporan(req.query)
        
        res.json({
            message: "Berhasil get all laporan",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

/**
 * untuk ditampilkan di detail setelah klik nama opd yang diketahui
 */
const getLaporanByOpd = async (req, res) => {
    try {
        const [data] = await LaporanModel.getLaporanByOpd(req.query.id_opd)
        res.json({
            message: "Berhasil get data dokumen opd",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

module.exports = {
    insertLaporan,
    getAllLaporan,
    getLaporanByOpd
}
