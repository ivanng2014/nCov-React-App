import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Container from "@material-ui/core/Container";

import LineCaseBagel from "../Chart/LineCaseBagel";
import LineCaseData from "../Chart/LineCaseData";
import LineChartImmi from "../Chart/LineChartImmi";
import MainlandArrival from "../Chart/ImmgLineChart";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  title: {
    display: "flex",
    justifyContent: "center",
    margin: "25px"
  },
  card: {},
  casesWrapper: {
    marginTop: 40
  },
  Type: {
    marginLeft: 25
  },
  status: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 30
  }
}));

export default props => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          圖表數據
        </Typography>
      </div>

      <Grid
        className={classes.casesWrapper}
        container
        justify="center"
        alignItems="center"
        spacing={3}
        wrap="wrap"
      >
        <Grid item key={1} style={{ minWidth: 300 }}>
          <Paper className={classes.card}>
            <LineCaseBagel />
          </Paper>
        </Grid>
        <Grid item key={2} style={{ minWidth: 300 }}>
          <Paper className={classes.card}>
            <LineCaseData />
          </Paper>
        </Grid>
        <Grid item key={3} style={{ minWidth: 300 }}>
          <Paper className={classes.card}>
            <LineChartImmi />
          </Paper>
        </Grid>
        <Grid item key={4} style={{ minWidth: 300 }}>
          <Paper className={classes.card}>
            <MainlandArrival />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
