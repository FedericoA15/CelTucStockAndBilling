import axiosInstance from "@/utils/axiosInstance";
import Cookies from 'js-cookie';

export async function loginAuth(username: string, password: string): Promise<AuthenticationResponse> {
  const body: object = { username, password };
  const response = await axiosInstance.post<AuthenticationResponse>('/authenticate', body);
  const data = response.data;

  Cookies.set('jwt', data.jwt);
  Cookies.set('id', data.id);
  Cookies.set('username', data.username);
  Cookies.set('roles', JSON.stringify(data.roles));

  return data;
}
