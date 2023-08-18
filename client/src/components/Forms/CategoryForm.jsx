import React from 'react'
const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <return>
      <form onSubmit={handleSubmit} >

  <div class="mb-3">
    <input type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Enter New Catetory" value={value} onChange={(e)=>setValue(e.target.value)}/>
    
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>  

    </return>
  )
}

export default CategoryForm;