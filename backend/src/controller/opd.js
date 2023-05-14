const OpdMoedel = require('../models/opd');

const getAllOpd = async (req, res) => {
    try {

        const id_opd = req.query.id_opd;

        let [data] = await OpdMoedel.getAllOpd();

        if (id_opd) {
            const [data] = await OpdMoedel.getAllOpd(id_opd);
            return res.json({
                message: 'GET all opd success',
                data: data[0]
            })
        }

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

const insertOpd = async (req, res) => {
    try {
        const body = {
            nama_opd: req.body.nama_opd,
            singkatan_opd: req.body.singkatan_opd
        }

        const [data] = await OpdMoedel.insertOpd(body)
            .catch((err) => {
                console.log(err)
                return [];
            })

        if (!data || data.length === 0) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }

        res.status(200).json({
            message: "Success Insert OPD",
            data: []
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error ? error : "Something went wrong",
        })
    }
}

const updateOpd = async (req, res) => {
    try {
        const body = {
            id_opd: req.body.id_opd,
            nama_opd: req.body.nama_opd,
            singkatan_opd: req.body.singkatan_opd
        }

        const [data] = await OpdMoedel.updateOpd(body)
            .catch((err) => {
                console.log(err)
                return [];
            })

        if (!data || data.length === 0) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }

        res.status(200).json({
            message: "Success Update OPD",
            data: []
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error ? error : "Something went wrong",
        })
    }
}

const deleteOpd = async (req, res) => {
    try {
        const id_opd = req.body.id_opd
        const [data] = await OpdMoedel.deleteOpd(id_opd)
            .catch((err) => {
                console.log(err)
                return [];
            })

        if (!data || data.length === 0) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }

        res.status(200).json({
            message: "Success Delete OPD",
            data: []
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error ? error : "Something went wrong",
        })
    }
}

module.exports = {
    getAllOpd,
    insertOpd,
    updateOpd,
    deleteOpd
}