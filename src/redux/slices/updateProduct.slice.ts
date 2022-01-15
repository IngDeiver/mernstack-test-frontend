import { createSlice } from "@reduxjs/toolkit";

const initialState: string | null = null;

const prodctSlice = createSlice({
  name: "productUpdate",
  initialState,
  reducers: {
    setProductUpdate(_, action) {
      return action.payload;
    },
  },
});

export const { setProductUpdate:setProductUpdateAction } = prodctSlice.actions;
export default prodctSlice.reducer;
