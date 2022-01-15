import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch } from "../hooks/redux";
import { UserCredentials } from "../types/UserCredentials";
import { loginThunk } from "../redux/thunks/user.thunks";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const checkCredentials = (
    credentials: UserCredentials,
    setSubmitting: any
  ) => {
    dispatch(loginThunk(credentials))
      .unwrap()
      .then(() => {
        setSubmitting(false);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setSubmitting(false);
        console.error(err);
      });
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("The username is required"),
    password: Yup.string()
      .min(8, "The password should have min 8 characters")
      .required("The password is required"),
  });

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const credentials: UserCredentials = {
        username: values.username,
        password: values.password,
      };
      checkCredentials(credentials, setSubmitting);
    },
    validationSchema: LoginSchema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          className={classes.form}
          noValidate
          onSubmit={form.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={form.handleChange}
            value={form.values.username}
            error={form.errors.username && form.touched.username ? true : false}
            helperText={
              form.errors.username && form.touched.username
                ? form.errors.username
                : null
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={form.handleChange}
            value={form.values.password}
            error={form.errors.password && form.touched.password ? true : false}
            helperText={
              form.errors.password && form.touched.password
                ? form.errors.password
                : null
            }
          />

          <LoadingButton
            loadingIndicator="Sing In..."
            loading={form.isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </LoadingButton>
        </Box>
      </div>
      <Box textAlign="center" sx={{ mt: 5 }}>
        <Link to="/signup">Sign Up</Link>
      </Box>
    </Container>
  );
}
