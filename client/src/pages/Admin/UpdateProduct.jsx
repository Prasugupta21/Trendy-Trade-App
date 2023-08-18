import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { Select } from 'antd';
const  {Option} = Select;
const UpdateProduct = () => {
  const navigate=useNavigate();
  const [category,setCategory]=useState([]);
//   const [singleCategory,setSingleCategory]=useState('');
  const [photo,setPhoto]=useState('');
  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [quantity,setQuantity]=useState('');
  const [price,setPrice]=useState('');
  const [shipping,setShipping]=useState('');
  const [id,setId]=useState('');
const params=useParams();
//get Single  Product 

const getSingleProduct=async()=>{
    try {
        const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`);
        setName(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        // for category ;
    
    } catch (error) {
        console.log(error);
    }
}

useEffect(()=>{
    getSingleProduct();
},[])
  const getAllCategory=async()=>{
    try {
      const {data}=await axios.get('/api/v1/category/get-category');
      if(data?.success){
        setCategory(data?.category);
      }
      
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting Category')
    }


  }
  useEffect(()=>{
    getAllCategory();
  },[])

  //handleUpdateProduct Function

  const handleUpdate=async(e)=>{
    e.preventDefault();
    try {
      const productData=new FormData();
      productData.append('name',name);
      productData.append('description',description);
  photo &&    productData.append('photo',photo);
      productData.append('quantity',quantity);
      productData.append('price',price);

      const {data}=await  axios.put(`/api/v1/product/update-product/${id}`,productData);
      if(data?.success){
        toast.success('Product Updated Successfully');
        navigate('/dashboard/admin/products')

      }else{
        toast.error(data?.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error('something went wrong')
    }
  }

  const handleDelete=async()=>{
    try {
        var answer=window.prompt('Are You Sure Want to Delete this Product ? ');
        if(!answer)return;
        const {data}=await axios.delete(`/api/v1/product/delete-product/${id}`);
    toast.success("Product Deleted Successfully");
    navigate('/dashboard/admin/products');
    } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong');
    }
  }
  return (
    <Layout title={'Dashboard-Create Products'}>
        <div className="container-fluid m-3 p-3 dashboard">

     
    <div className="row">
     <div className="col-md-3">
     <AdminMenu/>
     </div>
<div className="col-md-9">
<h1>   Creat Product   </h1>
<div className="m-1 w-75">
  {/* <Select bordered={false} placeholder='Select a category 'size='large' showSearch className='form-select mb-3' onChange={(value)=>{setSingleCategory(value)}} val >
    {category?.map(c=>(
      <Option key={c._id} value={c._id} >{c.name}</Option>
    ))}

  </Select> */}
  <div className="mb-3">
<label htmlFor='uploadImage' className='btn btn-outline-secondary col-md-12'>
  {photo?   photo.name :"Upload Photo" } 
    <input type='file'  name='photo' id='uploadImage' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden>
      
    </input>
</label>
  </div>
  <div className="mb-3">
    {photo ? (
      <div className="text-center"><img src={URL.createObjectURL(photo)} alt='product-photo' height={'200px'} className='img img-responsive' /></div>
    ):(
        <div className="text-center"><img src={`/api/v1/product/product-photo/${id}`} alt='product-photo' height={'200px'} className='img img-responsive' /></div>

    )}
  </div>
  <div className="mb-3">
<input type="text" value={name} placeholder='write a name ' className='form-control' onChange={(e)=>setName(e.target.value)} />
  </div>
  <div className="mb-3">
<input type="Number" value={price} placeholder='write a price ' className='form-control' onChange={(e)=>setPrice(e.target.value)} />
  </div>
  <div className="mb-3">
<textarea type="text" value={description} placeholder='write a Description ' className='form-control' onChange={(e)=>setDescription(e.target.value)} > </textarea>
  </div>
  <div className="mb-3">
<input type="Number" value={quantity} placeholder='write a quantity ' className='form-control' onChange={(e)=>setQuantity(e.target.value)} />
  </div>
  <div className="mb-3">
    <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value)=>{
      setShipping(value)
    }} value={shipping ? 'Yes':'No'}>
      <Option value='0'>No</Option>
      <Option value='1'>Yes</Option>
    </Select>
  </div>
  <div className="mb-3">
    <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
  </div>
  <div className="mb-3">
    <button className='btn btn-danger' onClick={handleDelete}>Delete Product</button>
  </div>
</div>

</div>


     </div>
     
     </div> 
   
  

   
     
     </Layout>
  )
}

export default UpdateProduct