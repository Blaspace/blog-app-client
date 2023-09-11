import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const uri = "https://blog-app-ux9e.onrender.com";
//const uri = "http://localhost:3500";

export const getBlog = createAsyncThunk("getblog", () => {
  return fetch(`${uri}/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 403) {
        throw "an error";
      }
    })
    .catch((err) => console.log(err));
});
export const getComment = createAsyncThunk("getcomment", () => {
  return fetch(`${uri}/getcomment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 400) {
        throw "an error";
      }
    })
    .catch((err) => console.log(err));
});

export const getUsers = createAsyncThunk("getusers", () => {
  return fetch(`${uri}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 403) {
      throw "error";
    }
  });
});
export const getLikes = createAsyncThunk("getlikes", () => {
  return fetch(`${uri}/alllike`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 403) {
      throw "error";
    }
  });
});

const BlogSlice = createSlice({
  name: "BlogSlice",
  initialState: {
    users: [],
    blog: null,
    comment: [],
    like: [],
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setBlog: (state, { payload }) => {
      state.blog = payload;
    },
    setComment: (state, { payload }) => {
      state.comment = payload;
    },
    setLike: (state, { payload }) => {
      state.like = payload;
    },
  },
  extraReducers: {
    [getBlog.fulfilled]: (state, { payload }) => {
      state.blog = payload.reverse();
    },
    [getLikes.fulfilled]: (state, { payload }) => {
      state.like = payload;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
    },
    [getComment.fulfilled]: (state, { payload }) => {
      state.comment = payload;
    },
  },
});

export default BlogSlice.reducer;

export const { setBlog, setUsers, setComment, setLike } = BlogSlice.actions;
