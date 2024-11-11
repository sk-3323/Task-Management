import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      const token = Cookies.get("token");
      if (token) {
        state.isLoggedIn = true;
        state.user = action.payload;
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      Cookies.remove("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
