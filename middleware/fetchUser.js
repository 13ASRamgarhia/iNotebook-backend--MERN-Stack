const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path: '../CONFIG.env'})
const SECRET_KEY = process.env.SECRET_KEY

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token){
        return res.status(400).send({message: 'Token not available'});
    }

    try{
        const data = jwt.verify(token, SECRET_KEY);
        req.user = data._id;

        next()
    }
    catch(error){
        res.status(400).send({message: 'Error occured'});
    }

}

module.exports = fetchUser;