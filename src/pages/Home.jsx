import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title> Home page </title>
        <meta name="description" content="This is the Home page" />
      </Helmet>
      <Box className="parent">
        <Box component="main" className="container">
          <Toolbar />
          <Typography>
            consequuntur dignissimos numquam at nisi porro a, quaerat rem
            repellendus. Voluptates perspiciatis, in pariatur impedit, nam
            facilis libero dolorem dolores sunt inventore perferendis, aut
            sapiente modi nesciunt.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
