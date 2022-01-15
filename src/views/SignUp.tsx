import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { User } from "../types/User";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "../../src/api/user.api";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const signup = (user: User, setSubmitting: any) => {
    toast.promise(
      create(user),
      {
        loading: "Sign Up...",
        success: () => {
          setSubmitting(false);
          form.resetForm();
          return "Sign up sucessfull";
        },
        error: (error: AxiosError) => {
          setSubmitting(false);
          return `Something went wrong ${error.message}`;
        },
      },
      { duration: 4000 }
    );
  };

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("The username is required"),
    password: Yup.string().required("The password is required"),
  });

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const user: User = {
        ...values,
      };

      signup(user, setSubmitting);
    },
    validationSchema: SignupSchema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          className={classes.form}
          component="form"
          noValidate
          onSubmit={form.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={form.handleChange}
                value={form.values.username}
                error={
                  form.errors.username && form.touched.username ? true : false
                }
                helperText={
                  form.errors.username && form.touched.username
                    ? form.errors.username
                    : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={form.handleChange}
                value={form.values.password}
                error={
                  form.errors.password && form.touched.password ? true : false
                }
                helperText={
                  form.errors.password && form.touched.password
                    ? form.errors.password
                    : null
                }
              />
            </Grid>
          </Grid>
          <LoadingButton
            loadingIndicator="Sing In..."
            loading={form.isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </LoadingButton>
        </Box>
      </div>
      <Box textAlign="center" sx={{ mt: 5 }}>
        <Link to="/signin">Sign In</Link>p
      </Box>
    </Container>
  );
}
