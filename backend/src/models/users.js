const dbPool = require('../config/database');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM tbl_pic JOIN tbl_opd ON tbl_opd.id_opd = tbl_pic.id_opd';

    return dbPool.execute(SQLQuery);
}

const createNewUser = (body) => {
    const SQLQuery = `  INSERT INTO users (name, email, address) 
                        VALUES ('${body.name}', '${body.email}', '${body.address}')`;

    return dbPool.execute(SQLQuery);
}

const updateUser = (body, idUser) => {
    const SQLQuery = `  UPDATE users 
                        SET name='${body.name}', email='${body.email}', address='${body.address}' 
                        WHERE id=${idUser}`;

    return dbPool.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;

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