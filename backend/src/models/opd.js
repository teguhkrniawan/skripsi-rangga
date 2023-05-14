const dbPool = require('../config/database');

const getAllOpd = (id_opd) => {

    let SQLQuery = 'SELECT * FROM tbl_opd';

    if(id_opd){
        SQLQuery = `SELECT * FROM tbl_opd WHERE id_opd = ${id_opd}`
    }

    return dbPool.execute(SQLQuery);
}

const insertOpd = (body) => {
    const nama_opd = body.nama_opd;
    const singkatan_opd = body.singkatan_opd;

    const SQLQuery = `  INSERT INTO tbl_opd (nama_opd, singkatan_opd) 
    VALUES ('${nama_opd}', '${singkatan_opd}')`;

    return dbPool.execute(SQLQuery);
}

const updateOpd = (body) => {
    const id_opd = body.id_opd
    const nama_opd = body.nama_opd
    const singkatan_opd = body.singkatan_opd

    const SQLQuery = `UPDATE tbl_opd SET nama_opd = '${nama_opd}', singkatan_opd = '${singkatan_opd}' WHERE id_opd = '${id_opd}'`;
    return dbPool.execute(SQLQuery);
}

const deleteOpd = (id_opd) => {
    const SQLQuery = `DELETE FROM tbl_opd WHERE id_opd = ${id_opd}`
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllOpd,
    insertOpd,
    updateOpd,
    deleteOpd
}