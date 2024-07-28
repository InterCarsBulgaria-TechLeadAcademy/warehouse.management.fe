import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokenCookies, removeTokens } from './useAuth';

// TODO: replace this instance with our one!
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('interceptor error', error);
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const response = await axiosInstance.post('/auth/refresh', {
            refreshToken: refreshToken,
          });

          const { token: newAccessToken, refreshToken: newRefreshToken } = response.data;
          setTokenCookies(newAccessToken, newRefreshToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          removeTokens();
          // Optionally, you can trigger a redirect to login page here
        }
      } else {
        removeTokens();
        // Optionally, you can trigger a redirect to login page here
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
