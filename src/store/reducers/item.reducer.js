import { createSlice } from "@reduxjs/toolkit";

const ItemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    addItem: (state, action) => {

    }
  }
})

export default ItemsSlice.reducer;

export const {
  addItem
} = ItemsSlice.actions;