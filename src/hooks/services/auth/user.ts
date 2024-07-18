import Cookies from 'js-cookie';

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

export default function loginUser() {
  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'emilys',
      password: 'emilyspass',
      expiresInMins: 1, // optional, defaults to 60
    })
  })
    .then(res => res.json())
    .then((response) => {
      setTokenCookies(response.token, response.refreshToken)
      // Redirect after login
    })
    .catch(error => {
      console.error('Error during login:', error);
    });
}