import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const uri = "https://blog-app-ux9e.onrender.com";
//const uri = "http://localhost:3500";

export const refresh = createAsyncThunk("refresh", () => {
  return fetch(`${uri}/refresh`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw "unauthorise";
      }
    })
    .catch((err) => console.log(err));
});

export const logout = createAsyncThunk("logout", () => {
  return fetch(`${uri}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    accesstoken: null,
    uri,
  },
  reducers: {
    setAccesstoken: (state, { payload }) => {
      state.accesstoken = payload;
    },
  },
  extraReducers: {
    //refresh function
    [refresh.fulfilled]: (state, { payload }) => {
      state.accesstoken = payload;
    },
    [refresh.rejected]: (state) => {
      state.accesstoken = null;
    },
    //logout
    [logout.fulfilled]: (state) => {
      state.accesstoken = null;
    },
    [logout.rejected]: (state) => {
      state.accesstoken = null;
    },
  },
});

export default AuthSlice.reducer;

export const { setAccesstoken } = AuthSlice.actions;
