var jwt = require('jsonwebtoken')

const fetchUser = (req , res, next)=>{
    const JWT_SECRET = 'hehe'
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
       res.status(401).send({error:"please authenticate using a valid token error by catch"})
    
   } 
}


module.exports = fetchUser;