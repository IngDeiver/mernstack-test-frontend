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
  async (access_token: string, _) => {
   const response = await  userAPI.logout(access_token);
    const data =  response.data;    
    console.log("-->", data);
    
    return data
  }
);