const express=require('express');
const router=express.Router();
const {registerController,LoginController,testController,forgetPasswordController, updateProfile, getOrderController} =require('../controllers/auth');
const{requireSignIn,isAdmin}=require('../middlewares/auth')
router.post('/register',registerController);
router.post('/login',LoginController);
router.get('/test',requireSignIn,isAdmin,testController);

// user Route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
// admin Route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
//update profile
router.put('/profile',requireSignIn,updateProfile);

router.post('/forget-password',forgetPasswordController);

//orders
router.get('/orders',requireSignIn,getOrderController);

module.exports=router;

