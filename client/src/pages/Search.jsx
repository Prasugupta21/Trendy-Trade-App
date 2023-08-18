
import React from 'react'
import { useSearch } from '../context/Search'
import Layout from '../components/Layouts/Layout';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [values,setValues]=useSearch();

    const navigate=useNavigate();

  return (
    <Layout title='Search Results'>
        <div className="container">
            <div className="text-center">
                <h1>Search Results</h1>
                <h6 >{values?.result.result.length<1 ? 'No values Found' :(`Found ${values?.result.result.length}`)}</h6>
                <div className="d-flex flex-wrap mt-4">
     
                {  values?.result.result.map((value)=>(
         

<div className="card m-2" style={{width: "18rem"} }>
  <img src={`/api/v1/product/product-photo/${value._id}`} className="card-img-top" alt={value.name}/>
  <div className="card-body">
    <h5 className="card-title">{value.name}</h5>
    <p className="card-text">${value.price}</p>

    <p className="card-text">{value.description.substring(0,30)}...</p>
    <button  class="btn btn-primary ms-1" onClick={()=>navigate(`/product/${value.slug}`)}>More Details</button>
    <button  class="btn btn-secondary ms-1">Add To Cart</button>
  </div>
</div>
     ))    }
 
      
        </div>
           </div>
           </div>
        
    </Layout>
  )
}

export default Search