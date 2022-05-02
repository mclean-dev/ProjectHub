import React, { useState } from "react";
import { Container, Paper, Grow, Grid, AppBar } from "@mui/material";
import { useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import Pagination from "../Pagination/Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const page = query.get("page") || 1;

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar position="static" color="inherit"></AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper
              elevation={4}
              sx={{ mt: 1, display: "flex", justifyContent: "center" }}
            >
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
