import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [authData, setAuthData] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data.orders);
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
   if(authData?.token)
   getOrders();
  },[authData?.token])

  return (
    <Layout title="Your Orders">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>


          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
       
<div className="text-center">
<h1 >Your Order is done Successfully</h1>

<h3>You have ordered {orders[(orders.length)-1]?.products?.length}  items !</h3>

</div>


</div>
</div>
</div> 

</Layout>
);
};

       
  
