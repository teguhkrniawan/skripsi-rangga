const dbPool = require('../config/database');

const getAllDokumen = () => {
    const SQLQuery = 'SELECT * FROM tbl_dokumen JOIN tbl_indikator ON tbl_indikator.id_indikator = tbl_indikator.id_indikator';

    return dbPool.execute(SQLQuery);
}


module.exports = {
    getAllDokumen,
}