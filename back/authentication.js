const jwt = require('jsonwebtoken');
const {PASSWORD} = require('./password.js')


async function authMiddleware (req ,res , next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(409).json({})
    }
    const token = authHeader.split(' ')[1];

    console.log("in the auth")

    try {
        const decoded = jwt.verify(token , PASSWORD )
         
        req.userId = decoded.userId;
        console.log("verified ");
        next()
    } catch (error) {

        return res.status(411).json({err : error})
    }

    
}

module.exports ={
    authMiddleware
}