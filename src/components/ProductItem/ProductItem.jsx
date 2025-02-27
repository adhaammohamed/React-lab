import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const notify = () => toast("product Added!");


  return (
    <>
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
            <span className="badge bg-danger ">{product.category}</span>
          </div>
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{product.title}</h5>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className=" ">rating : <span className=' text-warning'> ★{product.rating.rate} </span> </span>
            <span className="fw-bold text-success fs-5">${product.price}</span>
          </div>

          <button className="btn btn-info w-100"  onClick={() => {notify(); dispatch(addToCart(product.id))}}>Add to Cart</button>
          <ToastContainer />

          <Link to={`/PoductDetails/${product.id}`} className="btn btn-link shadow-sm mt-2 text-decoration-none">
            More Details
          </Link>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default ProductItem