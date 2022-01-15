import {
  Box,
  Button,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    left_section: {
      height: "80vh",
    }
  });

export default function NewProduct() {
    const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Paper className={classes.left_section}>
        <Box sx={{ my: 2, pt: 3 }}>
          <Typography align="center" component="h1" variant="h4">
            New product
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box sx={{ my: 1 }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              size="small"
              label="Name"
              name="name"
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
          />
          <Box sx={{ my: 1 }}>
            <Input
              inputProps={{ accept: "image/*" }}
              required
              fullWidth
              id="image"
              name="image"
              type="file"
            />
          </Box>
          <Box textAlign="center" sx={{ my: 2 }}>
            <Button variant="contained">Save product</Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
