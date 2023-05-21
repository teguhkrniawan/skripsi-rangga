const IndikatorModel = require('../models/indikator');

const getAllIndikator = async (req, res) => {
    try {

        const id_indikator = req.query.id_indikator;

        if (id_indikator) {
            const [data] = await IndikatorModel.getAllIndikator(id_indikator);
            return res.json({
                message: 'GET all indikator sukses',
                data: data[0]
            })
        }

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

const insertIndikator = async (req, res) => {
    try {
        await IndikatorModel.insertIndikator(req.body);
        res.json({
            message: "Indikator sukses di insert"
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const updateIndikator = async (req, res) => {
    const {body} = req;
    try {
        await IndikatorModel.updateIndikator(body);
        res.json({
            message: 'UPDATE indikator success',
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

const deleteIndikator = async (req, res) => {
    const id_indikator = req.body.id_indikator;
    try {
        await IndikatorModel.deleteIndikator(id_indikator)
        res.json({
            message: 'DELETE Indikator sukses',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}


module.exports = {
    getAllIndikator,
    insertIndikator,
    updateIndikator,
    deleteIndikator
}