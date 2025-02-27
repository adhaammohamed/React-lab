import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);





  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(data);
      console.log(data);
      setSelectedCategory(data[0]);
      
    } catch (error) {
      console.error( error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
      setProducts(data);
      setLoading(false);

    } catch (error) {
      console.error( error);
      setLoading(false);

    }
  };
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    
    <div>
          <div className="container-fluid bg-light py-3 border border-top-0 border-3 rounded-bottom my-5 border-info">
            <div className="container  border-info p-3">
              <h1 className="text-center ">Category</h1>
            </div>
          </div>


      <div className="container py-4">
      <div className="mb-4 my-5">
      <ul className="nav nav-pills gap-2">
      {categories.map((category) => (
        <li className="nav-item" key={category}>
          <button
            onClick={() => setSelectedCategory(category)}
            className={`btn  ${selectedCategory === category ? 'text-bg-secondary ' : ''}`}
          >
            {category}
          </button>
        </li>
      ))}
      </ul>
      </div>

      {loading ? (
      <div className="text-center ">
      <div className="spinner-grow text-success " role="status">
        <span className="visually-hidden  ">Loading...</span>
      </div>
      </div>
      ) : (
      <>
      <div className="row g-4">
      {products.map((product) => (<ProductItem key={product.id} product={product} />))}
      </div>
      </>

      )}
      </div>
    </div>

  );
};

export default Category;
