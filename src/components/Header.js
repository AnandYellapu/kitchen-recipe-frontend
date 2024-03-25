import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, useMediaQuery } from '@mui/material';
import { SiFoodpanda } from 'react-icons/si';
import { MdMenu, MdExitToApp, MdHome, MdAddCircle, MdInfo } from 'react-icons/md';
import { RingLoader } from 'react-spinners'; // Import RingLoader from react-spinners

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading status
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    setLoading(true); // Set loading to true when logout starts
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/login');
      setLoading(false); // Set loading to false after logout is complete
    }, 3000);
  };

  return (
    <React.Fragment>
      <AppBar position="static" className="header">
        <Toolbar className="toolbar">
          <Link to="/" className="logo-link">
            <SiFoodpanda className="logo-icon" />
            <Typography variant="h6" className="logo-title">
              Kitchen Recipe Management
            </Typography>
          </Link>
          {isSmallScreen && (
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              {loading ? (
                <RingLoader color="#ffffff" loading={loading} size={24} /> // Render RingLoader when loading
              ) : (
                <MdMenu />
              )}
            </IconButton>
          )}
          {!isSmallScreen && (
            <React.Fragment>
              <nav className="nav">
                <Link className="nav-link" activeClassName="active-link" to="/all">
                  Home
                </Link>
                <Link className="nav-link" activeClassName="active-link" to="/create">
                  CreateFood
                </Link>
                <Link className="nav-link" activeClassName="active-link" to="/about">
                  About
                </Link>
              </nav>
              <Link className="logout-link" onClick={handleLogout}>
                {loading ? (
                  <RingLoader color="#ffffff" loading={loading} size={24} /> // Render RingLoader when loading
                ) : (
                  <IconButton color="inherit">
                    <MdExitToApp className="logout-icon" />
                  </IconButton>
                )}
              </Link>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/all" onClick={toggleDrawer}>
            <ListItemIcon><MdHome /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/create" onClick={toggleDrawer}>
            <ListItemIcon><MdAddCircle /></ListItemIcon>
            <ListItemText primary="CreateFood" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={toggleDrawer}>
            <ListItemIcon><MdInfo /></ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              {loading ? (
                <RingLoader color="#000000" loading={loading} size={24} /> // Render RingLoader when loading
              ) : (
                <MdExitToApp />
              )}
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default Header;
