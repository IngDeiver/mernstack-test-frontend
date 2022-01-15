import {
  Box,
  Container,
  Grid,
} from "@material-ui/core";
import React from "react";
import NewProduct from "../components/new-product";
import ListProducts from "../components/list-productos";
import Header from "../components/header";


export default function App() {

  return (
    <React.Fragment>
      <Header/>
      <Box sx={{ bgcolor: "#f5f6fa", height: "100%" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <NewProduct/>
            <ListProducts/>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}
