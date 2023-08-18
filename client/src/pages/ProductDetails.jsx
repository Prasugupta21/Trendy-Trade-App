import React, { useEffect, useState } from 'react'
import Layout from '../components/Layouts/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const ProductDetails = () => {
    const params=useParams();
    const [product,setProduct]=useState({});
    const getProducts=async()=>{
        try {
            const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
   if(params?.slug)     getProducts();
    },[params?.slug])
  return (
    <Layout>
        <h1>ProductDetails</h1>
        {/* {JSON.stringify(product,null,4)} */}

        <div className="row container mt-2">
            <div className="col-md-6"> 
             <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} height={'300px'} width={'350px'}/>
</div>
            <div className="col-md-6 ">

                <h1 className='text-center'>Product Details</h1>
                <h6>Name :{product.name}</h6>
                <h6>Description :{product.description}</h6>
                <h6>Price : ${product.price}</h6>
                <button  class="btn btn-secondary ms-1 mt-2">Add To Cart</button>

            </div>
        </div>
        </Layout>
  )
}

export default ProductDetails