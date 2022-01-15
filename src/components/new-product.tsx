import {
  Button,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { uploadImage, create } from "../api/product.api";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../redux/store";
import { UserLocalSesion } from "../types/UserLocalSesion";
import { showErrorToast } from "../utils/toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CreateProduct } from "../types/CreateProduct";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  left_section: {
    height: "80vh",
  },
});

export default function NewProduct() {
  const classes = useStyles();
  const session: UserLocalSesion = useAppSelector(
    (state: RootState) => state.sesion
  );
  const [image, setImage] = React.useState<File | null>(null);

  const onFileChange = (event: any) => {
    // Update the state
    setImage(event.target.files[0]);
  };

  const saveProduct = (product: CreateProduct, setSubmitting: any) => {
    if (image && session.access_token) {
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append("image", image, image?.name);

      // Details of the uploaded file
      console.log(image);

      // Request made to the backend api
      // Send formData object
      uploadImage(session.access_token, formData)
        .then((res: AxiosResponse) => {
          product.imageUrl = res.data.imageUrl;
          if (session.access_token) {
            toast.promise(
              create(session?.access_token, product),
              {
                loading: "Sign Up...",
                success: () => {
                  setSubmitting(false);
                  form.resetForm()
                  setImage(null)
                  return "Product saved";
                },
                error: (error: AxiosError) => {
                  setSubmitting(false);
                  return `Something went wrong ${error.message}`;
                },
              },
              { duration: 4000 }
            );
          }
        })
        .catch((err: AxiosError) =>
          showErrorToast("Upload iage error : " + err.message)
        );
    } else {
      showErrorToast("Select a image");
    }
  };

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required("The name is required"),
    price: Yup.number().required("The price is required"),
  });

  const form = useFormik({
    initialValues: {
      name: "",
      price: 0,
    },
    onSubmit: (values, { setSubmitting }) => {
      const product: CreateProduct = {
        ...values,
        imageUrl: "",
      };
      saveProduct(product, setSubmitting);
    },
    validationSchema: ProductSchema,
  });

  return (
    <Grid item xs={12} md={4}>
      <Paper className={classes.left_section}>
        <Box sx={{ my: 2, pt: 3 }}>
          <Typography align="center" component="h1" variant="h4">
            New product
          </Typography>
        </Box>
        <Box
          sx={{ p: 2 }}
          component="form"
          noValidate
          onSubmit={form.handleSubmit}
        >
          <Box sx={{ my: 1 }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              size="small"
              label="Name"
              name="name"
              onChange={form.handleChange}
              value={form.values.name}
              error={form.errors.name && form.touched.name ? true : false}
              helperText={
                form.errors.name && form.touched.name ? form.errors.name : null
              }
            />
          </Box>
          <TextField
            variant="outlined"
            required
            type="number"
            fullWidth
            id="price"
            size="small"
            label="Price"
            name="price"
            onChange={form.handleChange}
            value={form.values.price}
            error={form.errors.price && form.touched.price ? true : false}
            helperText={
              form.errors.price && form.touched.price ? form.errors.price : null
            }
          />
          <Box sx={{ my: 1 }}>
            <Input
              inputProps={{ accept: "image/*" }}
              required
              fullWidth
              id="image"
              name="image"
              type="file"
              onChange={onFileChange}
            />
          </Box>
          <Box textAlign="center" sx={{ my: 2 }}>
            <Button type="submit" variant="contained">
              Save product
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
