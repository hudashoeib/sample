import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  styled,
  Switch,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Info,
  Sunny,
  Bedtime,
  Check,
  Login,
  Language,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

// SignOut

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";

import { auth } from "../firebase";
import useAuthUser from "./useAuthUser";

import { signOut } from "firebase/auth";

// SignOut

const drawerWidth = 240;
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));
function DrawerAppBar(props) {
  const { t, i18n } = useTranslation();
  const { window, toggleBtn, mode } = props;
  // Lang Btn
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Lang Btn
  // SignOut Dialog
  const [open2, setOpen2] = React.useState(false);
  const theme = useTheme();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setOpen2(false);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  // SignOut Dialog End
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();

  const [user] = useAuthUser(auth);
  const navItems = [
    { text: t("home"), icon: <Home />, path: "/" },
    // Only show AllTasks and Create if logged in
    ...(user
      ? [{ text: t("allTasks"), icon: <Info />, path: "/alltasks" }]
      : []),
    // Only show Sign In/Sign Up if not logged in
    ...(!user
      ? [
          { text: t("signin"), icon: <Login />, path: "/signin" },
          { text: t("signup"), icon: <Login />, path: "/signup" },
        ]
      : []),
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Prevent drawer from closing when opening the language menu
  const handleLangButtonClick = (event) => {
    event.stopPropagation();
    handleClick(event);
  };

  // Drawer content

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "background.paper" }}
    >
      <Typography sx={{ my: 2, fontWeight: "900", fontSize: "24px" }}>
        Taskata
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <ListItemText
                primaryTypographyProps={{ sx: { fontSize: "19px" } }}
                sx={{ width: "70%" }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Language list */}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={handleLangButtonClick}
          >
            <Language sx={{ mr: "60px" }} />
            <Typography
              variant="h6"
              color="initial"
              sx={{
                color: "bg.textContrast",
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              {t("lang")}
            </Typography>
          </ListItemButton>
        </ListItem>
        {/* Theme toggle list */}
        <ListItem disablePadding sx={{ marginTop: "10rem" }}>
          <ListItemButton sx={{ textAlign: "center" }} onClick={toggleBtn}>
            <FormControlLabel
              sx={{ marginRight: "20px" }}
              control={<MaterialUISwitch defaultChecked />}
              label="Mode switch"
            />
          </ListItemButton>
        </ListItem>
        {user && (
          <ListItem>
            <ListItemButton onClick={handleClickOpen2}>SignOut</ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
  // Drawer content end

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "background.paper",
          textTransform: "capitalize",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "bg.textContrast" }} />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: { xs: "center", sm: "left" },
              fontWeight: "900",
            }}
          >
            Taskata
          </Typography>
          {/* Theme btn */}
          <Checkbox
            sx={{ display: { xs: "none", sm: "block" } }}
            checked={mode === "dark"}
            onChange={toggleBtn}
            icon={<Bedtime />}
            checkedIcon={<Sunny />}
          />
          {/* Language Btn */}
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              color: "text.primary",
              display: { xs: "none", sm: "block" },
            }}
          >
            {t("lang")}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                i18n.changeLanguage("en");
                handleClose();
              }}
              sx={{
                textAlign: "start",
                justifyContent: "space-between",
                fontSize: "13px",
                padding: "5px,10px",
              }}
            >
              <Typography
                // @ts-ignore
                color={theme.palette.bg.textContrast}
              >
                English
              </Typography>
              {i18n.language === "en" && <Check fontSize="small" />}
            </MenuItem>
            <MenuItem
              dir="auto"
              sx={{
                textAlign: "start",
                justifyContent: "space-between",
                padding: "0px,10px",
              }}
              onClick={() => {
                i18n.changeLanguage("ar");
                handleClose();
              }}
            >
              <Typography
                variant="h6"
                color={
                  // @ts-ignore
                  theme.palette.bg.textContrast
                }
              >
                العربية
              </Typography>
              {i18n.language === "ar" && <Check fontSize="small" />}
            </MenuItem>
          </Menu>
          {/* Drawer Navigation items */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => {
                  navigate(item.path);
                }}
                key={item.text}
                // @ts-ignore
                sx={{ color: theme.palette.bg.textContrast }}
              >
                {item.text}
              </Button>
            ))}
            {user && (
              <Button
                variant="text"
                sx={{ color: theme.palette.text.secondary }}
                onClick={handleClickOpen2}
              >
                SignOut
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/* SignOut Dialog */}
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            width: "70vw",
            height: "25vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to sign out?"}
        </DialogTitle>

        <DialogActions sx={{ justifyContent: "space-between", width: "210px" }}>
          <Button
            variant="contained"
            autoFocus
            onClick={handleSignOut}
            sx={{ color: "background.default" }}
          >
            Yes
          </Button>

          <Button
            variant="contained"
            onClick={handleClose2}
            autoFocus
            sx={{ color: "background.default" }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      {/* SignOut Dialog End */}
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
