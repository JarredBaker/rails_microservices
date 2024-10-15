import {AxiosResponse} from 'axios';
import api from "./baseApi";

interface UserParams {
  user: {
    email: string;
    password: string;
    name: string;
  };
}

interface UserApiResponse extends ApiResponse {
  data: UserType;
}


const AuthApiService = {

  signUp(userData: UserParams): Promise<AxiosResponse<UserApiResponse>> {
    return api.post('/users/signup', userData);
  },

  login(userData: Omit<UserParams, 'name'>): Promise<AxiosResponse<any>> {
    return api.post('/users/login', userData);
  },

  logout(): Promise<AxiosResponse<any>> {
    return api.delete('/users/logout');
  },
};

export default AuthApiService;
