import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from "react-helmet";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Divider,
  Rating,
  Chip,
  Container,
  CircularProgress,
  Stack
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ProductDetails() {
  let { id } = useParams();
  let [product, setProduct] = useState(null);
  let [loading, setLoading] = useState(true);

  async function getProductDetails() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
      console.log(id, data);
      
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '70vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product.title}</title>
      </Helmet>
      
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '90vh',
          py: 4
        }}
      >
        <Container maxWidth="md">
          <Card 
            elevation={3} 
            sx={{ 
              p: 3, 
              my: 5, 
              borderRadius: 2
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{ 
                    height: 200, 
                    objectFit: 'contain',
                    mb: { xs: 2, md: 0 } 
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={8}>
                <CardContent sx={{ p: 1 }}>
                  <Typography 
                    variant="h5" 
                    component="h1" 
                    color="primary" 
                    gutterBottom
                  >
                    {product.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    paragraph
                    sx={{ mt: 2 }}
                  >
                    {product.description}
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    color="success.main" 
                    sx={{ mt: 2, fontWeight: 'bold' }}
                  >
                    Price: ${product.price}
                  </Typography>
                  
                  <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Category:
                    </Typography>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </Stack>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Rating:
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                      <Rating 
                        value={product.rating?.rate} 
                        precision={0.1} 
                        readOnly 
                      />
                      <Typography variant="body2">
                        ({product.rating?.count} reviews)
                      </Typography>
                    </Stack>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    startIcon={<ShoppingCartIcon />}
                    sx={{ mt: 3 }}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default ProductDetails;