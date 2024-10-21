import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Configure axios default timeout (10 seconds in this example)
axios.defaults.timeout = 10000; // Set timeout limit in milliseconds

// Create the interceptor
const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response, // Return the response as it is if no error
    (error) => {
      if (error.code === 'ECONNABORTED') {
        // Handle network timeout
        const navigate = useNavigate(); // Use `useNavigate` to programmatically navigate
        navigate('/network-error'); // Redirect to a route for network errors
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
