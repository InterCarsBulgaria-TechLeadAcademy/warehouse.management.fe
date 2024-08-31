import { useContext } from 'react';
import { AuthContext } from '@/contexts/Auth'
import { getWarehouseManagementApi } from '@/services/generated-api';
import { LoginFormData } from '@/schemas/loginSchema';

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const loginUser = async (data: LoginFormData) => {
    try {
      await getWarehouseManagementApi().postApiAuthLogin({
        username: data.username,
        password: data.password
      });

      const requestedUser = await getCurrentLoggedUser()

      const username = requestedUser?.userName ?? null;
      const role = requestedUser?.roles?.[0] ?? null;

      const user = username && role ? { username, role } : null;

      setUser(user);
      return user;


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
      // const response = await axiosInstance.post('/api/Auth/logout');
      // console.log(response);

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