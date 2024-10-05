import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  value: Record<string, any>;
  isLogin: boolean;
}

const initialState: AuthState = {
  value: {},
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<Record<string, any>>) => {
      state.value = action.payload;

      if (action.payload.accessToken) {
        state.isLogin = true;
        localStorage.setItem("token", action.payload.accessToken);
      }
    },
    signOutUser: (state) => {
      state.isLogin = false;
      localStorage.removeItem("token");
      state.value = {};
    },
  },
});

export const { registerUser, signOutUser } = authSlice.actions;
export default authSlice.reducer;
