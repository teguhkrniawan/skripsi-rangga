const OpdMoedel = require('../models/opd');

const getAllOpd = async (req, res) => {
    try {
        const [data] = await OpdMoedel.getAllOpd();
    
        res.json({
            message: 'GET all opd success',
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
    getAllOpd
}