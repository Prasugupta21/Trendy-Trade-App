import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Contact from './pages/Contact';
import About from './pages/About';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/Admin/CreateProduct';

import { Order } from './pages/user/Order';
import Profile from './pages/user/Profile';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:slug" element={<ProductDetails/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/search" element={<Search/>}/>

        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>

        
        
        <Route path="/policy" element={<Policy/>}/>

      
        <Route path="/register" element={<Register/>}/>

        <Route path="/login" element={<Login/>}/>


        <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>}/>
        <Route path="user/orders" element={<Order/>}/>
        <Route path="user/profile" element={<Profile/>}/>

        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/products/:slug" element={<UpdateProduct/>}/>
        <Route path="admin/products" element={<Product/>}/>
    

        </Route>

 
        <Route path="*" element={<Error/>}/>



      </Routes>
   
    </div>
  );
}

export default App;
