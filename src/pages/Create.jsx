import { Box, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

const Create = () => {
  return (
    <>
      <Helmet>
        <title>Create </title>
        <meta
          name="description"
          content="This is the Create page to craete ur default task"
        />
      </Helmet>
      <Box>
        <Box component="main" className="container">
          <Typography variant="body1" color="primary">
            this is create page
          </Typography>
          <Typography variant="body1" color="primary">
            this is create page Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Veniam ut molestiae quas et optio inventore
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Create;
