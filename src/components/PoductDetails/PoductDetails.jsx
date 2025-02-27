import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";

function ProductDetails() {
  let { id } = useParams();
  let [product, setProduct] = useState(null);

  async function getProductDetails() {
    try {
      const {data} = await axios.get(`https://fakestoreapi.com/products/${id}`);
      console.log(id, data);
      
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }
  

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (

    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>{product.title}</title>
    </Helmet>
    <div className='d-flex justify-content-center align-items-center vh-90'>
          <div className="card mb-3 p-3    my-5" style={{ maxWidth: "", margin: "auto" }}>
    <div className="row g-0 d-flex align-items-center">
      <div className="col-md-4 text-center">
        <img 
          src={product.image} 
          alt={product.title} 
          className="img-fluid rounded-start" 
          style={{ width: "100%", height: "150px", objectFit: "contain" }}
        />
      </div>
      
      <div className="col-md-8">
        <div className="card-body">
          <h3 className="card-title text-primary mt-2">{product.title}</h3>
          <p className="card-text text-muted mt-2">{product.description}...</p>
          <p className="h6 text-success mt-2">price: $ {product.price}</p>
          <p className=" mt-2"><strong> Category: 📦</strong> {product.category}</p>
          <div className="mt-2">
        <p className="mb-1"><strong> Rating Count:</strong> {product.rating?.count}</p>
        <p><strong>Rate:</strong> ⭐{product.rating?.rate}</p>

      </div>
          <button className="btn btn-primary mt-2">Buy Now</button>
        </div>
      </div>
    </div>
    </div>

    </div>
    
    </>
  

  

  );
}

export default ProductDetails;
