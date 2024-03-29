import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "../../api/user.api";
import { UserCredentials } from "../../types/UserCredentials";
import { UserLocalSesion } from "../../types/UserLocalSesion";

export const loginThunk = createAsyncThunk(
  "users/login",
  async (credentials: UserCredentials, _) => {
    const response = await userAPI.login(credentials);
    const data: UserLocalSesion =  response.data;    
    return data
  }
);

export const logoutThunk = createAsyncThunk(
  "users/logout",
  async () => {
   const response = await  userAPI.logout();
    const data =  response.data;    
    
    return data
  }
);