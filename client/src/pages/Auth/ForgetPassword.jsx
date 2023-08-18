import React ,{useState} from 'react'
import Layout from '../../components/Layouts/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css';
const ForgetPassword = () => {
    const navigate=useNavigate();

    const [email,setEmail]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [answer,setAnswer]=useState('');

    const  handleSubmit= async (e)=>{
        e.preventDefault();

       try {

        const res=await fetch('/api/v1/auth/forget-password',{email,newPassword,answer});
    
        if(res && res.data.success){
          toast.success( res.data.message);
     

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
   <Layout title="Forget Password-Ecommerce App">
    <div className="form-container">
      
      <form onSubmit={handleSubmit}>
<h4 className='title'>RESET PASSWORD</h4>
<div className="form-group">
  <label htmlFor="email">Email</label>
  <input type="email" className="form-control" id="email"  placeholder="Email" defaultValue={answer}  onChange={(e)=>setAnswer(e.target.value)} required/>
</div>
<div className="form-group">
  <label htmlFor="answer">Answer</label>
  <input type="text" className="form-control" id="answer"  placeholder="Enter Your favorite Book" defaultValue={email}  onChange={(e)=>setEmail(e.target.value)} required/>
</div>
<div className="form-group">
  <label htmlFor="newpassword">New Password</label>
  <input type="password" className="form-control" id="newpassword"  placeholder="Password" defaultValue={newPassword}  onChange={(e)=>setNewPassword(e.target.value)} required/>
</div>



<button type="submit" className="btn btn-primary mt-3">Reset</button>
</form>
    </div>
   </Layout>
  )
}

export default ForgetPassword