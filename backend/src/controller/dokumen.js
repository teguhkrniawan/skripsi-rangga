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

const insertDokumen = async (req, res) => {
    try {
        await DokumenModel.insertDokumen(req.body);
        res.json({
            message: "Dokumen sukses di insert"
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const updateDokumen = async (req, res) => {
    const {body} = req;
    try {
        await DokumenModel.updateDokumen(body);
        res.json({
            message: 'UPDATE dokumen success',
            data: {
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const deleteDokumen = async (req, res) => {
    const id_dokumen = req.body.id_dokumen;
    try {
        await DokumenModel.deleteDokumen(id_dokumen)
        res.json({
            message: 'DELETE Dokumen sukses',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

module.exports = {
    getAllDokumen,
    insertDokumen,
    updateDokumen,
    deleteDokumen
}