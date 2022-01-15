import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productApi from "../../api/product.api";
import { GetProduct } from "../../types/GetProducto";


export const fetchProductsThunk = createAsyncThunk(
  "products/fetch",
  async (access_token: string, _) => {
    const response = await productApi.list(access_token);
    const data: Array<GetProduct>  =  response.data;    
    return data
  }
);
