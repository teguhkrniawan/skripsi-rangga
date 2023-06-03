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

module.exports = {
    insertLaporan
}
