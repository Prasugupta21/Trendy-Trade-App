const {Schema,model}=require('mongoose');

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    
    answer:{
        type:String,
        required:true
       
    },
    role:{
        type:Number,
        default:0
    },
},{timestamps:true})

const User=model('user',userSchema);
module.exports=User;