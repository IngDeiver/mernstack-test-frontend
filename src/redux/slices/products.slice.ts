import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  showErrorToast,
  showLoadingToast,
  dismissToast,
} from "../../utils/toast";
import { GetProduct } from "../../types/GetProducto";
import { fetchProductsThunk } from "../thunks/product.thunks";

var toastId: any = null;

const initialState: Array<GetProduct> = []

const prodctSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProductsThunk.fulfilled,
        (_, action: PayloadAction<Array<GetProduct>>) => {
          if (toastId) {
            dismissToast(toastId);
            toastId = null;
          }

          return action.payload;
        }
      )
      .addCase(fetchProductsThunk.rejected, (_, action) => {
        if (toastId) {
          dismissToast(toastId);
          toastId = null;
        }
        let message: any = `Getting products error: ${action.error.message}`;
        showErrorToast(message);
        return initialState;
      })
  },
});

export default prodctSlice.reducer;
