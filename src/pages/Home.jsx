import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Heart from "Styles/Heart";
import CircularWithValueLabel from "../Styles/Spinner";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <Helmet>
        <title> Home page </title>
        <meta name="description" content="This is the Home page" />
      </Helmet>
      <Box className="parent">
        <Box component="main" className="container">
          <Toolbar />
          <Box>
            {loading ? (
              <CircularWithValueLabel />
            ) : error ? (
              <p style={{ color: "red" }}>Error: {error.message}</p>
            ) : user ? (
              <div>
                <h2>Welcome, {user.displayName || user.email}</h2>
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ mt: 2, fontSize: "0.8rem" }}
                >
                  this is the main content Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Sint temporibus quo cumque et
                  assumenda laboriosam aliquid enim amet voluptatibus esse ipsa
                  obcaecati sit, quam architecto placeat nisi consequatur nam
                  nobis.
                </Typography>
              </div>
            ) : (
              <h2 style={{ marginTop: "140px" }}>
                Please <Link to="/signin">Sign In</Link> to continue <Heart />
              </h2>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
