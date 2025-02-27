import React from "react";
import { Box, Container, Grid, Typography, TextField, Button, IconButton, useTheme, styled } from "@mui/material";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A1A1A" : "#F5F5F5",
  padding: theme.spacing(6, 0),
  color: theme.palette.text.primary,
}));

const StyledLink = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Box mb={2}>
              <img
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
                alt="Company Logo"
                style={{ height: 40, marginBottom: 16 }}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9";
                }}
              />
            </Box>
            <Typography variant="body2" paragraph>
              "Empowering businesses through innovative solutions. We strive to deliver excellence in everything we do."
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <StyledLink variant="body2" paragraph>Home</StyledLink>
            <StyledLink variant="body2" paragraph>About Us</StyledLink>
            <StyledLink variant="body2" paragraph>Services</StyledLink>
            <StyledLink variant="body2" paragraph>Contact</StyledLink>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <MdPhone style={{ marginRight: 8 }} />
              <Typography variant="body2">+1 (555) 123-4567</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <MdEmail style={{ marginRight: 8 }} />
              <Typography variant="body2">info@example.com</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <MdLocationOn style={{ marginRight: 8 }} />
              <Typography variant="body2">
                123 Business Street, Suite 100,
City, State 12345
              </Typography>
            </Box>
          </Grid>

          {/* Newsletter Signup */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Newsletter
            </Typography>
            <Typography variant="body2" paragraph>
              Subscribe to our newsletter for updates
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Enter your email"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
            >
              Subscribe
            </Button>

            {/* Social Media Links */}
            <Box mt={3}>
              <SocialButton color="primary" aria-label="facebook">
                <FaFacebook />
              </SocialButton>
              <SocialButton color="primary" aria-label="twitter">
                <FaTwitter />
              </SocialButton>
              <SocialButton color="primary" aria-label="linkedin">
                <FaLinkedin />
              </SocialButton>
              <SocialButton color="primary" aria-label="instagram">
                <FaInstagram />
              </SocialButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box mt={4} pt={3} borderTop={1} borderColor="divider">
          <Typography variant="body2" color="text.secondary" align="center">
            © {currentYear} Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;