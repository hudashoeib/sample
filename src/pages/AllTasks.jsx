import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Fab,
  Grid,
  List,
  ListItem,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
// Form Dialoge

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { orderBy, query, serverTimestamp } from "firebase/firestore";
import { setDoc, doc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { formatDistanceToNow } from "date-fns";
import Spinner from "Styles/Spinner";
import Heart2 from "Styles/HeartSmall/Heart2";

// Form Dialoge
const AllTasks = () => {
  const { t, i18n } = useTranslation();
  const Toolbar = require("@mui/material/Toolbar").default;
  const navigate = useNavigate();
  const theme = useTheme();

  // Toggle Button state
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // End Toggle Button state

  // Form Dialog state
  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [title, setTitle] = React.useState("");
  const [step, setStep] = React.useState("");
  const [array, setArray] = React.useState([]);

  const titleEntry = (e) => {
    setTitle(e.target.value);
  };
  const stepsEntry = (e) => {
    setStep(e.target.value);
  };
  const addStep = (eo) => {
    eo.preventDefault();
    if (step && !array.includes(step)) {
      setArray([...array, step]);
    }
    setStep("");
  };
  // Handle Submit
  const handleSubmit = async (eo) => {
    eo.preventDefault();

    try {
      const taskId = new Date().getTime().toString();
      await setDoc(doc(db, user.uid, taskId), {
        ID: user.uid,
        title: title,
        details: array,
        taskTime: serverTimestamp(),
        taskId: taskId,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setArray([]);
    setTitle("");
    handleClose();

    // setsuccess(true);           // open the popup window of success msg
    // setTimeout(() => {              // make this pop window appear only for 4000 milliseconds (i.e 4 s )
    //   setsuccess(false);
    // }, 2000);
  };
  // End Form Dialog state
  // Filter data and get data from database
  const [initialData, setinitialData] = useState(
    user ? query(collection(db, user.uid), orderBy("taskTime", "desc")) : null
  );
  const q = user ? initialData : null;
  const [value, loading, error] = useCollection(q);

  const ascBtn = () => {
    setinitialData(query(collection(db, user.uid), orderBy("taskTime", "asc")));
  };
  const descBtn = () => {
    setinitialData(
      query(collection(db, user.uid), orderBy("taskTime", "desc"))
    );
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Spinner />
      </Box>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!value || value.empty) {
    return (
      <Box
        className="all-Tasks-parent"
        // @ts-ignore
        sx={{ backgroundColor: theme.palette.bg.main, minHeight: "100dvh" }}
      >
        {/* <Toolbar /> */}
        {/* Fab FORM */}
        {/* <Tooltip title="Add New Task" placement="left">
          <Fab
            color="secondary"
            className="fab-animate"
            sx={{
              position: "fixed",
              bottom: "4.5rem",
              right: "1rem",
              height: 70,
              width: 70,
              color: "background.default",
            }}
            onClick={handleClickOpen}
          >
            <AddIcon sx={{ fontSize: 48 }} />
          </Fab>
        </Tooltip> */}
        {/* Form Dialog */}
        <Dialog open={open} onClose={handleClose}>
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <DialogContent>
            <DialogContentText>
              <Typography
                textAlign={"center"}
                variant="h5"
                gutterBottom
                fontWeight={600}
              >
                {t("lets_create_new_task")}
              </Typography>
              {/* {t("please_enter_task_details")} */}
            </DialogContentText>
            <Box component="form" id="subscription-form" sx={{ mt: 2 }}>
              <label
                htmlFor="title"
                dir="auto"
                style={{
                  textAlign: i18n.language === "ar" ? "right" : "left",
                  display: "block",
                }}
              >
                {t("task-title")}
              </label>

              <input
                type="text"
                required
                value={title}
                onChange={titleEntry}
                id="title"
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  textAlign: "start",
                }}
                dir="auto"
              ></input>
              <Stack>
                <label
                  htmlFor="steps"
                  dir="auto"
                  style={{ textAlign: "start" }}
                >
                  {t("steps")}
                </label>

                <input
                  id="steps"
                  type="text"
                  required
                  value={step}
                  onChange={stepsEntry}
                  dir="auto"
                  style={{ textAlign: "start" }}
                ></input>
                <Button
                  className="addStepBtn"
                  type="button"
                  sx={{ color: theme.palette.primary.contrastText }}
                  variant="contained"
                  onClick={addStep}
                >
                  {t("add_step")}
                </Button>
              </Stack>
              <List
                sx={{
                  listStyleType: "circle",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  maxHeight: "100px",
                  overflowY: "auto",
                  textAlign: "start",
                }}
              >
                {array.map((item, index) => (
                  <ListItem
                    sx={{ listStyleType: "circle", textAlign: "start" }}
                    dir="auto"
                    key={index}
                  >
                    {item}
                  </ListItem>
                ))}
              </List>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              onClick={handleClose}
              sx={{ color: theme.palette.primary.contrastText }}
              variant="contained"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              form="subscription-form"
              variant="contained"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              {t("submit")}
            </Button>
          </DialogActions>
        </Dialog>
        {/* No Tasks Message */}
        <Grid container justifyContent="center" alignItems="center">
          <Grid size={10} textAlign="center" className="no-tasks-message">
            <Typography
              textAlign="center"
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
              color="bg.textContrast"
            >
              Welcome, {user.displayName || user.email}
            </Typography>
            <Typography
              textAlign="center"
              sx={{ fontSize: { xs: "1.3rem", md: "1.8rem" } }}
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
                }}
              >
                <img
                  className="img-task"
                  src="/plans.jpg"
                  alt="plans illustration"
                  loading="lazy"
                  height={"200px"}
                  style={{
                    borderRadius: "12px",
                    width: "100%",

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
                  }}
                />
              </Box>
            </Grid>

            <Grid size={8} alignContent="center" margin="2rem auto">
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                size="large"
                sx={{
                  fontSize: {
                    xs: "0.8rem",

                    md: "1rem",
                    lg: "1.5rem",
                  },
                  fontWeight: 600,
                  display: "block",
                  margin: "2rem auto",
                  textTransform: "capitalize",
                  color: "bg.textContrast",
                  backgroundColor: "background.paper",
                }}
                className="fab-animate"
              >
                Let's Create Your First Task !
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (value)
    return (
      <Box
        className="all-Tasks-parent"
        // @ts-ignore
        sx={{ backgroundColor: theme.palette.bg.main, minHeight: "100dvh" }}
      >
        <Toolbar />
        {/* Fab  FORM */}
        <Tooltip title="Add New Task" placement="left">
          <Fab
            color="secondary"
            className="fab-animate"
            sx={{
              position: "fixed",
              bottom: "4rem",
              right: "1rem",
              height: 70,
              width: 70,
              color: "background.default",
            }}
            onClick={handleClickOpen}
          >
            <AddIcon sx={{ fontSize: 48 }} />
          </Fab>
        </Tooltip>
        {/* Form Dialog */}
        <Dialog open={open} onClose={handleClose}>
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <DialogContent>
            <DialogContentText>
              <Typography
                textAlign={"center"}
                variant="h5"
                gutterBottom
                fontWeight={600}
              >
                {t("lets_create_new_task")}
              </Typography>
              {/* {t("please_enter_task_details")} */}
            </DialogContentText>
            <Box component="form" id="subscription-form" sx={{ mt: 2 }}>
              <label
                htmlFor="title"
                dir="auto"
                style={{
                  textAlign: i18n.language === "ar" ? "right" : "left",
                  display: "block",
                }}
              >
                {t("task-title")}
              </label>

              <input
                type="text"
                required
                value={title}
                onChange={titleEntry}
                id="title"
                style={{
                  marginBottom: "10px",
                  width: "100%",
                  textAlign: "start",
                }}
                dir="auto"
              ></input>
              <Stack>
                <label
                  htmlFor="steps"
                  dir="auto"
                  style={{ textAlign: "start" }}
                >
                  {t("steps")}
                </label>

                <input
                  id="steps"
                  type="text"
                  required
                  value={step}
                  onChange={stepsEntry}
                  dir="auto"
                  style={{ textAlign: "start" }}
                ></input>
                <Button
                  className="addStepBtn"
                  type="button"
                  sx={{ color: theme.palette.primary.contrastText }}
                  variant="contained"
                  onClick={addStep}
                >
                  {t("add_step")}
                </Button>
              </Stack>
              <List
                sx={{
                  listStyleType: "circle",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  maxHeight: "100px",
                  overflowY: "auto",
                  textAlign: "start",
                }}
              >
                {array.map((item, index) => (
                  <ListItem
                    sx={{ listStyleType: "circle", textAlign: "start" }}
                    dir="auto"
                    key={index}
                  >
                    {item}
                  </ListItem>
                ))}
              </List>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              onClick={handleClose}
              sx={{ color: theme.palette.primary.contrastText }}
              variant="contained"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              form="subscription-form"
              variant="contained"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              {t("submit")}
            </Button>
          </DialogActions>
        </Dialog>
        {/* All Task Page */}
        <Grid
          justifyContent={"center"}
          container
          className="all-Tasks-container  container"
          spacing={2}
        >
          {/* Titile section */}
          <Grid
            size={{ xs: 10, md: 12 }}
            mb={3}
            className="all-Tasks-title"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              textAlign={"center"}
              sx={{
                fontSize: { xs: "1.3rem", md: "1.8rem" },
                fontWeight: 600,
                mr: 1,
                ml: 1,
              }}
              color="primary"
            >
              Welcome, {user.displayName || user.email}
            </Typography>
            <Heart2 />
          </Grid>
          {/* <Grid size={{ xs: 10, md: 12 }} className="all-Tasks-subtitle">
            <Typography dir="auto" variant="body1" color="initial">
              My Tasks :
            </Typography>
          </Grid> */}
          {/* options button section */}
          <Grid size={6} className="all-Tasks-options  " textAlign={"center"}>
            <ToggleButtonGroup
              className="border"
              sx={{
                width: "100%",
                backgroundColor: "primary.main",
              }}
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton
                onClick={descBtn}
                // @ts-ignore
                sx={{ width: "50%", color: theme.palette.button.textColor }}
                size="large"
                value="newest"
              >
                {t("newest")}
              </ToggleButton>
              <ToggleButton
                onClick={ascBtn}
                sx={{
                  width: "50%",
                  // @ts-ignore
                  color: theme.palette.button.textColor,
                }}
                size="large"
                value="oldest"
              >
                {t("oldest")}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Tasks Cards section */}
          <Grid
            container
            size={{ xs: 10, sm: 11 }}
            spacing={4}
            className="all-Tasks-cards-container "
          >
            {value.docs.map((doc) => {
              const data = doc.data();
              return (
                <Grid
                  className="one-task-card"
                  size={{ xs: 12, sm: 6, lg: 4 }}
                  onClick={() => navigate(`/create/${data.taskId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      height: "fit-content",
                      position: "relative",
                      padding: "15px",
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        sx={{
                          color: "text.secondary",

                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "2rem",
                        }}
                      >
                        {data.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "400",

                          textAlign: i18n.language === "ar" ? "right" : "left",
                        }}
                        component="div"
                        dir="auto"
                      >
                        {t("steps")}
                      </Typography>
                      <List sx={{ marginBottom: "50px" }}>
                        {data.details.map((step, index) => (
                          <ListItem key={index}>
                            {(() => {
                              const isArabic = /[\u0600-\u06FF]/.test(step);
                              const isChecked =
                                Array.isArray(data.checkedSteps) &&
                                data.checkedSteps.includes(step);
                              return (
                                <Typography
                                  className="step"
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    display: "flex",
                                    textAlign: isArabic ? "right" : "left",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%",
                                  }}
                                  dir={isArabic ? "rtl" : "ltr"}
                                >
                                  {step}
                                  {isChecked && (
                                    <CheckIcon
                                      sx={{
                                        color: "text.secondary",
                                        ml: 1,
                                        fontSize: 20,
                                      }}
                                    />
                                  )}
                                </Typography>
                              );
                            })()}
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      justifyContent="space-between"
                      alignContent={"center"}
                      alignItems={"center"}
                      padding={1}
                      sx={{
                        position: "absolute",
                        bottom: "4px",
                        right: "8px",
                        left: "8px",
                      }}
                      color="text.secondary"
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          justifyContent: "flex-start",
                          fontWeight: 600,
                          color: "text.secondary",
                          fontSize: "1rem",
                          textTransform: "capitalize",
                          textalign: "center",
                        }}
                      >
                        {t("edit")}
                      </Button>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontWeight: 600, fontSize: "11px" }}
                      >
                        {data.taskTime
                          ? formatDistanceToNow(
                              data.taskTime.toDate
                                ? data.taskTime.toDate()
                                : new Date(data.taskTime),
                              { addSuffix: true }
                            )
                          : "just now"}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <br style={{ clear: "both" }} />
          {/* End of Tasks Cards section */}
        </Grid>
      </Box>
    );
};
export default AllTasks;
