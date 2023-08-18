import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layouts/Layout";


 const Error = () => {
  return (
    <>
    <Layout title="Page Not Found !">
<h1 className='mt-5'>Page Not Found !</h1>
<p className="zoom-area">The Page you are looking for does not Exits. </p>
<section class="error-container">
  <span className="four"><span className="screen-reader-text">4</span></span>
  <span className="zero"><span className="screen-reader-text">0</span></span>
  <span className="four"><span className="screen-reader-text">4</span></span>
</section>
<div class="link-container">
  <NavLink target="_blank" to="/" className="more-link" >Back to Homepage</NavLink>
</div>
</Layout>
</>
  )
}

export default Error;