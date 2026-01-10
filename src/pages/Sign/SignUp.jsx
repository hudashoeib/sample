import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the import based on your file structure

import { GoogleIcon } from "./CustomIcons";

// SignUp auth

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp(props) {
  const isArabic = (text) =>
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);

  const theme = useTheme();
  const { t } = useTranslation();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [info, setInfo] = React.useState("");

  const validateInputs = () => {
    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage(t("signup_email_error"));
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(t("signup_password_error"));
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage(t("signup_name_error"));
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }
    return isValid;
  };

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setError("");
    setInfo("");
    // Validate inputs first
    if (!validateInputs()) {
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Set displayName after sign up
      await updateProfile(userCredential.user, { displayName: name });
      await sendEmailVerification(userCredential.user);
      setInfo(t("signup_verification_info"));
      // Optionally: navigate("/");
    } catch (err) {
      console.error("Sign up error:", err.code, err.message);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError(t("signup_email_exists"));
          break;
        case "auth/invalid-email":
          setError(t("signup_invalid_email"));
          break;
        case "auth/weak-password":
          setError(t("signup_weak_password"));
          break;
        default:
          setError(t("signup_failed"));
      }
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign up:", result.user);
      // navigate("/"); // Uncomment to redirect after Google sign up
    } catch (err) {
      console.error("Google sign up error:", err.code, err.message);
      switch (err.code) {
        case "auth/popup-closed-by-user":
          setError(t("signup_google_cancelled"));
          break;
        case "auth/account-exists-with-different-credential":
          setError(t("signup_google_exists"));
          break;
        default:
          setError(t("signup_google_failed"));
      }
    }
  };

  return (
    <Box {...props}>
      <CssBaseline enableColorScheme />

      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {t("signup")}
          </Typography>
          {/* Error msg
           */}
          {error && (
            <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
              {error}
            </Typography>
          )}
          {/* End of Error msg */}
          {/* Info msg */}
          {info && (
            <Typography color="primary" sx={{ textAlign: "center", mt: 1 }}>
              {info}
            </Typography>
          )}
          {/* End of Info msg */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name" dir="auto" sx={{ textAlign: "start" }}>
                {t("signup_name")}
              </FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder={t("signup_name_placeholder")}
                inputProps={{
                  dir: isArabic(t("signup_name_placeholder")) ? "rtl" : "ltr",
                }}
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
                onChange={(e) => setName(e.target.value)}
                dir="auto"
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.paper,
                    textAlign: "start",
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" dir="auto">
                {t("signup_email")}
              </FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder={t("signup_email_placeholder")}
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.paper,
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" dir="auto">
                {t("signup_password")}
              </FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder={t("signup_password_placeholder")}
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: theme.palette.background.paper,
                  },
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label={t("signup_updates")}
              dir="auto"
              sx={{ marginRight: "-8px" }}
            />
            <Button type="submit" fullWidth variant="contained">
              {t("signup")}
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>
              {t("signup_or")}
            </Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleSignUp}
              startIcon={<GoogleIcon />}
              sx={{ color: "bg.textContrast" }}
            >
              {t("signup_google")}
            </Button>

            <Typography sx={{ textAlign: "center", fontSize: "0.8rem" }}>
              {t("signup_already_account")}
              <Link
                href="/signin"
                variant="body2"
                sx={{
                  alignSelf: "center",
                  fontSize: "0.8rem",
                  marginLeft: "4px",
                  marginRight: "4px",
                  color: "bg.textContrast",
                  fontWeight: "600",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                {""} {t("signin")}
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </Box>
  );
}
