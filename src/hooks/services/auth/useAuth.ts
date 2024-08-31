import { useContext } from 'react';
import { AuthContext } from '@/contexts/Auth'
import { getWarehouseManagementApi } from '@/services/generated-api';
import { UserDto } from '@/services/model';

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const loginUser = async () => {
    try {
      const response = await getWarehouseManagementApi().postApiAuthLogin({
        username: "Ico",
        password: "Asd1!"
      });
      console.log("Logged user:", response);

      const requestedUser = await getCurrentLoggedUser()

      requestedUser.roles[0] = 'regular' // Uncomment it to change role..

      setUser({ username: requestedUser.userName, role: requestedUser.roles[0] });
      return { username: requestedUser.userName, role: requestedUser.roles[0] };


    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  // Тази функция е допълнителна която служи за взимане на юзер данните и работи с логин-а заедно..
  const getCurrentLoggedUser = async () => {

    try {
      const response = await getWarehouseManagementApi().getApiUserMe()
      return response;

    } catch (error: any) {
      console.error('Error fetching protected data', error);
    }
    return null;
  }

  const logoutUser = async () => {
    try {
      const response = await axiosInstance.post('/api/Auth/logout');
      console.log(response);

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