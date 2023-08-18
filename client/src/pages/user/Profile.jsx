import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import UserMenu from '../../components/Layouts/UserMenu'
import { useAuth } from '../../context/Auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Profile = () => {

    // context
    const [authData,setAuthData]=useAuth();

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');


    //GET USER DATA
    useEffect(()=>{
       
            const {email,name,phone,address}=authData?.user;
            setName(name);
            setPhone(phone);
            setEmail(email);
            setAddress(address);
      

       

    },[authData?.user])
const  handleSubmit= async (e)=>{
    e.preventDefault();

    
   try {
 

    const {data}=await axios.put('/api/v1/auth/profile',{name,email,password,phone,address});

    if(data?.success){
        setAuthData({...authData,user:data?.updatedUser});
        console.log(authData);
       let ls= localStorage.getItem('authData');
       ls=JSON.parse(ls);
       ls.user=data?.updatedUser;
       localStorage.setItem('authData',JSON.stringify(ls));
           toast.success('profile Updated Successfully');
           console.log('updated success',authData);
    }else{
        toast.error(data?.error);

    }

    

   } catch (error) {
    console.log(error);
    toast.error('Something went wrong')
   }
  }
  return (
    <Layout title="Your Profile">
        <div className="container-fluid m-3 p-3">

            <div className="row">

                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h4 className='title'>USER PROFILE </h4>

  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name"  placeholder="Enter Name" defaultValue={name} onChange={(e)=>setName(e.target.value)} />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="form-control" id="email"  placeholder="Email" defaultValue={email}  onChange={(e)=>setEmail(e.target.value)} disabled />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password"  placeholder="Password" defaultValue={password}  onChange={(e)=>setPassword(e.target.value)} />
  </div>
  
 
  <div className="form-group">
    <label htmlFor="phone">Phone</label>
    <input type="text" className="form-control" id="phone"  placeholder="Phone" defaultValue={phone}  onChange={(e)=>setPhone(e.target.value)} />
  </div>
  <div className="form-group">
    <label htmlFor="address">Address</label>
    <input type="text" className="form-control" id="address"  placeholder="Address" defaultValue={address} onChange={(e)=>setAddress(e.target.value)} />
  </div>
  
  
  <button type="submit" className="btn btn-primary mt-3">Update</button>
</form>
      </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile