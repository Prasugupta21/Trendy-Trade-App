import React ,{useState} from 'react'
import Layout from '../../components/Layouts/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';
const Register = () => {
  const navigate=useNavigate();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [address,setAddress]=useState('');
  const [answer,setAnswer]=useState('');

  const  handleSubmit= async (e)=>{
    e.preventDefault();

    
   try {
 

    const res=await axios.post('/api/v1/auth/register',{name,email,password,answer,phone,address});

    if(res && res.data.success){
      toast.success(res.data.message);
      navigate('/login');
    }else{
      toast.error(res.data.message);
    }
    

   } catch (error) {
    console.log(error);
    toast.error('Something went wrong')
   }
  }
  return (
    <Layout title="Register Ecommerce App">

      <div className="form-container">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name"  placeholder="Enter Name" defaultValue={name} onChange={(e)=>setName(e.target.value)} required/>
  </div>
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="form-control" id="email"  placeholder="Email" defaultValue={email}  onChange={(e)=>setEmail(e.target.value)} required/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password"  placeholder="Password" defaultValue={password}  onChange={(e)=>setPassword(e.target.value)} required/>
  </div>
  
 
  <div className="form-group">
    <label htmlFor="phone">Phone</label>
    <input type="text" className="form-control" id="phone"  placeholder="Phone" defaultValue={phone}  onChange={(e)=>setPhone(e.target.value)} required/>
  </div>
  <div className="form-group">
    <label htmlFor="address">Address</label>
    <input type="text" className="form-control" id="address"  placeholder="Address" defaultValue={address} onChange={(e)=>setAddress(e.target.value)} required/>
  </div>
  <div className="form-group">
    <label htmlFor="answer">Answer</label>
    <input type="text" className="form-control" id="answer"  placeholder="What is Your Favourate Book" defaultValue={answer} onChange={(e)=>setAnswer(e.target.value)} required/>
  </div>
  
  
  <button type="submit" className="btn btn-primary mt-3">Register</button>
</form>
      </div>
    </Layout>
  )
}

export default Register