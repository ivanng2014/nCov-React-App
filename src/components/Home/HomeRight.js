import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import axios from "axios";

import LineGraph from "../Chart/LineChartImmi";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  title: {
    margin: 30,
    display: "flex",
    justifyContent: "center"
  },
  table: {
    minWidth: "100%"
  },
  infected: {
    height: 100
  },
  tableTitle: {
    padding: 15,
    backgroundColor: "#DDDDDD"
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
    axios.get("https://api.n-cov.info/figure").then(res => {
      let latestNumber = res.data.data.pop();
      let yesterdayNumber = res.data.data.pop(-2);
      setFigure(latestNumber);
      setYesterday(yesterdayNumber);
    });
  }, []);

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <div className={classes.tableTitle}>
          <Typography
            color="primary"
            align="justify"
            variant="h6"
            component="h6"
          >
            武漢肺炎最新數字
          </Typography>
        </div>

        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow padding="none">
              <TableCell align="center" style={{ border: 0 }}>
                <Typography color="textSecondary" variant="body1" component="p">
                  死亡
                </Typography>
              </TableCell>
              <TableCell style={{ border: 0 }} align="center">
                <Typography color="textSecondary" variant="body1" component="p">
                  確診人數
                </Typography>
              </TableCell>
              <TableCell style={{ border: 0 }} align="center">
                <Typography color="textSecondary" variant="body1" component="p">
                  呈報個案
                </Typography>
              </TableCell>
              <TableCell style={{ border: 0 }} align="center">
                <Typography color="textSecondary" variant="body1" component="p">
                  排除個案
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="Today">
              <TableCell align="center" style={{ border: 0 }}>
                <Typography color="textPrimary" variant="h6" component="h6">
                  {figure.death}
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ border: 0 }}>
                <Typography color="textPrimary" variant="h6" component="h6">
                  {figure.comfirmCase}
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ border: 0 }}>
                <Typography color="textPrimary" variant="h6" component="h6">
                  {figure.fulfillReportingCriteria}
                </Typography>
              </TableCell>
              <TableCell align="center" style={{ border: 0 }}>
                <Typography color="textPrimary" variant="h6" component="h6">
                  {figure.ruleOut}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow key="Different">
              <TableCell align="center" style={{ border: 0 }}>
                {figure.death - yesterday.death > 1 ? (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    <ArrowDropUpIcon className={classes.green} />
                    {figure.death - yesterday.death}
                  </Typography>
                ) : figure.death - yesterday.death === 0 ? (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    -
                  </Typography>
                ) : (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    <ArrowDropDownIcon className={classes.red} />{" "}
                    {figure.death - yesterday.death}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center" style={{ border: 0 }}>
                {figure.comfirmCase - yesterday.comfirmCase > 1 ? (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    <ArrowDropUpIcon className={classes.green} />
                    {figure.comfirmCase - yesterday.comfirmCase}{" "}
                  </Typography>
                ) : figure.comfirmCase - yesterday.comfirmCase === 0 ? (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    -
                  </Typography>
                ) : (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    <ArrowDropDownIcon className={classes.red} />
                    {figure.comfirmCase - yesterday.comfirmCase}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center" style={{ border: 0 }}>
                {figure.fulfillReportingCriteria -
                  yesterday.fulfillReportingCriteria >
                1 ? (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    <ArrowDropUpIcon className={classes.green} />
                    {figure.fulfillReportingCriteria -
                      yesterday.fulfillReportingCriteria}{" "}
                  </Typography>
                ) : figure.fulfillReportingCriteria -
                    yesterday.fulfillReportingCriteria ===
                  0 ? (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    -
                  </Typography>
                ) : (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    <ArrowDropDownIcon className={classes.red} />
                    {figure.fulfillReportingCriteria -
                      yesterday.fulfillReportingCriteria}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center" style={{ border: 0 }}>
                {}

                {figure.ruleOut - yesterday.ruleOut > 1 ? (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    <ArrowDropUpIcon className={classes.green} />
                    {figure.ruleOut - yesterday.ruleOut}
                  </Typography>
                ) : figure.ruleOut - yesterday.ruleOut === 0 ? (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    -
                  </Typography>
                ) : (
                  <Typography color="textPrimary" variant="h6" component="h6">
                    <ArrowDropDownIcon className={classes.red} />
                    {figure.ruleOut - yesterday.ruleOut}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <LineGraph />
    </div>
  );
};
