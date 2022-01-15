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
import { GetProduct } from "../../../types/GetProducto";
import { ItemListProduct } from '../../'

const useStyles = makeStyles({
  right_section: {
    minHeight: "80vh",
  },
});

export type ListProductsComponentProps = {
  products: Array<GetProduct>;
  fetching: boolean;
};

const ListProductsComponent = ({
  products,
  fetching,

}: ListProductsComponentProps) => {
  const classes = useStyles();
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
                      <ItemListProduct key={product._id} product={product}/>
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
};

export default React.memo(ListProductsComponent);
