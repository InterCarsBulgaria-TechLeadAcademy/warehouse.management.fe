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
      const response = await axiosInstance.post('/auth/login', {
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 1, // optional, defaults to 60
      });

      const data = await response.data
      setTokenCookies(data.token, data.refreshToken)
      const requestedUser = await getUserFromCookies()
      // requestedUser.role = 'regular' // Uncomment it to change role..
      setUser({ username: requestedUser.username, role: requestedUser.role });
      return { username: requestedUser.username, role: requestedUser.role };
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  // Тази функция е допълнителна която служи за взимане на юзер данните и работи с логин-а заедно..
  const getUserFromCookies = async () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()

    if (!accessToken) {
      // Redirect to login..
      // After that try to handle refresh token..
      return null;
    }

    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data;

    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Token might be expired, handle token refresh or re-login
        removeTokens();
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
    getUserFromCookies,
    logoutUser,
  };
}

export default useAuth;