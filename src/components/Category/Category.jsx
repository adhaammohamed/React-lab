import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button, 
  ButtonGroup,
  CircularProgress,
  Tabs,
  Tab
} from "@mui/material";

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
      console.error(error);
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
      console.error(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box>
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
            Category
          </Typography>
        </Container>
      </Paper>

      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 4, my: 5, display: 'flex', justifyContent: 'center' }}>
          <ButtonGroup variant="outlined">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant={selectedCategory === category ? "contained" : "outlined"}
                color="secondary"
              >
                {category}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Category;