const multer = require('multer');
const DokumenModel = require('../models/dokumen');
const upload = require('../middleware/multer');

const getAllDokumen = async (req, res) => {
    try {
        const [data] = await DokumenModel.getAllDokumen();

        if (req.query.id) {
            const [data] = await DokumenModel.getAllDokumen(req.query.id);
            res.json({
                message: 'GET detail dokumen sukses',
                data: data[0]
            })
        }

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
    const { body } = req;
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

const uploadDokumen = async (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Terjadi kesalahan multer
            return res.status(400).json({
                message: 'Terjadi kesalahan saat mengunggah dokumen',
                error: err.message,
            });
        } else if (err) {
            // Terjadi kesalahan lainnya
            return res.status(500).json({
                message: 'Terjadi kesalahan saat mengunggah dokumen',
                error: err.message,
            });
        }

        const file = req.file;
        if (!file) {
            // Tidak ada file yang diunggah
            return res.status(400).json({
                message: 'Anda belum mengunggah dokumen',
            });
        }

        // Lakukan proses pengolahan file atau simpan path file dalam database
        // contoh:
        // const filePath = file.path;
        // ...
        // Tambahkan logika sesuai kebutuhan

        res.status(200).json({
            message: 'Dokumen berhasil diunggah',
            filename: file.filename,
            // data lain yang ingin Anda kirim sebagai respons
        });
    });
};

const getMyDokumen = async (req, res) => {
    try {
        if (req.query.idPic && req.query.idDok) {
            const [data] = await DokumenModel.myDokumen(req.query.idPic, req.query.idDok);
            res.json({
                message: 'GET My Dokumen Sukses',
                data: data[0]
            })
        }
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
    deleteDokumen,
    uploadDokumen,
    getMyDokumen
}