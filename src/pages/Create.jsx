import { Edit } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
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
      <Box className="parent-create">
        <Grid
          container
          component="main"
          className="container "
          justifyContent={"center"}
        >
          {/* Title Section */}
          <Grid size={{ xs: 6, md: 6 }} className="left-create">
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
              mt={4}
            >
              <Typography variant="h3" className="title-create">
                Task Titile
              </Typography>
              <IconButton>
                <Edit fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>
          {/* End Title Section */}
          <Grid size={{ xs: 8, md: 10 }} className="right-create"></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Create;
