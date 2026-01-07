import { Box, Grid, Toolbar, Typography, useTheme } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useTranslation } from "react-i18next";

import CircularWithValueLabel from "../Styles/Spinner";
import Heart2 from "Styles/HeartSmall/Heart2";

const Home = () => {
  const theme = useTheme();
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();
  return (
    <>
      <Helmet>
        <title> Home page </title>
        <meta name="description" content="This is the Home page" />
      </Helmet>
      <Box
        className="parent"
        // @ts-ignore
        sx={{ backgroundColor: theme.palette.bg.main }}
      >
        <Box component="main" className="container">
          <Toolbar />
          <Box>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularWithValueLabel />
              </div>
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
              <Grid
                container
                className="no-tasks-container"
                justifyContent="center"
                alignItems="center"
                mt={4}
              >
                <Grid
                  size={10}
                  textAlign="center"
                  className="no-tasks-message"
                  mt={5}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "2.5rem", md: "2.5rem" },
                    }}
                    color="bg.textContrast"
                  >
                    Let's make Life Easier!
                  </Typography>
                  <Grid
                    size={8}
                    margin="2rem auto"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src="/plans.jpg"
                      alt="plans illustration"
                      loading="lazy"
                      height={"200px"}
                    />
                  </Grid>

                  <Grid
                    size={11}
                    alignContent="center"
                    margin="2rem auto"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection:
                        i18n.language === "ar" ? "row-reverse" : "row",
                    }}
                  >
                    <Typography
                      dir="auto"
                      textAlign="center"
                      color="text.primary"
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                        marginLeft: "5px",
                        marginRight: "5px",
                        fontWeight: "600",
                      }}
                    >
                      {t("to_continue_please")}
                    </Typography>
                    <Link to="/signin">{t("sign_in")}</Link>
                    {/* <Typography
                      dir="auto"
                      textAlign="center"
                      color="text.primary"
                      sx={{
                        fontSize: "1rem",
                        marginRight: "5px",
                        marginLeft: "5px",
                      }}
                    >
                      {t("please")}
                    </Typography> */}
                    <div
                      style={{
                        marginLeft: "8px",
                        marginRight: "8px",
                        fontSize: "20px",
                      }}
                    >
                      <Heart2 />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              // <h2 style={{ marginTop: "140px" }}>
              //   Please <Link to="/signin">Sign In</Link> to continue <Heart />
              // </h2>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
