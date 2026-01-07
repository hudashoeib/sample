import React, { useState } from "react";
import Typography from "@mui/material/Typography";
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
import Heart from "Styles/Heart";
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

// Form Dialoge
const AllTasks = () => {
  const { t } = useTranslation();
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
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!value || value.empty) {
    return (
      <Box
        className="all-Tasks-parent"
        sx={{ pt: { xs: 7, sm: 8 }, minHeight: "100vh" }}
      >
        {/* Fab FORM */}
        <Tooltip title="Add New Task" placement="left">
          <Fab
            color="secondary"
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
            <AddIcon />
          </Fab>
        </Tooltip>
        {/* Form Dialog */}
        <Dialog open={open} onClose={handleClose}>
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <DialogContent>
            <DialogContentText>
              <Typography variant="h5" gutterBottom>
                Create New Task
              </Typography>
              Let's create a new task! Please enter the task details below.
            </DialogContentText>
            <Box component="form" id="subscription-form" sx={{ mt: 2 }}>
              <label htmlFor="title">Title</label>
              <br />
              <input
                type="text"
                required
                value={title}
                onChange={titleEntry}
                id="title"
                style={{ marginBottom: "10px", width: "100%" }}
              ></input>
              <Stack>
                <label htmlFor="steps">Steps</label>
                <input
                  id="steps"
                  type="text"
                  required
                  value={step}
                  onChange={stepsEntry}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addStep(e);
                    }
                  }}
                />
                <Button
                  type="button"
                  sx={{ color: theme.palette.primary.contrastText }}
                  variant="contained"
                  onClick={addStep}
                >
                  Add Step
                </Button>
              </Stack>
              <List
                sx={{
                  listStyleType: "circle",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  maxHeight: "100px",
                  overflowY: "auto",
                }}
              >
                {array.map((item, index) => (
                  <ListItem sx={{ listStyleType: "circle" }} key={index}>
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
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              form="subscription-form"
              variant="contained"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {/* No Tasks Message */}
        <Grid container justifyContent="center" alignItems="center" mt={4}>
          <Grid
            size={10}
            textAlign="center"
            className="no-tasks-message"
            mt={5}
          >
            <Typography
              textAlign="center"
              sx={{
                marginBottom: "1rem",
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
              color="bg.textContrast"
            >
              Welcome, {user.displayName || user.email}
            </Typography>
            <Typography
              textAlign="center"
              sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}
              color="bg.textContrast"
            >
              Let's make Life Easier!
            </Typography>
            <Grid
              size={8}
              margin="2rem auto"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src="/plans.jpg"
                alt="plans illustration"
                loading="lazy"
                height={"200px"}
              />
            </Grid>

            <Grid size={8} alignContent="center" margin="2rem auto">
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                sx={{
                  fontSize: {
                    xs: "0.5rem",
                    sm: "0.8rem",
                    md: "1rem",
                    lg: "1.5rem",
                  },
                  fontWeight: 600,
                  display: "block",
                  margin: "2rem auto",
                  textTransform: "capitalize",
                }}
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
        sx={{ pt: { xs: 7, sm: 8 }, minHeight: "100vh" }}
      >
        {/* Fab  FORM */}
        <Tooltip title="Add New Task" placement="left">
          <Fab
            color="secondary"
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
            <AddIcon />
          </Fab>
        </Tooltip>
        {/* Form Dialog */}
        <Dialog open={open} onClose={handleClose}>
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <DialogContent>
            <DialogContentText>
              <Typography textAlign={"center"} variant="h5" gutterBottom>
                Create New Task
              </Typography>
              Let's create a new task! Please enter the task details below.
            </DialogContentText>
            <Box component="form" id="subscription-form" sx={{ mt: 2 }}>
              <label htmlFor="title">Title</label>
              <br />
              <input
                type="text"
                required
                value={title}
                onChange={titleEntry}
                id="title"
                style={{ marginBottom: "10px", width: "100%" }}
              ></input>
              <Stack>
                <label htmlFor="steps">Steps</label>

                <input
                  id="steps"
                  type="text"
                  required
                  value={step}
                  onChange={stepsEntry}
                ></input>
                <Button
                  className="addStepBtn"
                  type="button"
                  sx={{ color: theme.palette.primary.contrastText }}
                  variant="contained"
                  onClick={addStep}
                >
                  Add Step
                </Button>
              </Stack>
              <List
                sx={{
                  listStyleType: "circle",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  maxHeight: "100px",
                  overflowY: "auto",
                }}
              >
                {array.map((item, index) => (
                  <ListItem sx={{ listStyleType: "circle" }} key={index}>
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
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              type="submit"
              form="subscription-form"
              variant="contained"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {/* All Task Page */}
        <Grid
          justifyContent={"center"}
          container
          mt={4}
          className="all-Tasks-container  container"
          spacing={2}
        >
          {/* Titile section */}
          <Grid size={{ xs: 8, md: 12 }} mb={5} className="all-Tasks-title">
            <Typography
              textAlign={"center"}
              sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 600 }}
              color="primary"
            >
              Your Tasks <Heart />
            </Typography>
          </Grid>
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
                    sx={{ height: "20rem", position: "relative" }}
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
                        sx={{ fontWeight: "200" }}
                        component="div"
                      >
                        steps list :
                      </Typography>
                      <List>
                        {data.details.map((step, index) => (
                          <ListItem key={index}>
                            <Typography variant="body2" color="text.secondary">
                              {step}
                            </Typography>
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
                        }}
                      >
                        Edit
                      </Button>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontWeight: 600 }}
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
