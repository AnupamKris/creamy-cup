import { createSlice } from "@reduxjs/toolkit";

export const authStateSlice = createSlice({
  name: "authState",
  initialState: {
    token: "",
    user: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUser } = authStateSlice.actions;
export default authStateSlice.reducer;
