const dbPool = require('../config/database');

const getAllDokumen = () => {
    const SQLQuery = 'SELECT nama_dokumen, a.deskripsi, nama_indikator FROM tbl_dokumen AS a JOIN tbl_indikator AS b ON a.id_indikator = b.id_indikator';
    return dbPool.execute(SQLQuery);
}

const insertDokumen = (body) => {
    const SQLQuery = `  INSERT INTO tbl_dokumen (nama_dokumen, deskripsi, id_indikator) 
    VALUES ('${body.nama_dokumen}', '${body.deskripsi}', '${body.id_indikator}')`;
    return dbPool.execute(SQLQuery);
}

const updateDokumen = (body) => {
    const SQLQuery = `UPDATE tbl_dokumen SET nama_dokumen = '${body.nama_dokumen}', deskripsi = '${body.deskripsi}', id_indikator = '${body.id_indikator}' WHERE id_dokumen = '${body.id_dokumen}'`;
    return dbPool.execute(SQLQuery);
}

const deleteDokumen = (idDokumen) => {
    const SQLQuery = `DELETE FROM tbl_dokumen WHERE id_dokumen=${idDokumen}`;
    return dbPool.execute(SQLQuery);
}


module.exports = {
    getAllDokumen,
    insertDokumen,
    updateDokumen,
    deleteDokumen
}