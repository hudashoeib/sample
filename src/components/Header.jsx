import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import React from "react";

const Header = ({ toggleBtn }) => {
  const theme = useTheme();
  return (
    <Box>
      <div>Header</div>
      <IconButton onClick={toggleBtn} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7 sx={{ color: "orange" }} />
        ) : (
          <Brightness4 />
        )}
      </IconButton>
      ;
    </Box>
  );
};

export default Header;
