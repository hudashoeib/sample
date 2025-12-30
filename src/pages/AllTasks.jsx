import React from "react";
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

import { serverTimestamp } from "firebase/firestore";
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
  const q = user ? collection(db, user.uid) : null;
  const [value, loading, error] = useCollection(q);
  // End Form Dialog state
  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!value || value.empty) {
    return (
      <Box className="all-Tasks-parent">
        {/* Fab FORM */}
        <Tooltip title="Add New Task" placement="left">
          <Fab
            color="secondary"
            sx={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
              height: 70,
              width: 70,
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
                ></input>
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
        <Grid container justifyContent="center" mt={4}>
          <Grid container justifyContent="center">
            <Typography
              textAlign="center"
              variant="h4"
              color="primary"
              sx={{ marginTop: "10rem" }}
            >
              You have no tasks yet. Click the "+" button to add a new task!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (value)
    return (
      <Box className="all-Tasks-parent">
        {/* Fab  FORM */}
        <Tooltip title="Add New Task" placement="left">
          <Fab
            color="secondary"
            sx={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
              height: 70,
              width: 70,
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
          className="all-Tasks-container border container"
          spacing={2}
        >
          {/* Titile section */}
          <Grid size={12} mb={5} className="all-Tasks-title">
            <Typography textAlign={"center"} variant="h2" color="primary">
              Your Tasks <Heart />
            </Typography>
          </Grid>
          {/* options button section */}
          <Grid
            size={6}
            className="all-Tasks-options  border"
            textAlign={"center"}
          >
            <ToggleButtonGroup
              className="border"
              sx={{ width: "100%", backgroundColor: "primary.main" }}
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton sx={{ width: "50%" }} size="large" value="newest">
                {t("newest")}
              </ToggleButton>
              <ToggleButton sx={{ width: "50%" }} size="large" value="oldest">
                {t("oldest")}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* Tasks Cards section */}
          <Grid
            container
            size={{ xs: 10, sm: 11 }}
            spacing={4}
            className="all-Tasks-cards-container border"
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
                        variant="h3"
                        sx={{
                          color: "text.secondary",

                          fontWeight: "bold",
                          textAlign: "center",
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
          {/* End of Tasks Cards section */}
        </Grid>
      </Box>
    );
};
export default AllTasks;
