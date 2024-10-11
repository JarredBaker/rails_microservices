import axios, {AxiosResponse} from 'axios';

// TypeScript interface for the request params
interface UserParams {
  user: {
    email: string;
    password: string;
    name: string;
  };
}

interface UserData {
  id: number;
  email: string;
  name: string;
}

interface ApiResponse {
  status: {
    code: number;
    message: string;
  };
  data: UserData;
}


// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json'
  },
});

// API Service object
const AuthApiService = {
  // Function to send a user sign-up request
  signUp(userData: UserParams): Promise<AxiosResponse<ApiResponse>> {
    return api.post('/users/signup', userData);
  },

  // Function to send a login request
  login(userData: Omit<UserParams, 'name'>): Promise<AxiosResponse<any>> {
    return api.post('/users/login', userData);
  },

  // Other user-related requests can go here (e.g., fetching user details)
  fetchUserDetails(userId: string): Promise<AxiosResponse<any>> {
    return api.get(`/users/${userId}`);
  }
};

export default AuthApiService;
