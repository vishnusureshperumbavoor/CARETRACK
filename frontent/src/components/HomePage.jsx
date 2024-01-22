import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const headingVariants = {
 hidden: { y: "100vh" },
 visible: { 
 y: "0vh",
 transition: {
 type: "spring",
 mass: 0.4,
 damping: 1,
 },
 },
};

const buttonVariants = {
    hidden: { scale: 0.5, x: '-100vw' }, // Start from left
    visible: { 
    scale: 1,
    x: 0,
    transition: {
    duration: 1, // Increase duration to slow down animation
    },
    },
   };
   
   const buttonVariantsRight = {
    hidden: { scale: 0.5, x: '100vw' }, // Start from right
    visible: { 
    scale: 1,
    x: 0,
    transition: {
    duration: 1, // Increase duration to slow down animation
    },
    },
   };
   

   const Button = ({ children, onClick, variants, to }) => {
    const navigate = useNavigate();
   
    const handleOnClick = (event) => {
    if (typeof onClick === 'function') {
     onClick(event);
    }
    navigate(to);
    };
   
    return (
    <motion.button 
     variants={variants} 
     initial="hidden" 
     animate="visible"
     onClick={handleOnClick} 
     style={{ 
        margin: '10px',
        padding: '15px 25px', // Increased padding
        fontSize: '20px', // Increased font size
        backgroundColor: '#00838f',
        color: '#ffffff',
        borderRadius: '5px',
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease 0s',
        }}
    >
     {children}
    </motion.button>
    );
   };
   
   
   

const HomePage = () => {
 const [showOptions, setShowOptions] = React.useState(false);

 useEffect(() => {
 const handleClick = () => {
 setShowOptions(true);
 };

 document.addEventListener('click', handleClick);

 // Cleanup function
 return () => {
 document.removeEventListener('click', handleClick);
 };
 }, []);

 return (
 <div style={{ textAlign: 'center', backgroundColor: '#e0f7fa', padding: '280px' }}>
 <motion.h1 
 variants={headingVariants} 
 initial="hidden" 
 animate="visible"
 onAnimationComplete={() => setShowOptions(true)}
 style={{ color: '#00838f', fontSize: '100px' }}
 >
 CareTrack
 </motion.h1>
 {showOptions && (
 <>
<Button variants={buttonVariants} to="showdata">Show Data</Button>
 <Button variants={buttonVariantsRight} to="editdata">Edit Data</Button>
 </>
 )}
 <Link to="/admin"></Link>
 </div>
 );
};

export default HomePage;
