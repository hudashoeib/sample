import { Check, Delete, Edit, Close } from "@mui/icons-material";
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
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";

import Header from "components/Header";
import Spinner from "Styles/Spinner";
import { useTranslation } from "react-i18next";

const Create = () => {
  const theme = useTheme();
  // List MUI - checked state synced with Firestore
  const [checked, setChecked] = React.useState([]);
  const { t, i18n } = useTranslation();

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
  const delAllTask = async () => {
    await deleteDoc(doc(db, user.uid, taskId));
    // navigate("/");
  };
  React.useEffect(() => {
    if (value?.exists()) {
      // const data = value.data();
    }
  }, [value]);

  if (userLoading || loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Spinner />
      </div>
    );
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
        <main
          // @ts-ignore
          style={{
            // @ts-ignore
            background: theme.palette.bg.main,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" } }}
            mt={3}
            mb={5}
          >
            {t("task_not_found")}
          </Typography>

          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
            sx={{ marginRight: "auto", marginLeft: "auto", display: "block" }}
          >
            {t("back_to_home")}
          </Button>
        </main>
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
        <Box
          // @ts-ignore
          className="parent-create"
          // @ts-ignore
          sx={{ backgroundColor: theme.palette.bg.main }}
        >
          <Grid
            container
            component="main"
            className="container  "
            justifyContent={"center"}
          >
            {/* Title Section */}
            <Grid size={{ xs: 8, md: 6 }} mt={4} className="title-section ">
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

                    border: "none",
                    textAlign: "center",
                    fontWeight: 300,
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
            <Grid size={{ xs: 10 }} mt={4} className="progress-section ">
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
                          🎉 {t("congratulations_on_completing_your_task")} 🎉
                        </Typography>
                      ),
                    ];
                  })()}
                </Box>
              )}
            </Grid>
            {/*  End of Progress Section   */}
            {/* List Section */}
            <Grid size={{ xs: 10, md: 10 }} mt={4} className="list-section ">
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {data.details.map((step, index) => {
                  const labelId = `checkbox-list-label-${step}`;

                  return (
                    <>
                      <ListItem
                        className="step-item"
                        key={step}
                        sx={{
                          display: "flex",
                          flexDirection:
                            i18n.language === "ar" ? "row-reverse" : "row",
                        }}
                        disablePadding
                      >
                        {/* Btn of check */}
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(step)}
                          dense
                          sx={{
                            display: "block",
                            textAlign:
                              i18n.language === "ar" ? "right" : "left",
                            width: "fit-content",
                            flexGrow: 0,
                            padding: "4px 8px",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              width: "fit-content",
                              minWidth: { xs: "33px", sm: "50px" },
                            }}
                          >
                            <Checkbox
                              edge={i18n.language === "ar" ? "end" : "start"}
                              checked={checked.includes(step)}
                              tabIndex={-1}
                              disableRipple
                              onChange={handleToggle(step)}
                            />
                          </ListItemIcon>
                        </ListItemButton>
                        {/* step name */}
                        <ListItemText
                          id={labelId}
                          primary={step}
                          dir="auto"
                          style={
                            checked.includes(step)
                              ? {
                                  display: "block",
                                  textDecoration: "line-through",
                                  color: "#888",
                                  textAlign:
                                    i18n.language === "ar" ? "right" : "left",
                                }
                              : {
                                  textAlign:
                                    i18n.language === "ar" ? "right" : "left",
                                  display: "block",
                                }
                          }
                          primaryTypographyProps={{
                            fontSize: { xs: "16px", md: "24px" },
                          }}
                        />
                        {/* Delette btn */}
                        <IconButton
                          edge={i18n.language === "ar" ? "start" : "end"}
                          aria-label="delete"
                          onClick={() => trashIcon(step)}
                          sx={{
                            "&:hover": { color: "red" },
                            padding: { xs: "4px 16px", sm: "8px 24px" },
                          }}
                        >
                          <Delete />
                        </IconButton>
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
                    <ListItemButton
                      sx={{
                        display: "flex",
                        flexDirection:
                          i18n.language === "ar" ? "row-reverse" : "row",
                      }}
                      dense
                    >
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              fontSize: { xs: "16px", md: "24px" },
                              width: "100%",
                            }}
                          >
                            <input
                              id="new-step-input"
                              type="text"
                              placeholder={t("new_step")}
                              value={newstep}
                              onChange={(e) => setnewstep(e.target.value)}
                              dir="auto"
                              style={{
                                textAlign:
                                  i18n.language === "ar" ? "right" : "start",
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                color: theme.palette.text.primary,
                                width: "97%",
                              }}
                            />
                          </Box>
                        }
                      />

                      <Check
                        onClick={addNewStep}
                        sx={{
                          marginRight: "20px",
                          cursor: "pointer",
                          marginLeft: "20px",
                        }}
                      />
                      <Close onClick={() => setNewStepDialogue(false)} />
                    </ListItemButton>
                  </ListItem>
                )}
                {/*End New step dialogue */}
              </List>
            </Grid>
            {/* End List Section */}

            {/* Action Button */}
            <Grid
              size={12}
              mt={4}
              mb={4}
              className="action-section"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setNewStepDialogue(true)}
                sx={{ marginBottom: 2, width: "200px" }}
              >
                {t("add_step")}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/alltasks");
                }}
                sx={{ marginBottom: 2, width: "200px" }}
              >
                {t("back_to_all_tasks")}
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 2 }}
                onClick={delAllTask}
              >
                {t("delete_task")}
              </Button>
            </Grid>

            {/* End Action Button */}
          </Grid>
        </Box>
      </>
    );
};

export default Create;
