import * as React from 'react'
import { AuthContext } from '@/contexts/Auth'
import Cookies from 'js-cookie';

export const useAuth = () => {
  return React.useContext(AuthContext)
}

const setTokenCookies = (accessToken: any, refreshToken: any) => {
  Cookies.set('accessToken', accessToken, { expires: 15 / 1440, secure: true, sameSite: 'Strict' }); // 15 minutes
  Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'Strict' }); // 7 days
};

const getAccessToken = () => Cookies.get('accessToken');
const getRefreshToken = () => Cookies.get('refreshToken');

const removeTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export async function loginUser() {
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 1, // optional, defaults to 60
      })
    })

    const data = await response.json()
    setTokenCookies(data.token, data.refreshToken)
    const requestedUser = await getUserFromCookies()
    // requestedUser.role = 'regular' // Uncomment it to change role..
    return { username: requestedUser.username, role: requestedUser.role };
  } catch (error) {
    console.error('Error during login:', error);
  }
}

// Тази функция е допълнителна която служи за взимане на юзер данните и работи с логин-а заедно..
export async function getUserFromCookies() {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  if (!accessToken) {
    // Redirect to login..
    // After that try to handle refresh token..
    return null;
  }

  try {
    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    const user = await response.json()
    console.log('response', user);

    return user;

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

export async function logoutUser() {
  try {
    // logout from BE

    removeTokens();
    return;
  } catch (error) {
    console.error('Error during logout:', error);
  }
}