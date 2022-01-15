import {
  Box,
  Container,
  Grid,
} from "@material-ui/core";
import React from "react";
import Header from "../components/header/header";
import { CreateProduct, ListProducts } from "../components";


export default function App() {

  return (
    <React.Fragment>
      <Header/>
      <Box sx={{ bgcolor: "#f5f6fa", height: "100%" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <CreateProduct/>
            <ListProducts/>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}
