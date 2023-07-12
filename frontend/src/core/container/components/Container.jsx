import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Routes, Route } from "react-router-dom";
import { MainMenu, SecondaryMenu } from "/app/src/features/menu";
import { Dashboard } from "/app/src/features/dashboard";
import { CleaningList } from "/app/src/features/cleanings";
import { FieldList } from "/app/src/features/fields";
import { SalaryList } from "/app/src/features/salary";
import { Request } from "/app/src/core";
import { Child } from "/app/src/features/children";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright Łukasz Długajczyk "}
      <Link color="inherit" href="https://mui.com/">
        I don't hava a website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function MainContainer() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [cleaningListState, setCleaningListState] = useState([]);
  const [fieldListState, setFieldListState] = useState([]);
  const [childId, setChildId] = useState(-1);

  const addFieldHandler = (name) => {
    Request("post", "/fields/", {
      name: name,
    })
      .then((response) => {
        let id = response.data.id;
        let name = response.data.name;
        console.log(response.data);
        setFieldListState((prevFieldList) => {
          return [...prevFieldList, { id: id, name: name }];
        });
      })
      .catch((error) => {
        // add exception handling
        console.log(error);
      });
  };

  const addSalaryHandler = (date, value, child) => {
    Request("post", "/salary/", {
      date: date,
      value: value,
      child: child,
    })
      .then((response) => {
        let id = response.data.id;
        let date = response.data.date;
        let value = response.data.value;
        let child = response.data.child;
        console.log(response.data);
        setSalaryListState((prevSalaryList) => {
          return [
            ...prevSalaryList,
            { id: id, date: date, value: value, child: child },
          ];
        });
      })
      .catch((error) => {
        // add exception handling
        console.log(error);
      });
  };

  // TODO: To remove!!!
  const addCleaningHandler = (date, child, field) => {
    Request("post", "/cleaningups/", {
      date: date,
      child: child,
      field: field,
    })
      .then((response) => {
        let id = response.data.id;
        let date = response.data.date;
        let child = response.data.child;
        let field = response.data.field;
        console.log(response.data);
        setCleaningListState((prevCleaningList) => {
          return [
            ...prevCleaningList,
            {
              id: id,
              date: date,
              child: child,
              field: field,
            },
          ];
        });
      })
      .catch((error) => {
        // add exception handling
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainMenu />
            <Divider sx={{ my: 1 }} />
            <SecondaryMenu />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route
                        path="/cleanings"
                        element={
                          <CleaningList
                            cleaningsState={cleaningListState}
                            onAddCleaning={addCleaningHandler}
                          />
                        }
                      />
                      <Route path="/children">
                        <Route
                          index
                          path="/children"
                          element={
                            <Child childId={childId} setChildId={setChildId} />
                          }
                        />
                      </Route>
                      <Route path="/salary" element={<SalaryList />} />
                      <Route
                        path="/fields"
                        element={
                          <FieldList
                            fieldState={fieldListState}
                            onAddField={addFieldHandler}
                          />
                        }
                      />
                      <Route path="/settings" element={<h1>settings</h1>} />
                    </Routes>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MainContainer;
