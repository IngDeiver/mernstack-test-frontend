import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { UserLocalSesion } from "../types/UserLocalSesion";
import { RootState } from "../redux/store";
import { logoutThunk } from "../redux/thunks/user.thunks";
export default function Header() {
  const dispatch = useAppDispatch();
  const session: UserLocalSesion = useAppSelector(
    (state: RootState) => state.sesion
  );

  const closeSession = () => {
    if (session.access_token) {
      dispatch(logoutThunk(session.access_token));
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar color="primary">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MERN Stack App by ingDeiver
          </Typography>
          <Button onClick={closeSession} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
