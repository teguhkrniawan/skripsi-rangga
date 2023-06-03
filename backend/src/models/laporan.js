const dbPool = require('../config/database');
const moment = require('moment');

const insertLaporan = (body) => {

    const tanggalUpload = moment().format('YYYY-MM-DD');

    const SQLQuery = `  INSERT INTO tbl_laporan(id_dokumen, nama_file_dokumen, tanggal_upload, id_pic) VALUES ('${body.id_dokumen}', '${body.nama_file_dokumen}', '${tanggalUpload}', '${body.id_pic}')`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    insertLaporan
}