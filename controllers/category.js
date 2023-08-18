const Category = require("../models/category");
const slugify=require('slugify');

const createCategoryController= async (req,res)=>{
try {
    const {name}=req.body;
    if(!name){
        return res.status(401).send({
            success:false,
            message:'Name is required',
          
        });
    }

  
    const  existingCategory=await Category.findOne({name});
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:'Category Already Exits',
          
        });
    }
    const category=await new Category({
        name,slug:slugify(name)
    }).save();
    return res.status(201).send({
        success:true,
        message:'Category Created',
       category
      
    });

} catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:'Error in Category',
        error
    })
}
}
const updateaCategoryController=async (req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        
        const category=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        return res.status(201).send({
            success:true,
            message:'Category Updated Successfully',
            category
          
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error while Updating Category',
            error
        })
    }
    }


    //controller for get All users

    const categoryController=async (req,res)=>{
try {
    
    const category=await Category.find({});
    return res.status(200).send({
        success:true,
        message:' Getting All Category List',
        category
      
    });
} catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:'Error while Getting All Category',
        error
    })
}
    }

//single Category
const singleCategoryController=async(req,res)=>{
    try {
        const category=await Category.findOne({slug:req.params.slug});
        return res.status(200).send({
            success:true,
            message:'  Getting Single Category',
            category
        })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'Error while Getting Single Category',
            error
        })
    }
}

const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params;
        await Category.findByIdAndDelete(id);
        return res.status(200).send({
            success:true,
            message:'  Deleting  Category',
            
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'Error in deleting Categories',
            error
        })
    }
}
module.exports={
    createCategoryController,
    updateaCategoryController,
    categoryController,
    singleCategoryController,
    deleteCategoryController
}