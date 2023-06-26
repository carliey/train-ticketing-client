import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface UsersState {
  user: any;
  token: string | null;
}
interface UserData {
  user: any;
}

const initialState: UsersState = { user: null, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UsersState>) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem("credentials", JSON.stringify(action.payload));
    },
    updateUser: (state, action: PayloadAction<UserData>) => {
      const newUser = { ...state.user, ...action.payload };
      state.user = newUser;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("credentials");
    },
  },
});

export const { login, updateUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
