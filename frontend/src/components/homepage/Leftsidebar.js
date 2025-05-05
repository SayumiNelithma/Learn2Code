
import React from 'react';
import { Box, Typography, Button, Tooltip, IconButton } from '@mui/material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Home, Search, AutoGraph, BookmarkBorder, Person,
  RocketLaunch, Menu, Close
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function Leftsidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: <Home />, text: "Home", path: "/" },
    // { icon: <Search />, text: "Explore", path: "/explore" },
    { icon: <AutoGraph />, text: "Learning Paths", path: "/learning-plans" },
    // { icon: <BookmarkBorder />, text: "Saved", path: "/saved" },
    { icon: <Person />, text: "Profile", path: "/profile" },
  ];

  const renderNavItems = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          startIcon={item.icon}
          sx={{
            textTransform: 'none',
            color: isActive(item.path) ? '#2196f3' : '#555',
            fontWeight: isActive(item.path) ? '600' : '400',
            backgroundColor: isActive(item.path) ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
            borderRadius: '12px',
            py: 1.5,
            px: 2,
            justifyContent: { xs: 'center', md: 'flex-start' },
            width: '100%',
            '&:hover': {
              backgroundColor: 'rgba(33, 150, 243, 0.08)',
            },
          }}
        >
          <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 1 }}>
            {item.text}
          </Box>
        </Button>
      ))}
    </>
  );

  // Mobile menu toggle button (only visible on mobile)
  const mobileMenuToggle = (
    <Box 
      sx={{ 
        display: { xs: 'flex', md: 'none' }, 
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1100,
      }}
    >
      <IconButton 
        onClick={toggleMobileMenu}
        sx={{ 
          backgroundColor: '#2196f3',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          '&:hover': {
            backgroundColor: '#1976d2'
          }
        }}
      >
        {mobileOpen ? <Close /> : <Menu />}
      </IconButton>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: { xs: 0, md: 240 },
          flexShrink: 0,
          height: '100vh',
          position: 'sticky',
          top: 0,
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          bgcolor: '#FFFFFF',
          px: 2,
          py: 3,
          gap: 4,
          overflow: 'hidden',
          transition: 'width 0.2s ease',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, px: 2 }}>
          <RocketLaunch sx={{ color: '#2196f3', mr: 1, fontSize: 28 }} />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              color: '#2196f3',
              fontWeight: 'bold',
              letterSpacing: '-0.5px',
            }}
          >
            Learn2Code
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {renderNavItems()}
        </Box>

        {/* Create New Post Button */}
        <Button
          variant="contained"
          component={Link}
          to="/add-post"
          sx={{
            mt: 'auto',
            textTransform: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            py: 1.2,
            backgroundColor: '#2196f3',
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          Learn2Code
        </Button>
      </Box>

      {/* Mobile Bottom Navigation */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 60,
          backgroundColor: 'white',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          zIndex: 1000,
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        {navItems.slice(0, 5).map((item) => (
          <Tooltip key={item.path} title={item.text} placement="top">
            <IconButton
              component={Link}
              to={item.path}
              sx={{
                color: isActive(item.path) ? '#2196f3' : '#555',
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Mobile Side Menu (expands when toggle button is clicked) */}
      <Box
        sx={{
          display: { xs: mobileOpen ? 'block' : 'none', md: 'none' },
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1050,
        }}
        onClick={toggleMobileMenu}
      />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 240,
          height: '100%',
          backgroundColor: 'white',
          zIndex: 1100,
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          p: 3,
          gap: 2,
          boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Menu</Typography>
          <IconButton onClick={toggleMobileMenu}>
            <Close />
          </IconButton>
        </Box>
        
        {/* Full text navigation items for mobile side menu */}
        {navItems.map((item) => (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            startIcon={item.icon}
            onClick={toggleMobileMenu}
            sx={{
              textTransform: 'none',
              color: isActive(item.path) ? '#2196f3' : '#555',
              fontWeight: isActive(item.path) ? '600' : '400',
              backgroundColor: isActive(item.path) ? 'rgba(33, 150, 243, 0.08)' : 'transparent',
              borderRadius: '12px',
              py: 1.5,
              px: 2,
              justifyContent: 'flex-start',
              width: '100%',
              textAlign: 'left',
            }}
          >
            {item.text}
          </Button>
        ))}
        
        {/* Create Post Button in mobile menu */}
        <Button
          variant="contained"
          component={Link}
          to="/create-post"
          onClick={toggleMobileMenu}
          sx={{
            mt: 'auto',
            textTransform: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            py: 1.2,
            backgroundColor: '#2196f3',
          }}
        >
          Learn2Code
        </Button>
      </Box>

      {mobileMenuToggle}
    </>
  );
}