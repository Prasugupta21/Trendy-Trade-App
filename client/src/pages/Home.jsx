import React,{useEffect, useState} from 'react';
import Layout from '../components/Layouts/Layout';
import { useAuth } from '../context/Auth';
import axios from 'axios';
import {Radio} from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { toast } from 'react-hot-toast';
const Home = () => {
  const [cart,setCart]=useCart();
  const navigate=useNavigate();
  const [authData,setAuthData]=useAuth();
  const [products,setProducts]=useState([]);
const [radio,setRadio]=useState([]);
const [total,setTotal]=useState(0);
const [page,setPage]=useState(1);
const [loading,setLoading]=useState(false);


//getTotal Count


const getTotal=async()=>{
  try {
    const {data}=await axios.get('/api/v1/product/product-count');
    setTotal(data?.total);
  } catch (error) {
    console.log(error);
  }
}

//Load more
const loadMore=async()=>{
  try {
    setLoading(true);

    const  {data}=await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts([...products,...data?.products]);

  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}
  const getAllProducts=async()=>{
    try {
      setLoading(true);
      const  {data}=await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);

      setProducts(data.products);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  }

  const filterProduct=async()=>{
    try {
      const {data}=await axios.post(`/api/v1/product/product-filters`,{radio});
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!radio.length){
      getAllProducts();
  
    }   

 else if(radio.length)  filterProduct();
    
  },[radio]);

  useEffect(()=>{
getTotal();
if(page==1)return;
loadMore();
  },[page])
  return (
    <div>
    <Layout title="Home"> 
    <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
   <div className=" container-fluid row mt-3">
   <div className="col-md-3">


  {/* Price Filter  */}
   <h4 className="text-center " style={{marginTop:200}}>
        Filter By Price
        </h4>
          <div className="d-flex flex-column">
         <Radio.Group onChange={e=>setRadio(e.target.value)}>
         {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
         </Radio.Group>
          
          </div>
          <div className="d-flex flex-column">
       <button className='btn btn-danger mt-3' onClick={()=>window.location.reload()}>Reset Filter</button>
          
          </div>
        </div>
    <div className="col-md-9">
      {/* {JSON.stringify(radio,null,4)} */}
        <h1 className="text-center">
          All Products
        </h1>
        <div className="d-flex flex-wrap">
        {
        products?.map((product)=>(
         

<div className="card m-2 " style={{width: "18rem"} }>
  <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}/>
  <div className="card-body text-center">
    <h5 className="card-title">{product.name}</h5>
    <p className="card-text" style={{color:'#3abc3a',fontWeight:'bold'}}>Price${product.price}</p>

    <p className="card-text">{product.description.substring(0,30)}...</p>
    <button  className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${product.slug}`)}>More Details</button>
    <button  className="btn btn-dark ms-1" 
    onClick={()=>
      {setCart([...cart,product])
        localStorage.setItem('cart',JSON.stringify([...cart,product]))
        toast.success('Item Added to Cart');
    }}>Add To Cart</button>
  </div>
</div>
))
     }
      
        </div>
        <div className='m-2 p-3' >{(products && products.length <total )&& (
          <button className='btn btn-warning' 
          onClick={(e)=>{
            e.preventDefault();
            setPage(page+1);
          }}>
            {loading? 'Loading...' :'Load More' }
            </button>
        )}</div>
        </div>
   </div>
    
   
    </Layout>
            
    
    </div>

  )
}

export default Home