const Product = require("../models/product");
const slugify =require('slugify');
const fs=require('fs');
const braintree = require("braintree");
const Order = require("../models/order");

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
  });


const createProductController=async (req,res)=>{
    try {
      
const {name,description,quantity,price}=req.fields;


const {photo}=req.files;

//validation

switch(true){
    case (!name):
  
        return res.status(500).send({error:'Name is required '});
    case(!description):
        return res.status(500).send({error:'description is required '});
    case(!quantity):
        return res.status(500).send({error:'quantity is required '});
    case(!price):
        return res.status(500).send({error:'price is required '});

   

    case photo && photo.size>1000000:
        return res.status(500).send({error:'Photo is required and should be less than 1 MB'})
}
const  products= new Product({
    ...req.fields,
    slug:slugify(name)
})
if(photo){
    products.photo.data=fs.readFileSync(photo.path);
    products.photo.contentType=photo.type
}
await products.save();
return res.status(201).send({
    message:'Product created Successfully',
    success:true,
    products
})

    } catch (error) {
        console.log(error);
       return res.status(500).send({
        message:'Error in creating Products',
        error,
        success:false
       }) 
    }
}

//get All products

const getProductController=async (req,res)=>{
    try {
        const products=await Product.find({}).
        populate('category').
        select('-photo')
        .limit(12)
        .sort({createdAt:-1})
       ;
        return res.status(200).send({
            message:'Getting All products',
          products,
            success:true,
            total:products.length
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
         message:'Error in getting Products',
         error:error.message,
         success:false
        }) 
    }
}
const getSingleProductController=async (req,res)=>{
    try {
        const product=await Product.findOne({slug:req.params.slug}).select("-photo").populate('category');
        return res.status(200).send({
            message:'Getting Single products',
          product,
            success:true,
          
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
         message:'Error in getting Single Products',
         error:error.message,
         success:false
        }) 
    }
}

const productPhotoController=async (req,res)=>{
    try {
        const product=await Product.findById(req.params.pid).select('photo');
        if(product.photo.data){
          res.set('Content-type',product.photo.contentType);
            return res.status(200).send(
                product.photo.data
                
            )
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
         message:'Error in getting Photo',
         error:error.message,
         success:false
        }) 
    }
}

//delete Product

const deleteProductController=async(req,res)=>{
try {
    await Product.findByIdAndDelete(req.params.pid).select('-photo');
    return res.status(200).send({
        message:'Product deleted Succesfully',
     
        success:true,
    })
} catch (error) {
    console.log(error);
    return res.status(500).send({
     message:'Error in deleting Product',
     error:error.message,
     success:false
    }) 
}
}

//updation of product 

const updateProductController=async (req,res)=>{
    try {
        const {name,description,quantity,shipping,price}=req.fields;
        const {photo}=req.files;
        
        //validation
        
        switch(true){
            case (!name):
                return res.status(500).send({error:'Name is required '});
            case(!description):
                return res.status(500).send({error:'description is required '});
            case(!quantity):
                return res.status(500).send({error:'quantity is required '});
            case(!price):
                return res.status(500).send({error:'price is required '});
            
        
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is required and should be less than 1 MB'})
        }
        const  products=await Product.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path);
            products.photo.contentType=photo.type
        }
        await products.save();
        return res.status(201).send({
            message:'Product Updated Successfully',
            success:true,
            
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
         message:'Error in Updating Product',
         error:error.message,
         success:false
        }) 
    }
}

const productFilter=async (req,res)=>{
    try {
        const {radio}=req.body;
        var args={};
        if(radio.length)args.price={$gte:radio[0],$lte:radio[1]}
        const products=await Product.find(args);
        return res.status(200).send({
            success:true,
            products
        })
        

        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
         message:'Error in Filtering Product',
         error:error.message,
         success:false
        }) 
    }
}

//count Products
const countProductController=async(req,res)=>{
    try {
        const total=await Product.find({}).estimatedDocumentCount();
        return res.status(200).send({
            success:true,
            total
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
         message:'Error in Counting Product',
         error:error.message,
         success:false
        }) 
    }
}


//product list base on pages

const ProductListController=async(req,res)=>{
    try {
      const perPage=6;
      const   page=req.params.page ?req.params.page:1;
      const products=await Product.find({}).select('-photo').skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
      return res.status(200).send({
        success:true,
        products
    })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
         message:'Error in per page Product',
         error:error.message,
         success:false
        }) 
    }
}

const searchProduct=async(req,res)=>{
    try {
      const {keyword}=req.params;
      const result=await Product.find({
        $or:[
            {name:{$regex:keyword,$options:'i'}},
            {description:{$regex:keyword,$options:'i'}}
        ]
      }).select('-photo');
console.log(result);
      return res.status(200).send({
        success:true,
        result
      })
      } catch (error) {
          console.log(error);
          return res.status(400).send({
           message:'Error in Searching Product',
           error:error.message,
           success:false
          }) 
      }
}


//payment gatway api

//token
const braintreeTokenController =async(req,res)=>{
    try {
        gateway.clientToken.generate({},(function(response,error){
            if(error)return res.send(error);
            if (response) return res.send(response);
        }));
    } catch (error) {
        console.log(error);
        return res.status(400).send({
         message:'Error in  token Payment ',
         error:error.message,
         success:false
        }) 
    }
}

//payment 
const braintreePaymentController =async(req,res)=>{
    try {
const {cart,nonce}=req.body;
let total=0;
cart.map((i)=>{total+=i.price});
let newTransaction=gateway.transaction.sale({
    amount:total,
    paymentMethodNonce:nonce,
    options:{
        submitForSettlement:true
    }
},
 function (error,result){
    if(error){
        console.log(error);
        return;
    }
    if(result.success){
        const order=new Order({
            products:cart,
            payment:result,
            buyer:req.user._id,

        }).save();
        return res.status(200).send({message:'Payment Successfully'});
     
    }
    else{
        return res.status(500).send(error);

    }
}
)

     
    } catch (error) {
        console.log(error);
        return res.status(400).send({
         message:'Error in Payment ',
         error:error.message,
         success:false
        }) 
    }
}



module.exports={
    createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController,
    productFilter,
    countProductController,
    ProductListController,
    searchProduct,
    braintreeTokenController,
    braintreePaymentController
    
}