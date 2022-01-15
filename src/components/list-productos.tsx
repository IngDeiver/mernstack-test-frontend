import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { GetProduct } from "../types/GetProducto";
import { AxiosError } from "axios";
import { UserLocalSesion } from "../types/UserLocalSesion";
import { RootState } from "../redux/store";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Swal, { SweetAlertResult } from "sweetalert2";
import toast from "react-hot-toast";
import { fetchProductsThunk } from "../redux/thunks/product.thunks";
import { remove } from "../api/product.api";
import { setProductUpdateAction } from "../redux/slices/updateProduct.slice";

const useStyles = makeStyles({
  right_section: {
    minHeight: "80vh",
  },
});

export default function ListProducts() {
  const classes = useStyles();
  const products: Array<GetProduct> = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();
  const [fetching, setFetching] = React.useState<boolean>(true);
  const session: UserLocalSesion = useAppSelector(
    (state: RootState) => state.sesion
  );

  const getProducts = () => {
    if (session.access_token) {
      dispatch(fetchProductsThunk(session.access_token))
        .unwrap()
        .then(() => {
          setFetching(false);
        })
        .catch((err) => {
          setFetching(false);
          console.error(err);
        });
    }
  };

  const onRemove = (product: GetProduct) => {
    Swal.fire({
      title: "Error!",
      text: `Do you want to remove the produxt ${product.name} ?`,
      icon: "question",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed && session.access_token) {
        toast.promise(
          remove(session.access_token, product._id),
          {
            loading: "Removing...",
            success: () => {
              getProducts();
              return "Product removed";
            },
            error: (error: AxiosError) => {
              return `Something went wrong ${error.message}`;
            },
          },
          { duration: 4000 }
        );
      }
    });
  };

  const setUpdateProductId = (product: GetProduct) => {
    dispatch(setProductUpdateAction(product._id))
  }

  React.useEffect(() => {
    getProducts();
  }, [session]);

  return (
    <Grid item xs={12} md={8}>
      <Paper className={classes.right_section}>
        <Box sx={{ my: 2, pt: 3 }}>
          <Typography align="center" component="h1" variant="h4">
            List of products
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          {products.length > 0 && !fetching && (
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product: GetProduct) => (
                    <React.Fragment key={product._id}>
                      <TableRow hover role="checkbox" tabIndex={-1} key={21}>
                        <TableCell align="left">{product.name}</TableCell>
                        <TableCell align="left">${product.price}</TableCell>
                        <TableCell align="right">
                          <Grid container spacing={1} direction="row-reverse">
                            <Grid item>
                              <Button
                                onClick={() => onRemove(product)}
                                variant="outlined"
                              >
                                Remove
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button onClick={() => setUpdateProductId(product)} variant="outlined">Edit</Button>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {fetching && (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}
          {products.length === 0 && !fetching && (
            <Box textAlign="center">
              <Typography>There are no products</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Grid>
  );
}
