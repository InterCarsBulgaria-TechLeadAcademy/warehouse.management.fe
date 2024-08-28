import { useContext } from 'react';
import { AuthContext } from '@/contexts/Auth'
import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';


export const setTokenCookies = (accessToken: any, refreshToken: any) => {
  // TODO: Talk on later stage (when BE is ready) where to store tokens, also i they are in cookie
  // to look for functionality if the cookie is expired!
  Cookies.set('accessToken', accessToken, { expires: 15 / 1440, secure: true, sameSite: 'Strict' }); // 15 minutes
  Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' }); // 7 days
};

export const getAccessToken = () => Cookies.get('accessToken');
export const getRefreshToken = () => Cookies.get('refreshToken');

export const removeTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const loginUser = async () => {
    try {
      const response = await axiosInstance.post('/api/Auth/login', {
        username: "Ico",
        password: "Asd1!"
      });
      
      const status = response.status
      
      if (status === 200) {
        console.log(response.headers['set-cookie']);
        const requestedUser = await getCurrentLoggedUser()
        
        // requestedUser.role = 'regular' // Uncomment it to change role..
        
        // setUser({ username: requestedUser.userName, role: requestedUser.roles[0]});
        // return { username: requestedUser.userName, role: requestedUser.roles[0] };
      }
      
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  
  // Тази функция е допълнителна която служи за взимане на юзер данните и работи с логин-а заедно..
  const getCurrentLoggedUser = async () => {
    
    try {
      const response = await axiosInstance.get('/api/User/me');
      console.log(response);
      
      return response;
      
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Token might be expired, handle token refresh or re-login
        // Redirect to login or refresh tokens
      } else {
        console.error('Error fetching protected data', error);
      }
    }
    return null;
  }

  const logoutUser = async () => {
    try {
      // logout from BE
      removeTokens();
      setUser(null);
      return;

    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return {
    user,
    setUser,
    loginUser,
    getCurrentLoggedUser,
    logoutUser,
  };
}

export default useAuth;