const dbPool = require('../config/database');

const getAllUsers = (id_user) => {
    let SQLQuery = `SELECT * FROM tbl_pic JOIN tbl_opd ON tbl_opd.id_opd = tbl_pic.id_opd WHERE roles = 'user'`;

    if(id_user){
        SQLQuery += ` WHERE tbl_pic.id_pic = ${id_user}`
    }

    return dbPool.execute(SQLQuery);
}

const createNewUser = (body) => {
    const SQLQuery = `  INSERT INTO tbl_pic (nama_pic, id_opd, nip, no_hp, email, password, status_aktif) 
                        VALUES ('${body.nama_pic}', '${body.id_opd}', '${body.nip}', '${body.no_hp}', '${body.email}', '${body.password}', '${body.status_aktif}')`;

    return dbPool.execute(SQLQuery);
}

const updateUser = (body) => {
    const SQLQuery = `  UPDATE tbl_pic 
                        SET nama_pic='${body.nama_pic}', id_opd='${body.id_opd}', nip='${body.nip}', no_hp='${body.no_hp}', email='${body.email}', status_aktif='${body.status_aktif}'
                        WHERE id_pic=${body.id_pic}`;

    return dbPool.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM tbl_pic WHERE id_pic=${idUser}`;

    return dbPool.execute(SQLQuery);
}

const login = (email, password) => {
    const SQLQuery = `SELECT * FROM tbl_pic WHERE email='${email}' AND password='${password}'`;
    return dbPool.execute(SQLQuery)
                .then(([rows]) => {
                    if(rows.length == 0){
                        throw new Error("Invalid email or password")
                    }
                    return rows;
                });
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    login
}