import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../type";

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export const selectUser = (state: UserState) => state.user;
export const selectIsLoggedIn = (state: UserState) => state.isLoggedIn;

export default userSlice.reducer;
