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
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
      }}
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}
