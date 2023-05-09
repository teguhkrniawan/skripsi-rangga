const UsersModel = require('../models/users');

const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const [ data ] = await UsersModel.login(email, password)
                                .catch((err) => {
                                    console.log(err)
                                    return [];
                                })
        // console.log(data)

        if(!data || data.length === 0){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        res.status(200).json({
            message: "Success Login",
            data: data
        })
 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error ? error : "Something went wrong",
        })
    }
}


module.exports = {
    login
}