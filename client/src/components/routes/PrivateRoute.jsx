import {useState,useEffect} from 'react';
import { useAuth } from '../../context/Auth';
import Spinner from '../Spinner';
import { Outlet } from 'react-router-dom';
import axois from 'axios';
export default function PrivateRoute(){
    const [ok,setOk]=useState(false);
    const[authData]=useAuth();
    useEffect(()=>{
const authCheck=async()=>{
    const res=await axois.get('/api/v1/auth/user-auth',{
        // headers:{
        //     "Authorization":auth?.token
        // }
        // alternative of headers use in ContextProvider
    })
    if(res.data.ok){
        setOk(true);
    }else{
        setOk(false);
    }
    
}
  if(authData?.token)authCheck();
},[authData?.token]);
    return ok ? <Outlet/>: <Spinner path=''/>
}