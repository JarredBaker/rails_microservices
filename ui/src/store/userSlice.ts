import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state for the user slice
interface UserState {
  user: {
    email: string;
    name: string;
    id: number;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false, // Add this flag
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: { email: string; name: string, id: number }; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true; // User is authenticated when token is set
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // User is logged out
    },
  },
});

export const {setUser, logout} = userSlice.actions;

export default userSlice.reducer;
