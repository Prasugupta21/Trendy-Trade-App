import React ,{useState} from 'react'
import Layout from '../../components/Layouts/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/Auth';
const Login = () => {
    const navigate=useNavigate();
    const location=useLocation();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [authData,setAuthData]=useAuth();

    const  handleSubmit= async (e)=>{
        e.preventDefault();
      try {
 

        const res=await axios.post('/api/v1/auth/login',{email,password});
    
        if( res && res.data.success){

          toast.success(res.data.message);
          setAuthData({
            ...authData,
            user:res.data.user,
            token:res.data.token
          });
          localStorage.setItem('authData',JSON.stringify(res.data));

          navigate( location.state ||'/');
        }else{
        
          toast.error(res.data.message);
        }
       } catch (error) {

        console.log(error);
        toast.error('Something went wrong')
       }
      }
  return (
    <Layout title="Login Ecommerce App">

    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

<div className="form-group">
  <label htmlFor="email">Email</label>
  <input type="email" className="form-control" id="email"  placeholder="Email" defaultValue={email}  onChange={(e)=>setEmail(e.target.value)} required/>
</div>
<div className="form-group">
  <label htmlFor="password">Password</label>
  <input type="password" className="form-control" id="password"  placeholder="Password" defaultValue={password}  onChange={(e)=>setPassword(e.target.value)} required/>
</div>

{/* 
<div className="mb-3">
<button type="button" className="btn btn-primary mt-3" onClick={()=> navigate('/forget-password')}>Forget password</button>

</div> */}
<button type="submit" className="btn btn-primary mt-3">Login</button>
</form>
    </div>
  </Layout>
  )
}

export default Login;