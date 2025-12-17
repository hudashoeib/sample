import React, { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "components/Footer";
import Header from "components/Header";
import getDesignTokens from "Styles/Theme";

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
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header toggleBtn={toggleBtn} />

      <Outlet />

      <Footer />
    </ThemeProvider>
  );
};

export default Root;
