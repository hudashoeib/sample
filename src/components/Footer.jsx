// import React, { use } from "react";
// import { useTheme } from "styled-components";

// const Footer = () => {
//   const theme = useTheme();
//   return (
//     <footer
//       style={{
//         textAlign: "center",
//         padding: "1rem 0",
//         backgroundColor: theme.palette.background.paper,
//       }}
//     >
//       &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
//     </footer>
//   );
// };

// export default Footer;

/////////////////////////////////
// New Footer

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";

import { Typography } from "@mui/material";

export default function LabelBottomNavigation() {
  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        border: "1px solid gray",
        clear: "both",
        bgcolor: "background.paper",
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "64px",
      }}
    >
      <Typography> All rights reserved.&copy; HudaShoeib.</Typography>
    </BottomNavigation>
  );
}
