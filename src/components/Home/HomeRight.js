import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import axios from "axios";

import LineGraph from "../Chart/LineChartImmi";

const useStyles = makeStyles(theme => ({
  root: {
    width: "96%"
  },
  title: {
    display: "flex",
    justifyContent: "center"
  },

  infected: {
    height: 100,
    display: "flex",
    flexWrap: "wrap"
  },
  tableTitle: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#DDDDDD"
  },
  Card: {
    maxWidth: "25%",
    flex: 1
  },
  Bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    wrap: "wrap"
  },
  green: {
    color: "green"
  },
  red: {
    color: "red"
  }
}));

export default props => {
  const classes = useStyles();
  const [figure, setFigure] = useState({});
  const [yesterday, setYesterday] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/figure"
      )
      .then(res => {
        let latestNumber = res.data.data.pop();
        let yesterdayNumber = res.data.data.pop(-2);
        setFigure(latestNumber);
        setYesterday(yesterdayNumber);
      });
  }, []);

  return (
    //TODO Use Card to replace Table
    <div className={classes.root}>
      <Paper elevation={3}>
        <div className={classes.tableTitle}>
          <Typography
            color="primary"
            align="center"
            variant="h6"
            component="h6"
          >
            武漢肺炎香港最新數字
          </Typography>
        </div>
        <div class={classes.Bottom}>
          <Card className={classes.Card}>
            <CardContent>
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
                component="p"
              >
                死亡
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                align="center"
                color="textPrimary"
                variant="h6"
                component="h6"
              >
                {figure.death}
              </Typography>
            </CardContent>
            <CardContent>
              {figure.death - yesterday.death > 1 ? (
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  <ArrowDropUpIcon className={classes.green} />
                  {figure.death - yesterday.death}
                </Typography>
              ) : figure.death - yesterday.death === 0 ? (
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  -
                </Typography>
              ) : (
                <Typography
                  align="justify"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  <ArrowDropDownIcon className={classes.red} />{" "}
                  {figure.death - yesterday.death}
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card className={classes.Card}>
            <CardContent>
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
                component="p"
              >
                確診
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                align="center"
                color="textPrimary"
                variant="h6"
                component="h6"
              >
                {figure.comfirmCase}
              </Typography>
            </CardContent>
            <CardContent>
              {figure.comfirmCase - yesterday.comfirmCase > 1 ? (
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  <ArrowDropUpIcon className={classes.green} />
                  {figure.comfirmCase - yesterday.comfirmCase}
                </Typography>
              ) : figure.comfirmCase - yesterday.comfirmCase === 0 ? (
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  -
                </Typography>
              ) : (
                <Typography
                  align="justify"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  <ArrowDropDownIcon className={classes.red} />{" "}
                  {figure.comfirmCase - yesterday.comfirmCase}
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card className={classes.Card}>
            <CardContent>
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
                component="p"
              >
                呈報
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                align="center"
                color="textPrimary"
                variant="h6"
                component="h6"
              >
                {figure.fulfillReportingCriteria}
              </Typography>
            </CardContent>
            <CardContent>
              {figure.fulfillReportingCriteria -
                yesterday.fulfillReportingCriteria >
              1 ? (
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  <ArrowDropUpIcon className={classes.green} />
                  {figure.fulfillReportingCriteria -
                    yesterday.fulfillReportingCriteria}
                </Typography>
              ) : figure.fulfillReportingCriteria -
                  yesterday.fulfillReportingCriteria ===
                0 ? (
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  -
                </Typography>
              ) : (
                <Typography
                  align="justify"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  <ArrowDropDownIcon className={classes.red} />{" "}
                  {figure.fulfillReportingCriteria -
                    yesterday.fulfillReportingCriteria}
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card className={classes.Card}>
            <CardContent>
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
                component="p"
              >
                排除
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                align="center"
                color="textPrimary"
                variant="h6"
                component="h6"
              >
                {figure.ruleOut}
              </Typography>
            </CardContent>
            <CardContent>
              {figure.ruleOut - yesterday.ruleOut > 1 ? (
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  <ArrowDropUpIcon className={classes.green} />
                  {figure.ruleOut - yesterday.ruleOut}
                </Typography>
              ) : figure.ruleOut - yesterday.ruleOut === 0 ? (
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  -
                </Typography>
              ) : (
                <Typography
                  align="justify"
                  color="textPrimary"
                  variant="h6"
                  component="h6"
                >
                  <ArrowDropDownIcon className={classes.red} />{" "}
                  {figure.ruleOut - yesterday.ruleOut}
                </Typography>
              )}
            </CardContent>
          </Card>
        </div>
        <CardContent>
          <Typography
            align="right"
            color="textSecondary"
            variant="body1"
            component="body1"
          >
            資料來源：
            <a href="https://data.gov.hk/tc-data/dataset/hk-dh-chpsebcddr-novel-infectious-agent?fbclid=IwAR0hU-W9jhr7eWWWy1k1tSFJ6vq5Grp-p7rrkjEcyFSJTBdgyHidvmJAtO4">
              資料一線通
            </a>
          </Typography>
        </CardContent>
      </Paper>

      <LineGraph />
    </div>
  );
};
