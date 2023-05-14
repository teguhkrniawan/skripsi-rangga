const DokumenModel = require('../models/dokumen');

const getAllDokumen = async (req, res) => {
    try {
        const [data] = await DokumenModel.getAllDokumen();
    
        res.json({
            message: 'GET all dokumen success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

module.exports = {
    getAllDokumen
}