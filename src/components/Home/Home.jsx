import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        setProducts(data);
        console.log(data);
        setLoading(false);

      } catch (error) {
        console.log( error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="container-fluid bg-light py-3 border border-top-0 border-3 rounded-bottom my-5 border-info">
        <div className="container border-info p-3">
          <h1 className="text-center">Home</h1>
        </div>
      </div>

      <div className="container py-5 text-center">
        {loading ? (
          <div className="spinner-border text-success" role="status" />
        ) : (
          <>
            <div className="row g-4">
              {currentProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-4">
              <button
                className="btn btn-outline-success mx-1"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-outline-success mx-1"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
