import axios from 'axios';

// TODO: replace this instance with our one!
const axiosInstance = axios.create({
  baseURL: 'https://leads-academy-intercars.com', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("RESPONSE", response);
    
    return response
  },
  
  async (error) => {
    const originalRequest = error.config;
    console.log('interceptor error', error);
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      
        try {
          const response = await axiosInstance.post('/api/User/me');

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Clear application state if refresh fails
          // Optionally, you can trigger a redirect to login page here
        }
      
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
