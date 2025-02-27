import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button, 
  CircularProgress, 
  Stack,
  Pagination
} from "@mui/material";

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
        console.log(error);
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: 'background.paper', 
          py: 3, 
          mb: 5, 
          mt: 5,
          borderBottom: 3, 
          borderLeft: 3, 
          borderRight: 3, 
          borderColor: 'info.main',
          borderRadius: '0 0 8px 8px'
        }}
      >
        <Container>
          <Typography variant="h4" component="h1" align="center">
            Home
          </Typography>
        </Container>
      </Paper>

      <Container sx={{ py: 5, textAlign: 'center' }}>
        {loading ? (
          <CircularProgress color="success" />
        ) : (
          <>
            <Grid container spacing={4}>
              {currentProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination 
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductList;