const dbPool = require('../config/database');

const getAllIndikator = () => {
    const SQLQuery = 'SELECT * FROM tbl_indikator';

    return dbPool.execute(SQLQuery);
}

const insertIndikator = (body) => {
    const SQLQuery = `  INSERT INTO tbl_indikator (nama_indikator, deskripsi, tahun) 
    VALUES ('${body.nama_indikator}', '${body.deskripsi}', '${body.tahun}')`;

    return dbPool.execute(SQLQuery);
}

const updateIndikator = (body) => {
    const SQLQuery = `UPDATE tbl_indikator SET nama_indikator = '${body.nama_indikator}', deskripsi = '${body.deskripsi}', tahun = '${body.tahun}' WHERE id_indikator = '${body.id_indikator}'`;
    return dbPool.execute(SQLQuery);
}

const deleteIndikator = (idIndikator) => {
    const SQLQuery = `DELETE FROM tbl_indikator WHERE id_indikator=${idIndikator}`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllIndikator,
    insertIndikator,
    updateIndikator,
    deleteIndikator
}