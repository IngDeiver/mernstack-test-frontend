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
import { list } from "../api/product.api";
import { AxiosError, AxiosResponse } from "axios";
import { showErrorToast } from "../utils/toast";
import { UserLocalSesion } from "../types/UserLocalSesion";
import { RootState } from "../redux/store";
import { useAppSelector } from "../hooks/redux";

const useStyles = makeStyles({
  right_section: {
    minHeight: "80vh",
  },
});

export default function ListProducts() {
  const classes = useStyles();

  const [products, setProducts] = React.useState<Array<GetProduct>>([]);
  const [fetching, setFetching] = React.useState<boolean>(true);
  const session: UserLocalSesion = useAppSelector(
    (state: RootState) => state.sesion
  );

  const getProducts = () => {
    if (session.access_token) {
      list(session.access_token)
        .then((res: AxiosResponse) => {
          const data: Array<GetProduct> = res.data;
          setProducts(data);
          setFetching(false);
        })
        .catch((err: AxiosError) => showErrorToast(err.message));
    }
  };

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
                              <Button variant="outlined">Remove</Button>
                            </Grid>
                            <Grid item>
                              <Button variant="outlined">Edit</Button>
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
