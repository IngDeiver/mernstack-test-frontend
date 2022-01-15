import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/user.thunks";
import { showErrorToast, showLoadingToast, dismissToast } from '../../utils/toast'
import { UserLocalSesion } from "../../types/UserLocalSesion";

var toastId: any = null
 

const initialState = {
  access_token: null,
  username: null
} as UserLocalSesion;


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginThunk.pending, () => {
      toastId = showLoadingToast()
      return initialState
    })
    .addCase(loginThunk.fulfilled, (_, action: PayloadAction<UserLocalSesion>) => {
        if(toastId){
          dismissToast(toastId)
          toastId = null
        }
        
        return action.payload
      })
    .addCase(loginThunk.rejected, (_, action ) => {
       if(toastId){
          dismissToast(toastId)
          toastId = null
        }
      let message: any = `Error: ${action.error.message}`

      if (action.error.message?.includes("Unauthorized")){
        showErrorToast("Credenciales incorrectas o la cuenta no existe")
      } else {
        showErrorToast(message)
      }
      return initialState
    })
  },
});

export const { logout:  logoutAction } = userSlice.actions
export default userSlice.reducer