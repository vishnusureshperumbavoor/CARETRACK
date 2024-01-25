// useLogoutTimer.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFakeInactiveUser from './useFakeInactiveUser'; // Adjust the path accordingly
import fake from './fake'; // Import your fake object or logout function

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      fake.logout(); // Assuming you have a function to logout the user
      navigate("/admin");
    };

    let timeoutId;

    if (userIsInactive) {
      timeoutId = setTimeout(handleLogout, 60000); // Set the timeout for 1 minute (adjust as needed)
    }

    return () => {
      clearTimeout(timeoutId); // Cleanup the timeout on component unmount or when user becomes active
    };
  }, [userIsInactive, navigate]);
}

export default useLogoutTimer;
