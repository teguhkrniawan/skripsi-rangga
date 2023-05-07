const dbPool = require('../config/database');

const getAllOpd = () => {
    const SQLQuery = 'SELECT * FROM tbl_opd';

    return dbPool.execute(SQLQuery);
}


module.exports = {
    getAllOpd,
}