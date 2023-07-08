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
    const SQLQuery = `SELECT * FROM tbl_laporan LEFT JOIN tbl_dokumen ON tbl_dokumen.id_dokumen = tbl_laporan.id_dokumen WHERE id_opd = '${req}'`;
    return dbPool.execute(SQLQuery);
}

const exportLaporan = (req) => {
    // const SQLQuery = `select id_opd , nama_opd,  
    // (select count(id_laporan) from tbl_laporan tl where id_opd = to2.id_opd) as jumlah_upload,
    // (select count(id_dokumen) from tbl_dokumen td) as jumlah_dokumen,
    // CASE
    //     WHEN (SELECT COUNT(id_laporan) FROM tbl_laporan tl WHERE tl.id_opd = to2.id_opd) < (SELECT COUNT(id_dokumen) FROM tbl_dokumen td)
    //     THEN 'belum lengkap'
    //     ELSE 'lengkap'
    // END as status
    // from tbl_opd to2`;

    const SQLQuery = `
    SELECT id_dokumen, id_opd,
        (SELECT nama_opd FROM tbl_opd WHERE id_opd = a.id_opd) as nama_opd,
        (SELECT nama_dokumen FROM tbl_dokumen WHERE id_dokumen = a.id_dokumen) as nama_dokumen,
        (SELECT nama_indikator FROM tbl_indikator JOIN tbl_dokumen ON tbl_indikator.id_indikator = tbl_dokumen.id_indikator WHERE tbl_dokumen.id_dokumen = a.id_dokumen) as nama_indikator,
        DATE(tanggal_upload) as tanggal
    FROM tbl_laporan a`;

    return dbPool.execute(SQLQuery);
}

const getLaporanBelumLengkap = async (req) => {
    const SQLQuery = `
        SELECT a.id_opd, c.nama_dokumen, c.id_indikator,
            (SELECT nama_opd FROM tbl_opd WHERE id_opd = a.id_opd) as nama_opd,
            (SELECT nama_indikator FROM tbl_indikator WHERE id_indikator = c.id_indikator) as nama_indikator
        FROM tbl_opd AS a
        CROSS JOIN tbl_dokumen AS c
        WHERE a.id_opd IN (
        SELECT b.id_opd
        FROM tbl_opd AS b
        LEFT JOIN tbl_laporan AS l ON b.id_opd = l.id_opd
        WHERE l.id_opd IS NULL
        )
        ORDER BY a.id_opd ASC;
    `;

    return dbPool.execute(SQLQuery);
}


module.exports = {
    insertLaporan,
    getAllLaporan,
    getLaporanByOpd,
    exportLaporan,
    getLaporanBelumLengkap
}