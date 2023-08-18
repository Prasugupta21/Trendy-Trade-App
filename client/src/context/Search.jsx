import { useState,useContext,createContext } from "react";
const SearchContext=createContext();

const SearchProvider=(props)=>{
    const [authData,setAuthData]=useState({keyword:'',result:[]});

    return (
<SearchContext.Provider value={[authData,setAuthData]}>
    {props.children}
</SearchContext.Provider>

    )
}

//custom hook

const useSearch=()=>useContext(SearchContext);

export {useSearch,SearchProvider};