const jwt = require('jsonwebtoken');
const key = 'Ayuba';

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userdata = decoded ;
        next();
    }catch(err){
        return res.status(402).json({
            message : 'Auth failed',
            err
        })
    }

    
}