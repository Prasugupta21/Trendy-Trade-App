import { useState,useEffect,useContext,createContext } from "react";
import axios from 'axios'
const AuthContext=createContext();

const AuthProvider=(props)=>{
    const [authData,setAuthData]=useState({user:null,token:''});
    axios.defaults.headers.common['Authorization']=authData?.token;
    useEffect(()=>{
        const data=localStorage.getItem('authData');
        if(data){
            const parseData=JSON.parse(data);
            setAuthData({
                ...authData,
                user:parseData.user,
                token:parseData.token
            })
        }
    },[])
    return (
<AuthContext.Provider value={[authData,setAuthData]}>
    {props.children}
</AuthContext.Provider>

    )
}

//custom hook

const useAuth=()=>useContext(AuthContext);

export {useAuth,AuthProvider};