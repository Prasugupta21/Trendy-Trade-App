const jwt=require('jsonwebtoken');
const User=require('../models/user');

// token validation 
const requireSignIn=async(req,res,next)=>{
    try {
        const decode=jwt.verify(req.headers.authorization,process.env.SECRET);
        
        req.user=decode;
        
            next();
    } catch (error) {
        console.log(error);
    }
}


//admin access

const isAdmin=async (req,res,next)=>{
    try {
    
     const user=await User.findById(req.user._id);
     if(user.role!==1){
        return res.status(401).send({
            message:'UnAuthorized Access ',
            success:false
        })
     }   else{
        next();
     }
    } catch (error) {
        console.log(error);
      return   res.status(401).send({
            message:'Error in admin middleware'
        })
    }
}
module.exports={
    requireSignIn,isAdmin
}