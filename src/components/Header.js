// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, useMediaQuery } from '@mui/material';
// import { SiFoodpanda } from 'react-icons/si';
// import { MdMenu, MdExitToApp, MdHome, MdAddCircle, MdInfo } from 'react-icons/md';
// import { RingLoader } from 'react-spinners'; // Import RingLoader from react-spinners

// const Header = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [loading, setLoading] = useState(false); // State to track loading status
//   const isSmallScreen = useMediaQuery('(max-width:600px)');
//   const navigate = useNavigate();

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleLogout = () => {
//     setLoading(true); // Set loading to true when logout starts
//     localStorage.removeItem('token');
//     setTimeout(() => {
//       navigate('/login');
//       setLoading(false); // Set loading to false after logout is complete
//     }, 3000);
//   };

//   return (
//     <React.Fragment>
//       <AppBar position="static" className="header">
//         <Toolbar className="toolbar">
//           <Link to="/" className="logo-link">
//             <SiFoodpanda className="logo-icon" />
//             <Typography variant="h6" className="logo-title">
//               Kitchen Recipe Management
//             </Typography>
//           </Link>
//           {isSmallScreen && (
//             <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
//               {loading ? (
//                 <RingLoader color="#ffffff" loading={loading} size={24} /> // Render RingLoader when loading
//               ) : (
//                 <MdMenu />
//               )}
//             </IconButton>
//           )}
//           {!isSmallScreen && (
//             <React.Fragment>
//               <nav className="nav">
//                 <Link className="nav-link" activeClassName="active-link" to="/all">
//                   Home
//                 </Link>
//                 <Link className="nav-link" activeClassName="active-link" to="/create">
//                   CreateFood
//                 </Link>
//                 <Link className="nav-link" activeClassName="active-link" to="/about">
//                   About
//                 </Link>
//               </nav>
//               <Link className="logout-link" onClick={handleLogout}>
//                 {loading ? (
//                   <RingLoader color="#ffffff" loading={loading} size={24} /> // Render RingLoader when loading
//                 ) : (
//                   <IconButton color="inherit">
//                     <MdExitToApp className="logout-icon" />
//                   </IconButton>
//                 )}
//               </Link>
//             </React.Fragment>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
//         <List>
//           <ListItem button component={Link} to="/all" onClick={toggleDrawer}>
//             <ListItemIcon><MdHome /></ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button component={Link} to="/create" onClick={toggleDrawer}>
//             <ListItemIcon><MdAddCircle /></ListItemIcon>
//             <ListItemText primary="CreateFood" />
//           </ListItem>
//           <ListItem button component={Link} to="/about" onClick={toggleDrawer}>
//             <ListItemIcon><MdInfo /></ListItemIcon>
//             <ListItemText primary="About" />
//           </ListItem>
//           <ListItem button onClick={handleLogout}>
//             <ListItemIcon>
//               {loading ? (
//                 <RingLoader color="#000000" loading={loading} size={24} /> // Render RingLoader when loading
//               ) : (
//                 <MdExitToApp />
//               )}
//             </ListItemIcon>
//             <ListItemText primary="Logout" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </React.Fragment>
//   );
// };

// export default Header;
















import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton,
  Drawer, List, ListItem, ListItemText,
  ListItemIcon, Box, Stack, useMediaQuery
} from '@mui/material';
import {
  MdMenu, MdExitToApp, MdHome, MdAddCircle, MdInfo
} from 'react-icons/md';
import { SiFoodpanda } from 'react-icons/si';
import { RingLoader } from 'react-spinners';

const navItems = [
  { label: 'Home', to: '/all', icon: <MdHome /> },
  { label: 'Create Food', to: '/create', icon: <MdAddCircle /> },
  { label: 'About', to: '/about', icon: <MdInfo /> }
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem('token');
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 3000);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {navItems.map(({ label, to, icon }) => (
          <ListItem button component={NavLink} to={to} key={label}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            {loading ? (
              <RingLoader color="#000000" size={20} />
            ) : (
              <MdExitToApp />
            )}
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#ff4081' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            component={NavLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <SiFoodpanda size={28} />
            <Typography variant="h6" sx={{ ml: 1 }}>
              Kitchen Recipes
            </Typography>
          </Box>

          {isSmallScreen ? (
            <IconButton edge="end" color="inherit" onClick={toggleDrawer} aria-label="menu">
              {loading ? (
                <RingLoader color="#ffffff" size={20} />
              ) : (
                <MdMenu size={24} />
              )}
            </IconButton>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center">
              {navItems.map(({ label, to }) => (
                <NavLink
                  key={label}
                  to={to}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: isActive ? '#fff' : '#ffeef5',
                    fontWeight: isActive ? 'bold' : 'normal'
                  })}
                >
                  {label}
                </NavLink>
              ))}
              <IconButton color="inherit" onClick={handleLogout} aria-label="logout">
                {loading ? (
                  <RingLoader color="#ffffff" size={20} />
                ) : (
                  <MdExitToApp />
                )}
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;

