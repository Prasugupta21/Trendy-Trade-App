import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {Helmet} from "react-helmet";
import  { Toaster } from 'react-hot-toast';

const Layout = (props) => {
  return (
    <div>

<Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={props.description}/>
  <meta name="keywords" content={props.keyword}/>
  <meta name="author" content={props.author}/>
          <title>{props.title}</title>
            </Helmet>
                <Header />
       <main style={{minHeight:'70vh'}}> 

       <Toaster />       
        {props.children}</main> 

  <Footer/>
    </div>
  )
}
Layout.defaultProps={
  title:'Ecommerce App-Shop Now',
  description:'mern stack project',
  keywords:'mern,react,node,mongodb',
  author:'Prasu'
}
export default Layout;