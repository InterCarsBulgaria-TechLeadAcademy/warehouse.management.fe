import { useContext } from 'react';
import { AuthContext } from '@/contexts/Auth'
import axiosInstance from './axiosInstance';

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
        const response = await getCurrentLoggedUser()
        const requestedUser = response?.data
        
        requestedUser.roles[0] = 'regular' // Uncomment it to change role..
        
        setUser({ username: requestedUser.userName, role: requestedUser.roles[0]});
        return { username: requestedUser.userName, role: requestedUser.roles[0] };
      }
      
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  
  // Тази функция е допълнителна която служи за взимане на юзер данните и работи с логин-а заедно..
  const getCurrentLoggedUser = async () => {
    
    try {
      const response = await axiosInstance.get('/api/User/me');
      return response;
      
    } catch (error: any) {
      console.error('Error fetching protected data', error);
    }
    return null;
  }

  const logoutUser = async () => {
    try {
      await axiosInstance.post('/api/Auth/logout');
      setUser(null);

      return;
    } catch (error) {
      setUser(null);
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