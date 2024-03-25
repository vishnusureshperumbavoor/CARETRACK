import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function Appdraw() {
 const [open, setOpen] = React.useState(false);

 const handleDrawerOpen = () => {
 setOpen(true);
 };

 const handleDrawerClose = () => {
 setOpen(false);
 };

 return (
 <>
   <AppBar position="static" style={{ backgroundColor: '#00838f', color: 'white' }}>
     <Toolbar>
       <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
         <MenuIcon />
       </IconButton>
       <Typography variant="h6">
       
       </Typography>
       <Box sx={{ flexGrow: 1 }} />
       <Button color="inherit"><Link to="/about">About</Link></Button>
     </Toolbar>
   </AppBar>
   <Drawer anchor="left" open={open} onClose={handleDrawerClose} PaperProps={{ style: { backgroundColor: '#00838f', color: '#e0f7fa' } }}>
     <List>
       <ListItem button onClick={handleDrawerClose}>
         <Button variant='contained' ><Link to="/button">
           <ListItemText primary="Patient INFO" /></Link>
         </Button>
       </ListItem>
       <ListItem button onClick={handleDrawerClose}>
         <Button variant='contained'><Link to="/dashboard">
           <ListItemText primary="New Patient" /></Link>
         </Button>
       </ListItem>
     </List>
   </Drawer>
 </>
 );
}

export default Appdraw;
