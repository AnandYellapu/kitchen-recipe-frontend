// src/components/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';  // Import the toast module

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show confirmation dialog before logging out
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Clear the authentication token from local storage
            sessionStorage.removeItem('token');

            // Optionally, you can redirect to the home page or handle the logout process accordingly
            navigate('/');

            // Display success notification
            toast.success('Logged out successfully!');
          },
        },
        {
          label: 'No',
          onClick: () => {
            navigate(-1);
            // Do nothing if the user cancels the logout
          },
        },
      ],
    });
  }, [navigate]);

  // Empty component - no UI elements to render
  return null;
};

export default Logout;


