import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";

const Create = () => {
  const theme = useTheme();
  // List MUI - checked state synced with Firestore
  const [checked, setChecked] = React.useState([]);

  // Toggle and update Firestore
  const handleToggle = (step) => async () => {
    let newChecked;
    if (checked.includes(step)) {
      newChecked = checked.filter((s) => s !== step);
    } else {
      newChecked = [...checked, step];
    }
    setChecked(newChecked);
    if (user && taskId) {
      await updateDoc(doc(db, user.uid, taskId), {
        checkedSteps: newChecked,
      });
    }
  };
  // End List MUI
  /////////////////////////////////////////////////////
  // Fetch Data from Firestore
  const navigate = useNavigate();
  let { taskId } = useParams();
  const [user, userLoading] = useAuthState(auth);
  const [value, loading, error] = useDocument(
    user ? doc(db, user.uid, taskId) : null
  );
  // End Fetch Data from Firestore

  // Sync checked state from Firestore
  React.useEffect(() => {
    if (value?.exists()) {
      const data = value.data();
      setChecked(data.checkedSteps || []);
    }
  }, [value]);
  // Update Data from Firestore

  const titleRef = useRef(null);
  const titleEdit = async (eo) => {
    await updateDoc(doc(db, user.uid, taskId), {
      title: eo.target.value,
    });
  };
  const trashIcon = async (step) => {
    await updateDoc(doc(db, user.uid, taskId), {
      details: arrayRemove(step),
    });
  };
  const [newStepDialogue, setNewStepDialogue] = React.useState(false);
  const [newstep, setnewstep] = React.useState("");
  const addNewStep = async (eo) => {
    eo.preventDefault();
    await updateDoc(doc(db, user.uid, taskId), {
      details: arrayUnion(newstep),
    });
    setnewstep("");
  };
  React.useEffect(() => {
    if (value?.exists()) {
      // const data = value.data();
    }
  }, [value]);

  if (userLoading || loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in to view this task</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!value || !value.exists())
    return (
      <>
        <Helmet>
          <title> </title>
          <meta name="description" content="This is the booking page" />
        </Helmet>
        <Header />
        <main>
          <h1>Task has been Deleted</h1>
          <button
            className="task-bye-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Home
          </button>
        </main>

        <Footer />
      </>
    );

  const data = value.data();

  if (value)
    return (
      <>
        <Helmet>
          <title>Create </title>
          <meta
            name="description"
            content="This is the Create page to craete ur default task"
          />
        </Helmet>
        <Box className="parent-create">
          <Grid
            container
            component="main"
            className="container "
            justifyContent={"center"}
          >
            {/* Title Section */}
            <Grid size={{ xs: 6, md: 6 }} mt={4} className="title-section">
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-around"}
                mt={4}
              >
                <input
                  type="text"
                  className="title-input"
                  defaultValue={data.title}
                  onChange={titleEdit}
                  ref={titleRef}
                  style={{
                    background: "transparent",
                    fontSize: "40px",
                    border: "none",
                    textAlign: "center",
                    fontWeight: "bold",
                    width: "80%",
                    color: theme.palette.text.primary,
                  }}
                />
                <IconButton onClick={() => titleRef.current?.focus()}>
                  <Edit fontSize="large" />
                </IconButton>
              </Stack>
            </Grid>
            {/* End Title Section */}
            {/* Progress Section   */}
            <Grid size={{ xs: 8, md: 10 }} mt={4} className="progress-section">
              {data.details.length > 0 && (
                <Box sx={{ width: "100%", textAlign: "center" }}>
                  {/* Calculate progress percentage */}
                  {(() => {
                    const total = data.details.length;
                    const completed = checked.length;
                    const percent = Math.round((completed / total) * 100);
                    return [
                      <LinearProgress
                        key="progress-bar"
                        variant="determinate"
                        value={percent}
                        sx={{ height: 10, borderRadius: 5, mb: 1 }}
                      />,
                      <Typography
                        key="progress-label"
                        variant="body1"
                        sx={{ mt: 1 }}
                      >
                        {percent}% completed
                      </Typography>,
                      percent === 100 && (
                        <Typography
                          key="progress-congrats"
                          variant="h6"
                          sx={{ mt: 2, color: "primary.main" }}
                        >
                          🎉 All steps completed! Great job! 🎉
                        </Typography>
                      ),
                    ];
                  })()}
                </Box>
              )}
            </Grid>
            {/*  End of Progress Section   */}
            {/* List Section */}
            <Grid size={{ xs: 8, md: 10 }} mt={4} className="list-section">
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {data.details.map((step, index) => {
                  const labelId = `checkbox-list-label-${step}`;

                  return (
                    <>
                      <ListItem
                        className="step-item"
                        key={step}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => trashIcon(step)}
                            sx={{ "&:hover": { color: "red" } }}
                          >
                            <Delete />
                          </IconButton>
                        }
                        disablePadding
                      >
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(step)}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.includes(step)}
                              tabIndex={-1}
                              disableRipple
                              onChange={handleToggle(step)}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={step}
                            style={
                              checked.includes(step)
                                ? {
                                    textDecoration: "line-through",
                                    color: "#888",
                                  }
                                : {}
                            }
                            primaryTypographyProps={{ fontSize: "24px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider component="li" />
                    </>
                  );
                })}
                {/* New step dialogue */}
                {newStepDialogue && (
                  <ListItem
                    className="new-step-dialogue"
                    sx={{ width: "100%", bgcolor: "background.paper" }}
                    disablePadding
                  >
                    <ListItemButton dense>
                      <ListItemIcon>
                        <Checkbox edge="start" disabled tabIndex={-1} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <input
                            type="text"
                            placeholder="New Step"
                            value={newstep}
                            onChange={(e) => setnewstep(e.target.value)}
                            style={{
                              background: "transparent",
                              fontSize: "24px",
                              border: "none",
                              outline: "none",
                              color: theme.palette.text.primary,
                              width: "80%",
                            }}
                          />
                        }
                      />
                      <Button
                        variant="contained"
                        onClick={addNewStep}
                        sx={{ ml: 2 }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setNewStepDialogue(false)}
                        sx={{ ml: 1 }}
                      >
                        Cancel
                      </Button>
                    </ListItemButton>
                  </ListItem>
                )}
                {/*End New step dialogue */}
              </List>
            </Grid>
            {/* End List Section */}

            {/* Action Button */}
            <Grid
              size={3}
              mt={4}
              mb={4}
              className="action-section"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Button
                variant="contained"
                onClick={() => setNewStepDialogue(true)}
                sx={{ marginBottom: 2 }}
              >
                Add Step
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back to Home
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 2 }}
                onClick={async () => {
                  await updateDoc(doc(db, user.uid, taskId), {
                    deleted: true,
                  });
                }}
              >
                Delete Task
              </Button>
            </Grid>

            {/* End Action Button */}
          </Grid>
        </Box>
      </>
    );
};

export default Create;
