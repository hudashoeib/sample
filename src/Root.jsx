import React, { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Footer from "components/Footer";

import getDesignTokens from "Styles/Theme";
import DrawerAppBar from "components/Header";
import { Helmet } from "react-helmet-async";

const Root = () => {
  const [mode, setmyMode] = useState(
    localStorage.getItem("mode") === null
      ? "light"
      : localStorage.getItem("mode")
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const toggleBtn = () => {
    theme.palette.mode === "light" ? setmyMode("dark") : setmyMode("light");

    localStorage.setItem(
      "mode",
      theme.palette.mode === "light" ? "dark" : "light"
    );
  };

  return (
    <>
      <Helmet>
        <title> </title>
        <meta name="description" content="This is the contact page" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <DrawerAppBar toggleBtn={toggleBtn} mode={mode} />

        <Toolbar />

        <Outlet />

        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Root;
