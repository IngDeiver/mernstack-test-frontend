import {
  Button,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { ChangeEventHandler } from "react";
import Box from "@mui/material/Box";
import { GetProduct } from "../../../types/GetProducto";


const useStyles = makeStyles({
  left_section: {
    height: "80vh",
  },
  cancelBtn: {
    marginLeft: 10,
  },
});

type CreateProductComponentProps = {
  form: any;
  productToUpdate: GetProduct | null;
  productUpdateId: string | null;
  onFileChange: ChangeEventHandler<HTMLInputElement>
  cancelUpdateProduct: any;
};

const CreateProductComponent = ({
  productToUpdate,
  productUpdateId,
  onFileChange,
  cancelUpdateProduct,
  form
}: CreateProductComponentProps) => {
  const classes = useStyles();

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
};

export default React.memo(CreateProductComponent);
