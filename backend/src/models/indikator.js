const dbPool = require('../config/database');

const getAllIndikator = () => {
    const SQLQuery = 'SELECT * FROM tbl_indikator';

    return dbPool.execute(SQLQuery);
}


module.exports = {
    getAllIndikator,
}