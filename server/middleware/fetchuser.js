let jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {

    // get the user from jwt token and add id to req-object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: 'token please authenticate using a vaild token'});
    }

    try{
        const data = jwt.verify(token, jwt_secret);
        req.empid = data.user;
        next();

    } catch(error){
        res.status(401).send({error:'catch please authenticate using a vaild token'});
    }

}

module.exports = fetchuser;