import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../hooks/redux";
import { logoutThunk } from "../../redux/thunks/user.thunks";
export default function Header() {
  const dispatch = useAppDispatch();


  const closeSession = () => {
      dispatch(logoutThunk());
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
