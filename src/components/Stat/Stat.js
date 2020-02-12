import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";

import LineCaseBagel from "../Chart/LineCaseBagel";
import LineCaseData from "../Chart/LineCaseData";
import LineChartImmi from "../Chart/LineChartImmi";
import MainlandArrival from "../Chart/ImmgLineChart";
import CaseType from "../Chart/CaseTypeBagel";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  title: {
    display: "flex",
    justifyContent: "center",
    margin: "25px"
  },
  card: {
    padding: 10
  },
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
        spacing={2}
        wrap="wrap"
      >
        <Grid item key={1} style={{ minWidth: 300 }}>
          <LineCaseBagel />
        </Grid>
        <Grid item key={2} style={{ minWidth: 300 }}>
          <LineCaseData />
        </Grid>
        <Grid item key={3} style={{ minWidth: 300 }}>
          <CaseType />
        </Grid>
        <Grid item key={4} style={{ minWidth: 300 }}>
          <MainlandArrival />
        </Grid>
        <Grid item key={5} style={{ minWidth: 300 }}>
          <LineChartImmi />
        </Grid>
      </Grid>
    </Container>
  );
};
