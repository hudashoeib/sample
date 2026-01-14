import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useTranslation } from "react-i18next";

import CircularWithValueLabel from "../Styles/Spinner";
import Heart2 from "Styles/HeartSmall/Heart2";
import AllTasks from "./AllTasks";

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
          {/* <Toolbar /> */}
          <Box>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  minHeight: "100vh",
                  width: "100vw",
                }}
              >
                <CircularWithValueLabel />
              </div>
            ) : error ? (
              <p style={{ color: "red" }}>Error: {error.message}</p>
            ) : user ? (
              <AllTasks />
            ) : (
              // <div>
              //   <h2>Welcome, {user.displayName || user.email}</h2>
              //   <Typography
              //     variant="body1"
              //     color="text.primary"
              //     sx={{ mt: 2, fontSize: "0.8rem" }}
              //   >
              //     this is the main content Lorem ipsum dolor sit amet,
              //     consectetur adipisicing elit. Sint temporibus quo cumque et
              //     assumenda laboriosam aliquid enim amet voluptatibus esse ipsa
              //     obcaecati sit, quam architecto placeat nisi consequatur nam
              //     nobis.
              //   </Typography>
              // </div>
              <Grid
                container
                className="no-tasks-container"
                justifyContent="center"
                alignItems="center"
              >
                <Grid size={10} textAlign="center" className="no-tasks-message">
                  <Typography
                    textAlign="center"
                    sx={{
                      fontSize: { xs: "1.3rem", sm: "2.3rem", md: "2.3rem" },
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
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        width: "100%",
                        maxWidth: "100%",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 2px 8px rgba(54, 25, 25, 0.87)"
                            : "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        className="img-task"
                        src="/plans.png"
                        alt="plans illustration"
                        loading="lazy"
                        height={"200px"}
                        style={{
                          borderRadius: "12px",
                          width: "100%",
                          objectFit: "cover",
                          pointerEvents: "none",
                          display: "block",
                        }}
                      />
                      {/* image overlay */}
                      <Box
                        className="image-overlay"
                        sx={{
                          pointerEvents: "none",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          borderRadius: "12px",
                          background:
                            theme.palette.mode === "dark"
                              ? "linear-gradient(135deg, rgba(216, 210, 140, 0.7) 0%, rgba(60,60,60,0.3) 100%)"
                              : "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(200,200,200,0.2) 100%)",
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 2px 8px rgba(54, 25, 25, 0.87)"
                              : "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                    </Box>
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
