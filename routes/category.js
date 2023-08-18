const express=require('express');
const { requireSignIn, isAdmin } = require('../middlewares/auth');
const { createCategoryController, updateaCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../controllers/category');
const router=express.Router();

router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

//Updation
router.put('/update-category/:id',requireSignIn,isAdmin,updateaCategoryController);

//get All Category

router.get('/get-category',categoryController)

//get single Category

router.get('/single-category/:slug',singleCategoryController);


//delete Category

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)
module.exports=router;