const IndikatorModel = require('../models/indikator');

const getAllIndikator = async (req, res) => {
    try {
        const [data] = await IndikatorModel.getAllIndikator();
    
        res.json({
            message: 'GET all indikator success',
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
    getAllIndikator
}