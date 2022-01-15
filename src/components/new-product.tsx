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
import { uploadImage, create, getById, update } from "../api/product.api";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { RootState } from "../redux/store";
import { UserLocalSesion } from "../types/UserLocalSesion";
import { showErrorToast } from "../utils/toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CreateProduct } from "../types/CreateProduct";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import { fetchProductsThunk } from "../redux/thunks/product.thunks";
import { GetProduct } from "../types/GetProducto";
import { setProductUpdateAction } from "../redux/slices/updateProduct.slice";
import { UpdateProduct } from "../types/UpdateProduct";

const useStyles = makeStyles({
  left_section: {
    height: "80vh",
  },
  cancelBtn: {
    marginLeft: 10,
    marginTop:10
  },
});

export default function NewProduct() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const session: UserLocalSesion = useAppSelector(
    (state: RootState) => state.sesion
  );
  const [image, setImage] = React.useState<File | null>(null);
  const [productToUpdate, setProductToUpdate] =
    React.useState<GetProduct | null>(null);
  const productUpdateId: string | null = useAppSelector(
    (state: RootState) => state.updateProductId
  );

  const onFileChange = (event: any) => {
    // Update the state
    setImage(event.target.files[0]);
  };

  const updateProduct = (newDataProduct: UpdateProduct) => {
    if (session.access_token && productToUpdate) {
      toast.promise(
        update(session.access_token, newDataProduct),
        {
          loading: "Updating product",
          success: (res: AxiosResponse) => {
            if (session.access_token)
              dispatch(fetchProductsThunk(session.access_token));
            dispatch(setProductUpdateAction(null));
            setProductToUpdate(null)
            //form.resetForm()
            return "Product updated";
          },
          error: (error: AxiosError) => {
            return `Something went wrong ${error.message}`;
          },
        },
        { duration: 4000 }
      );
    }
  };

  const saveProduct = (product: CreateProduct, setSubmitting: any) => {
    if (image && session.access_token) {
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append("image", image, image?.name);

      // Details of the uploaded file

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
                  form.resetForm();
                  setImage(null);
                  if (session.access_token)
                    dispatch(fetchProductsThunk(session.access_token));
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

  const cancelUpdateProduct = () => {
    dispatch(setProductUpdateAction(null));
    setProductToUpdate(null);
    form.resetForm();
  };

  const getProduct = () => {
    if (session.access_token && productUpdateId) {
      toast.promise(
        getById(session.access_token, productUpdateId),
        {
          loading: "Getting product",
          success: (res: AxiosResponse) => {
            setProductToUpdate(res.data);
            return "Product found";
          },
          error: (error: AxiosError) => {
            return `Something went wrong ${error.message}`;
          },
        },
        { duration: 4000 }
      );
    }
  };

  React.useEffect(() => {
    if (productUpdateId) {
      getProduct();
    }
  }, [productUpdateId]);

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required("The name is required"),
    price: Yup.number().required("The price is required"),
  });

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productToUpdate ? productToUpdate.name : "",
      price: productToUpdate ? productToUpdate.price : 0,
    },
    onSubmit: (values, { setSubmitting }) => {
      if (productToUpdate) {
        const product: any = {
          ...values,
          _id: productToUpdate._id
        };
        updateProduct(product);
      } else {
        const product: CreateProduct = {
          ...values,
          imageUrl: "",
        };

        saveProduct(product, setSubmitting);
      }
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
            inputProps={{ min: 0 }}
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
            {productToUpdate && (
              <Box textAlign={"center"}>
                <a href={productToUpdate.imageUrl}>
                  {productToUpdate.imageUrl}
                </a>
              </Box>
            )}
          </Box>
          <Box textAlign="center" sx={{ my: 2 }}>
            <Button type="submit" variant="contained">
              {productUpdateId ? "Update product" : "Save product"}
            </Button>
            {productUpdateId && (
              <Button
                onClick={cancelUpdateProduct}
                className={classes.cancelBtn}
                variant="contained"
              >
                Cancel update
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
