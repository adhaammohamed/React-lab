import React,{ useEffect, useState } from 'react'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {  removeFromCart } from '../../redux/cartSlice';
function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const counter = useSelector((state) => state.cart.counter);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      let fetchedProducts = [];
      for (let id of cartItems) {
        try {
          const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
          fetchedProducts.push(data);
        } catch (error) {
          console.error(error);
        }
      }
      setProducts(fetchedProducts);
    };

    cartItems.length > 0 ? fetchProducts() : setProducts([]);
  }, [cartItems]);

  return (

    
    <>

    <h1 className='my-5'> Cart </h1>
    <div className="row g-4">


       
      {products.length === 0 ? <p> Cart is empty</p> : (
        <>
          {products.map((product) => (
              <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <div className="position-relative">
                  <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: "200px" }}>
        
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top p-3"
                      style={{ maxHeight: "180px", objectFit: "contain" }}
                    />
                  </div>
                  
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary rounded-pill">{product.category}</span>
                  </div>
                </div>
        
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{product.title}</h5>
        
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">{product.rating.rate} ★ rating</span>
                    <span className="fw-bold text-primary fs-5">${product.price}</span>
                  </div>
        
                  <button className="btn btn-primary w-100"  onClick={() => dispatch(removeFromCart(product.id))}>remove </button>
                  <Link to={`/PoductDetails/${product.id}`} className="btn btn-link mt-2 text-decoration-none">
                    More Details
                  </Link>
  
                </div>
              </div>
            </div>
        
          ))}
        </>
      )}
    </div>
    </>



  )
}

export default Cart