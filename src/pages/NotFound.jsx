import { Box } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Box sx={{ mt: 10, textAlign: "center" }}>
      <h1>
        Sorry <i className="bi bi-emoji-frown"></i>
      </h1>
      <p>The page you are looking for does not exist.</p>
    </Box>
  );
};

export default NotFound;
