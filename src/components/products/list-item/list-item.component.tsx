import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Button, Grid } from "@material-ui/core";
import { GetProduct } from "../../../types/GetProducto";

type ListItemComponentProps = {
  product: GetProduct;
  onRemove: Function;
  setUpdateProductId: Function
};

const ListItemComponent = ({ product, onRemove, setUpdateProductId }: ListItemComponentProps) => {
  
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={21}>
      <TableCell align="left">{product.name}</TableCell>
      <TableCell align="left">${product.price}</TableCell>
      <TableCell align="right">
        <Grid container spacing={1} direction="row-reverse">
          <Grid item>
            <Button onClick={() => onRemove(product)} variant="outlined">
              Remove
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setUpdateProductId(product)}
              variant="outlined"
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ListItemComponent);
