const dbPool = require('../config/database');
const moment = require('moment');

const insertLaporan = (body) => {

    const tanggalUpload = moment().format('YYYY-MM-DD');

    const SQLQuery = `  INSERT INTO tbl_laporan(id_dokumen, nama_file_dokumen, tanggal_upload, id_pic, id_opd) VALUES ('${body.id_dokumen}', '${body.nama_file_dokumen}', '${tanggalUpload}', '${body.id_pic}', '${body.id_opd}')`;
    return dbPool.execute(SQLQuery);
}

const getAllLaporan = (req) => {
    const SQLQuery = `SELECT c.id_opd, c.nama_opd, COUNT(c.id_opd) AS jumlah
    FROM tbl_laporan a
    LEFT JOIN tbl_pic b ON a.id_pic = b.id_pic
    LEFT JOIN tbl_opd c ON b.id_opd = c.id_opd
    GROUP BY  c.id_opd, c.nama_opd;`;
    return dbPool.execute(SQLQuery);
}

const getLaporanByOpd = (req) => {
    const SQLQuery =  `SELECT * FROM tbl_laporan LEFT JOIN tbl_dokumen ON tbl_dokumen.id_dokumen = tbl_laporan.id_dokumen WHERE id_opd = '${req}'`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    insertLaporan,
    getAllLaporan,
    getLaporanByOpd
}