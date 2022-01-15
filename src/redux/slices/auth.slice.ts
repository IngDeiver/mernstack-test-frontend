import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk } from "../thunks/user.thunks";
import {
  showErrorToast,
  showLoadingToast,
  dismissToast,
} from "../../utils/toast";
import { UserLocalSesion } from "../../types/UserLocalSesion";

var toastId: any = null;

const initialState = {
  access_token: null,
  username: null,
} as UserLocalSesion;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, () => {
        toastId = showLoadingToast();
        return initialState;
      })
      .addCase(logoutThunk.pending, () => {
        toastId = showLoadingToast();
        return initialState;
      })
      .addCase(
        loginThunk.fulfilled,
        (_, action: PayloadAction<UserLocalSesion>) => {
          if (toastId) {
            dismissToast(toastId);
            toastId = null;
          }

          return action.payload;
        }
      )
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(loginThunk.rejected, (_, action) => {
        if (toastId) {
          dismissToast(toastId);
          toastId = null;
        }
        let message: any = `Error: ${action.error.message}`;

        if (action.error.message?.includes("Unauthorized")) {
          showErrorToast("Credenciales incorrectas o la cuenta no existe");
        } else {
          showErrorToast(message);
        }
        return initialState;
      })
      .addCase(logoutThunk.rejected, (_, action) => {
        if (toastId) {
          dismissToast(toastId);
          toastId = null;
        }
        // let message: any = `Error: ${action.error.message}`;
        // showErrorToast(message);
      });
  },
});

export default userSlice.reducer;
