import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { 
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Rating,
  Stack,
  Grid
} from "@mui/material";
import { styled } from '@mui/material/styles';

// Styled Link component that looks like a button
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  width: '100%',
  textAlign: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const notify = () => toast("Product Added!");

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card 
        elevation={3} 
        sx={{ 
          height: '100%', 
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ position: 'relative', bgcolor: 'background.paper', height: 200 }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ 
              maxHeight: 180, 
              objectFit: 'contain',
              p: 3,
              width: 'auto',
              margin: '0 auto'
            }}
          />
          
          <Chip 
            label={product.category}
            color="error"
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8 
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="h6" 
            component="h2" 
            noWrap 
            title={product.title}
            sx={{ mb: 2 }}
          >
            {product.title}
          </Typography>

          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{ mb: 3 }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="body2" component="span">
                Rating: 
              </Typography>
              <Rating 
                value={product.rating.rate} 
                precision={0.1} 
                readOnly 
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
            <Typography 
              variant="h6" 
              component="span" 
              color="success.main" 
              fontWeight="bold"
            >
              ${product.price}
            </Typography>
          </Stack>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0, flexDirection: 'column', gap: 1 }}>
          <Button 
            variant="contained" 
            color="info" 
            fullWidth
            onClick={() => {
              notify(); 
              dispatch(addToCart(product.id));
            }}
          >
            Add to Cart
          </Button>
          <ToastContainer />

          <StyledLink to={`/PoductDetails/${product.id}`}>
            <Typography variant="body2">More Details</Typography>
          </StyledLink>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProductItem