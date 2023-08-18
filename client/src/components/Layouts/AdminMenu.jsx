import React from 'react';
import {NavLink} from  'react-router-dom';
  
const AdminMenu = () => {
  return (
  <>
  <div className="text-center">
  <ul className="list-group">
<h4>Admin Pannel</h4>

<NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action" >Create Product</NavLink>
<NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action" > Products</NavLink>

</ul>
  </div>
 
  </>
  )
}

export default AdminMenu