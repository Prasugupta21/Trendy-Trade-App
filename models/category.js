const {Schema,model}=require('mongoose');

const categorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }
});
const Category=model('category',categorySchema);
module.exports= Category;