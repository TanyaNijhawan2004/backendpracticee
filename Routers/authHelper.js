const jwt = require('jsonwebtoken');
const JWT_KEY=require('../secrets');

function protectRoute(req,res,next){
    if(req.cookies.login){
        let isVerified=jwt.verify(req.cookies.login,JWT_KEY);
        if(isVerified){
            next();
        }
        else{
            res.json({
                message:"user not verified"
            })
        }
    }
    else{
        res.json({
            message:"you are not authorised"
        })
    }
}
module.exports=protectRoute;