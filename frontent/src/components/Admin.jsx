import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
 
  const handleExistingUserClick = () => {
   // Replace '/existing-user' with the actual path you want to navigate to
   navigate('/existinguser');
  };
  const handleNewUserClick = () => {
    // Replace '/existing-user' with the actual path you want to navigate to
    navigate('/newuser');
   };
 
 

 return (
     <div>
          <button onClick={handleExistingUserClick}>Existing User</button>
          <button onClick={handleNewUserClick}>New User</button>
     </div>
 );
};

export default Admin;
