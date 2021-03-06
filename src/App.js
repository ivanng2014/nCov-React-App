import React from "react";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import Home from "./components/Home/Home";
import Cases from "./components/Cases/Cases";
import Building from "./components/Building/Building";

import About from "./components/AboutMe/About";
import Stat from "./components/Stat/Stat";
import HongKongMap from "./components/Maps/HongKongMaps";
import Test from "./components/Test/Test";

const useStyles = makeStyles({
  container: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    maxWidth: "80%"
    // borderStyle: "solid",
    // borderWidth: "3px",
  }
});

export default () => {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: "light"
    }
  });

  return (
    <div className={classes.App}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Container className={classes.container} maxWidth="md">
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/infected">
                <Cases />
              </Route>
              <Route exact path="/building">
                <Building />
              </Route>
              <Route exact path="/stat">
                <Stat />
              </Route>
              <Route exact path="/aboutme">
                <About />
              </Route>
              <Route exact path="/map">
                <HongKongMap />
              </Route>
              <Route exact path="/test">
                <Test />
              </Route>
            </Switch>
          </Router>
        </Container>
      </ThemeProvider>
    </div>
  );
};
