const {Schema,model}=require('mongoose');
const mongoose=require('mongoose');
const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'category',
     
   
       
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
     data:Buffer,
     contentType:String
    },
    shipping:{
        type:Boolean
    }
   
},{timestamps:true})

const Product=model('product',productSchema);
module.exports=Product;