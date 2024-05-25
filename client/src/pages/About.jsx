
import React from "react";
import Layout from '../components/Layouts/Layout'

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Our passion lies in [describe your niche or industry]. Whether it’s fashion, home decor, gadgets, or wellness products, we curate a collection that reflects our commitment to quality, style, and functionality. We’re not just selling products; we’re delivering solutions that enhance your life.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;