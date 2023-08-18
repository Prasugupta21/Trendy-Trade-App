import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layouts/AdminMenu'
import Layout from '../../components/Layouts/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
    const [products,setProducts]=useState([]);


    const getAllProducts=async()=>{
        try {
            const {data}=await axios.get('/api/v1/product/get-product');
            setProducts(data?.products);
         
        } catch (error) {
            console.log(error);
            toast.error('something went wrong');
        }
    }

    useEffect(()=>{
getAllProducts();
    },[])
  return (

 <Layout className="container">
    <div className="row">
    <div className="col-md-3 mt-5">
        <AdminMenu />
    </div>
    <div className="col-md-9 ">
     <h1 className='text-center'>All Product List </h1>
     <div className="d-flex flex-wrap ms-2">
     {
        products?.map((product)=>(
         
            <Link to={`/dashboard/admin/products/${product.slug}`}  key={product._id} className='product-link'>

<div className="card m-2 " style={{width: "18rem"} }>
  <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}/>
  <div className="card-body text-center">
    <h5 className="card-title"><span className='text-left'>{product.name}</span> </h5>
    <p className="card-text " style={{color:'#39bf39',fontWeight:'bold'}}>Price:${product.price}</p>
    <p className="card-text">{product.description}</p>
  </div>
</div>
            </Link>




        


        ))
     }
    </div>
    </div>
    </div>
 </Layout>
  )
}

export default Product