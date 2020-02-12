import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";

import LineCaseBagel from "../Chart/CaseBagel";
import LineCaseData from "../Chart/LineCaseData";
import LineChartImmi from "../Chart/LineChartImmi";
import MainlandArrival from "../Chart/ImmgLineChart";
import CaseType from "../Chart/CaseTypeBagel";
import CaseStatus from "../Chart/CaseStatus";
import CaseAgeBar from "../Chart/CaseAgeBar";
import CaseGender from "../Chart/CaseGender";
import ShenZhenBay from "../Chart/ShenShznBay";
import KongPig from "../Chart/KongPig";
import Airport from "../Chart/AirportImmigration";
import HomeRader from "../Chart/HospRadar";
import HomeConRader from "../Chart/HomeConRadar";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `graph-tab-${index}`,
      "aria-controls": `graph-tabpanel-${index}`
    };
  }
  return (
    <Container className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          互動式圖表
        </Typography>
      </div>

      <Paper square>
        <Tabs
          variant="fullWidth"
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="患者相關數據" {...a11yProps(0)} />

          <Tab label="出入境數據" {...a11yProps(1)} />

          <Tab label="地區相關數據" {...a11yProps(2)} />
        </Tabs>
      </Paper>

      <div hidden={value !== 0}>
        <Grid
          className={classes.casesWrapper}
          container
          justify="center"
          alignItems="center"
          spacing={2}
          wrap="wrap"
          index={0}
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
            <CaseStatus />
          </Grid>
          <Grid item key={5} style={{ minWidth: 300 }}>
            <CaseAgeBar />
          </Grid>
          <Grid item key={6} style={{ minWidth: 300 }}>
            <CaseGender />
          </Grid>
        </Grid>
      </div>
      <div hidden={value !== 1}>
        <Grid
          className={classes.casesWrapper}
          container
          justify="center"
          alignItems="center"
          spacing={2}
          wrap="wrap"
          index={1}
        >
          <Grid item key={7} style={{ minWidth: 400 }}>
            <MainlandArrival />
          </Grid>
          <Grid item key={8} style={{ minWidth: 400 }}>
            <LineChartImmi />
          </Grid>
          <Grid item key={9} style={{ minWidth: 400 }}>
            <ShenZhenBay />
          </Grid>
          <Grid item key={10} style={{ minWidth: 400 }}>
            <KongPig />
          </Grid>
          <Grid item key={11} style={{ minWidth: 400 }}>
            <Airport />
          </Grid>
        </Grid>
      </div>
      <div hidden={value !== 2}>
        <Grid
          className={classes.casesWrapper}
          container
          justify="center"
          alignItems="center"
          spacing={2}
          wrap="wrap"
          index={1}
        >
          <Grid item key={11} style={{ minWidth: 400 }}>
            <HomeRader />
          </Grid>
          <Grid item key={12} style={{ minWidth: 400 }}>
            <HomeConRader />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
