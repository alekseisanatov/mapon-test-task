import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const response = await fetch('https://api.github.com/users/xiaotian/repos');
    return await response.json();
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    todos: [],
    status: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.todos.push(action.payload)
    })
  },
});

export default userSlice.reducer;