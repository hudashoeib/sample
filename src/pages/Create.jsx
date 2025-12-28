import { Edit } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import CommentIcon from "@mui/icons-material/Comment";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";

const Create = () => {
  // List MUI
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  // End List MUI
  const navigate = useNavigate();
  let { taskId } = useParams();
  const [user, userLoading] = useAuthState(auth);
  const [value, loading, error] = useDocument(
    user ? doc(db, user.uid, taskId) : null
  );
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
                <Typography variant="h3" className="title-create">
                  {data.title}
                </Typography>
                <IconButton>
                  <Edit fontSize="large" />
                </IconButton>
              </Stack>
            </Grid>
            {/* End Title Section */}
            {/* List Section */}
            <Grid size={{ xs: 8, md: 10 }} mt={4} className="list-section">
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {data.details.map((step, index) => {
                  const labelId = `checkbox-list-label-${step}`;

                  return (
                    <ListItem
                      key={step}
                      secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                          <CommentIcon />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(value)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.includes(step)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={step} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            {/* End List Section */}
          </Grid>
        </Box>
      </>
    );
};

export default Create;
