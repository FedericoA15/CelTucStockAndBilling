import axiosInstance from "@/utils/axiosInstance";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export async function loginAuth(username: string, password: string): Promise<AuthenticationResponse> {
  const body: object = { username, password };
  
  const loadingToast = toast.loading("Authenticating...");

  try {
    const response = await axiosInstance.post<AuthenticationResponse>('/authenticate', body);
    const data = response.data;

    Cookies.set('jwt', data.jwt);
    Cookies.set('id', data.id);
    Cookies.set('username', data.username);
    Cookies.set('roles', data.roles[0]);

    toast.update(loadingToast, { render: "Ingreso Correcto", type: "success", isLoading: false, autoClose: 3000 });
    
    return data;
  } catch (error) {
    toast.update(loadingToast, { render: "Ingreso Incorrecto! Vuelve a intentar!", type: "error", isLoading: false, autoClose: 3000 });
    throw error;
  }
}
