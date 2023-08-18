const express=require('express');
const { requireSignIn, isAdmin } = require('../middlewares/auth');
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFilter, countProductController, ProductListController, searchProduct, braintreeTokenController, braintreePaymentController } = require('../controllers/product');
const formidableMiddleware = require('express-formidable');
const router=express.Router();

router.post('/create-product',requireSignIn,isAdmin,formidableMiddleware(),createProductController)

// get  All Products
router.get('/get-product',getProductController)


//get Single Product
router.get('/get-product/:slug',getSingleProductController);

//get Photo

router.get("/product-photo/:pid",productPhotoController);

//update Product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidableMiddleware(),updateProductController)


//delete

router.delete('/delete-product/:pid',deleteProductController);

//filter Product

router.post("/product-filters",productFilter);
//count product

router.get('/product-count',countProductController);

//product-per page
router.get('/product-list/:page',ProductListController);

//searching Product

router.get('/search/:keyword',searchProduct);


// Payment routes

//token
router.get('/braintree/token',braintreeTokenController)

//payments

router.post('/braintree/payment',requireSignIn,braintreePaymentController)


module.exports=router;