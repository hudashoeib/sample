import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
// import AppTheme from "../shared-theme/AppTheme";
// import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { GoogleIcon } from "./CustomIcons";
// SignIn Auth
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailVal = (email || "").trim();
    const passwordVal = password || "";

    let valid = true;
    if (!emailVal || !/\S+@\S+\.\S+/.test(emailVal)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!passwordVal || passwordVal.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!valid) return;

    try {
      await signInWithEmailAndPassword(auth, emailVal, passwordVal);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err?.code, err?.message);
      let msg = "Sign in failed. Please try again.";
      switch (err?.code) {
        case "auth/invalid-email":
          msg = "Invalid email format.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/configuration-not-found":
          msg = "Invalid email or password. Please try again.";
          break;
        case "auth/user-disabled":
          msg = "This account has been disabled.";
          break;
        default:
          msg = err?.message || msg;
      }
      setPasswordError(true);
      setPasswordErrorMessage(msg);
      setFormError(msg);
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign in:", result.user);
      navigate("/");
    } catch (err) {
      console.error("Google sign in error:", err.code, err.message);
      let msg = "Google sign in failed. Please try again.";
      switch (err.code) {
        case "auth/popup-closed-by-user":
          msg = "Google sign in was cancelled.";
          break;
        case "auth/account-exists-with-different-credential":
          msg = "An account already exists with this email.";
          break;
        default:
          break;
      }
      setFormError(msg);
    }
  };

  return (
    <Box {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card
          variant="outlined"
          sx={{ background: "btn.main", color: "btn.textContrast" }}
        >
          <Typography
            component="h1"
            variant="h4"
            color="secondary"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
            }}
          >
            Sign in
          </Typography>
          {formError ? (
            <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
              {formError}
            </Typography>
          ) : null}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: `${theme.palette.background.paper} !important`,
                  },
                  "& input": {
                    backgroundColor: `${theme.palette.background.paper} !important`,
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                    WebkitTextFillColor: theme.palette.text.primary,
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: `${theme.palette.background.paper} !important`,
                  },
                  "& input": {
                    backgroundColor: `${theme.palette.background.paper} !important`,
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset !important`,
                    WebkitTextFillColor: theme.palette.text.primary,
                  },
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: theme.palette.secondary.main,
                },
              }}
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              sx={{
                backgroundColor: theme.palette.primary.main + " !important",
                color: theme.palette.primary.contrastText + " !important",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark + " !important",
                },
              }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              color="secondary"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider color="primary" sx={{ color: "text.secondary" }}>
            or
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleSignIn}
              color="secondary"
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                color: "text.primary",
                fontSize: "0.8rem",
              }}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                variant="body2"
                sx={{
                  alignSelf: "center",
                  fontWeight: "500",
                  color: "secondary.main",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "8px",
                  fontSize: "0.8rem",
                }}
              >
                {" "}
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </Box>
  );
}
