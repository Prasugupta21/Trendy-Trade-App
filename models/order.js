const {Schema,model}=require('mongoose');

const orderSchema=new Schema({
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:'product'
        }
    ],
    payment:{},
    buyer:{
        type:Schema.Types.ObjectId,
        ref:'user'

    },
    status:{
        type:String,
        default:'Not Process',
        enum:['Not Process' ,'Processing','Shipped','delivered','cancel'],


    }

},{timestamps:true});
const Order=model('order',orderSchema);
module.exports= Order;