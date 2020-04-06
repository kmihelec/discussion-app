const jwt = require('jsonwebtoken');

const auth = async (req,res,next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET);
        req.token = token;
        req.user = decoded.user;
        req.id = decoded.id;
        next()
    } catch (e) {
        console.log(e);
        res.status(403).send({error:'Bad token'})
    }
};

module.exports = auth;