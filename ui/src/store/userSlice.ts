import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: { email: string; name: string, id: string }; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
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
